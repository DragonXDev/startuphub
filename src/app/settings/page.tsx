'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/auth-helpers-nextjs'

export default function Settings() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/signin')
        return
      }
      setUser(user)
    }

    getUser()
  }, [])

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black pt-24 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-gray-200/10 p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-white mb-6">Account Settings</h1>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Profile Information</h2>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                  <div className="text-white bg-white/5 rounded-xl p-3 border border-gray-200/10">
                    {user.email}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Provider</label>
                  <div className="text-white bg-white/5 rounded-xl p-3 border border-gray-200/10 capitalize">
                    {user.app_metadata.provider || 'Email'}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200/10">
              <h2 className="text-lg font-semibold text-white mb-4">Actions</h2>
              <div className="space-y-4">
                <button
                  onClick={async () => {
                    await supabase.auth.signOut()
                    router.push('/')
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all duration-300 hover:shadow-lg border border-red-500/20"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
