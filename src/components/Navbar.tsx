'use client';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { MoonIcon, SunIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 backdrop-blur-lg border-b border-gray-200/10 dark:border-gray-700/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            StartupHub
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link href="/projects" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Projects</Link>
            {user && (
              <Link href="/post" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Post Idea</Link>
            )}
            <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">About</Link>
            
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10 transition-colors backdrop-blur-sm border border-white/10"
              aria-label="Toggle theme"
            >
              {mounted && (
                theme === 'dark' ? (
                  <SunIcon className="h-5 w-5 text-gray-900 dark:text-gray-100" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-gray-900 dark:text-gray-100" />
                )
              )}
            </button>

            {!loading && (
              <div className="relative">
                {user ? (
                  <div className="flex items-center">
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="flex items-center space-x-2 focus:outline-none"
                    >
                      {user.user_metadata?.avatar_url ? (
                        <Image
                          src={user.user_metadata.avatar_url}
                          alt="Profile"
                          width={32}
                          height={32}
                          className="rounded-full ring-2 ring-white/10"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center ring-2 ring-white/10">
                          <span className="text-sm font-medium text-white">
                            {user.email?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </button>
                    
                    {isMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 rounded-xl overflow-hidden backdrop-blur-xl bg-white/10 dark:bg-gray-800/50 ring-1 ring-black/5 dark:ring-white/10 shadow-lg transform opacity-100 scale-100">
                        <div className="px-4 py-2 border-b border-gray-200/10 dark:border-gray-700/30">
                          <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                            {user.email}
                          </p>
                        </div>
                        <div className="py-1">
                          <Link
                            href="/settings"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-white/5"
                          >
                            <Cog6ToothIcon className="mr-3 h-5 w-5" />
                            Settings
                          </Link>
                          <button
                            onClick={handleSignOut}
                            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-white/5"
                          >
                            Sign out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/auth/sign-in"
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                  >
                    Sign in
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
