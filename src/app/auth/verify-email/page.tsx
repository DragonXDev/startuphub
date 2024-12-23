'use client'

import Link from 'next/link'

export default function VerifyEmail() {
  return (
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black p-4">
      <div className="max-w-md w-full mx-auto">
        {/* Logo and Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-2">
            StartupHub
          </h1>
          <p className="text-gray-400 text-lg">Almost there!</p>
        </div>

        {/* Verify Email Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-gray-200/10 p-8 text-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Check Your Email</h2>
            <p className="text-gray-400">
              We've sent you an email with a verification link. Please click the link to verify your email address and
              complete your registration.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              Didn't receive the email?{' '}
              <Link href="/auth/signup" className="text-blue-400 hover:text-blue-300 transition-colors">
                Try again
              </Link>
            </p>
            <p className="text-sm text-gray-400">
              Return to{' '}
              <Link href="/auth/signin" className="text-blue-400 hover:text-blue-300 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
