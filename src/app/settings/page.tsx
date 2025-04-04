'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/auth-helpers-nextjs'
import { toast } from 'sonner'

interface ProfileFormData {
  full_name: string | null
  username: string | null
  website: string | null
  bio: string | null
  location: string | null
  avatar_url: string | null
}

export default function Settings() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [profileData, setProfileData] = useState<ProfileFormData>({
    full_name: null,
    username: null,
    website: null,
    bio: null,
    location: null,
    avatar_url: null,
  })

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

      // Fetch profile data
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profile) {
        setProfileData({
          full_name: profile.full_name,
          username: profile.username,
          website: profile.website,
          bio: profile.bio,
          location: profile.location,
          avatar_url: profile.avatar_url,
        })
      }
    }

    getUser()
  }, [])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          ...profileData,
          updated_at: new Date().toISOString(),
        })

      if (error) throw error
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error('Error updating profile')
      console.error('Error updating profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value || null
    }))
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black pt-24 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-gray-200/10 p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-white mb-6">Account Settings</h1>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Profile Information</h2>
              <form onSubmit={handleUpdateProfile}>
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

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      value={profileData.full_name || ''}
                      onChange={handleChange}
                      className="w-full p-3 bg-white/5 rounded-xl border border-gray-200/10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={profileData.username || ''}
                      onChange={handleChange}
                      className="w-full p-3 bg-white/5 rounded-xl border border-gray-200/10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Website</label>
                    <input
                      type="text"
                      name="website"
                      value={profileData.website || ''}
                      onChange={handleChange}
                      className="w-full p-3 bg-white/5 rounded-xl border border-gray-200/10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
                    <textarea
                      name="bio"
                      value={profileData.bio || ''}
                      onChange={handleChange}
                      className="w-full p-3 bg-white/5 rounded-xl border border-gray-200/10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={profileData.location || ''}
                      onChange={handleChange}
                      className="w-full p-3 bg-white/5 rounded-xl border border-gray-200/10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Avatar URL</label>
                    <input
                      type="text"
                      name="avatar_url"
                      value={profileData.avatar_url || ''}
                      onChange={handleChange}
                      className="w-full p-3 bg-white/5 rounded-xl border border-gray-200/10"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 rounded-xl transition-all duration-300 hover:shadow-lg border border-blue-500/20"
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </form>
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
