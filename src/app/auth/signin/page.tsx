'use client'

import { Github } from 'lucide-react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function SignIn() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
      return
    }

    router.push('/')
  }

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black p-4">
      <div className="max-w-md w-full mx-auto">
        {/* Logo and Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-2">
            StartupHub
          </h1>
          <p className="text-gray-400 text-lg">Connect. Collaborate. Create.</p>
        </div>

        {/* Sign In Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-gray-200/10 p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Sign in to continue to StartupHub</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailSignIn} className="space-y-4 mb-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-gray-200/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-gray-200/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in with Email'}
            </button>
          </form>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#0B0F1A] text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleOAuthSignIn('google')}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all duration-300 hover:shadow-lg border border-gray-200/10 group"
            >
              <Image
                src="/google.svg"
                alt="Google"
                width={20}
                height={20}
                className="w-5 h-5 transition-transform group-hover:scale-110"
              />
              <span>Continue with Google</span>
            </button>

            <button
              onClick={() => handleOAuthSignIn('github')}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all duration-300 hover:shadow-lg border border-gray-200/10 group"
            >
              <Github className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>Continue with GitHub</span>
            </button>
          </div>

          <div className="mt-6 text-center space-y-4">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-blue-400 hover:text-blue-300 transition-colors">
                Sign up
              </Link>
            </p>
            <p className="text-sm text-gray-400">
              By signing in, you agree to our{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
