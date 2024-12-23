'use client'

import { createClient } from '@/lib/supabase/client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X, Settings, LogOut, User, Home, Search, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { User as SupabaseUser } from '@supabase/supabase-js'
import Image from 'next/image'

export default function Navbar  () {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    setIsProfileOpen(false)
  }

  // Hide navigation on auth pages
  if (pathname === '/auth/signin' || pathname === '/auth/signup' || pathname === '/auth/verify-email') {
    return null
  }

  return (
    <nav className="backdrop-blur fixed top-0 left-0 right-0 z-50 bg-transparent border-b border-gray-200/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              StartupHub
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              href="/"
              className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors ${
                pathname === '/'
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/projects"
              className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors ${
                pathname === '/projects'
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Explore</span>
            </Link>
            {user && (
              <Link
                href="/post"
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === '/post'
                    ? 'text-white border-b-2 border-blue-500'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>New Project</span>
              </Link>
            )}

            {!user ? (
              <Link
                href="/auth/signin"
                className="inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-medium transition-all duration-200 hover:shadow-lg shadow-blue-500/25"
              >
                Sign In
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 group"
                >
                  {user.user_metadata.avatar_url ? (
                    <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-white/20 transition-all">
                      <Image
                        src={user.user_metadata.avatar_url}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 ring-2 ring-white/10 group-hover:ring-white/20 flex items-center justify-center text-white text-sm font-medium transition-all">
                      {user.email?.[0].toUpperCase()}
                    </div>
                  )}
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-black backdrop-blur rounded-xl shadow-lg border border-gray-200/10 py-1 transform opacity-100 scale-100 transition-all duration-200">
                    <div className="px-4 py-3 border-b border-gray-200/10">
                      <p className="text-sm text-white font-medium">{user.user_metadata.full_name || 'User'}</p>
                      <p className="text-sm text-gray-400 truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors group"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings className="w-4 h-4 mr-3 text-gray-400 group-hover:text-white transition-colors" />
                        Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors group"
                      >
                        <LogOut className="w-4 h-4 mr-3 group-hover:text-red-300 transition-colors" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/5 backdrop-blur-xl border-t border-gray-200/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-base font-medium transition-colors ${
                pathname === '/'
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link
              href="/projects"
              className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-base font-medium transition-colors ${
                pathname === '/projects'
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Search className="w-5 h-5" />
              <span>Explore</span>
            </Link>
            {user && (
              <Link
                href="/post"
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-base font-medium transition-colors ${
                  pathname === '/post'
                    ? 'text-white border-b-2 border-blue-500'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <PlusCircle className="w-5 h-5" />
                <span>New Project</span>
              </Link>
            )}
            {!user ? (
              <Link
                href="/auth/signin"
                className="flex items-center space-x-2 px-3 py-2 rounded-xl text-base font-medium text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>Sign In</span>
              </Link>
            ) : (
              <>
                <div className="px-3 py-2 border-t border-gray-200/10">
                  <div className="flex items-center space-x-3">
                    {user.user_metadata.avatar_url ? (
                      <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/10">
                        <Image
                          src={user.user_metadata.avatar_url}
                          alt="Profile"
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 ring-2 ring-white/10 flex items-center justify-center text-white text-lg font-medium">
                        {user.email?.[0].toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-white">
                        {user.user_metadata.full_name || 'User'}
                      </p>
                      <p className="text-sm text-gray-400 truncate">{user.email}</p>
                    </div>
                  </div>
                </div>
                <Link
                  href="/settings"
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl text-base font-medium text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 w-full px-3 py-2 rounded-xl text-base font-medium text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
