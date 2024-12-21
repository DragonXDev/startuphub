'use client';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="fixed w-full z-50 backdrop-blur-lg border-b border-gray-200/10 dark:border-gray-700/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            StartupHub
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link href="/projects" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Projects</Link>
            <Link href="/post" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Post Idea</Link>
            <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">About</Link>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors backdrop-blur-sm"
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
          </div>
        </div>
      </div>
    </nav>
  );
}
