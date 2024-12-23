'use client';

import { GithubIcon, Globe, Info, X } from 'lucide-react';
import { useState } from 'react';
import { Project } from '@/types/project';
import Image from 'next/image';

export default function ProjectCard({
  title,
  description,
  tags,
  roles,
  website_url,
  github_url,
  user,
  company_name,
  team_size,
  location,
  equity_offered,
  funding_stage,
  promotional_details,
  contact_email,
  contact_name,
  contact_phone,
  created_at,
}: Project & { user: Project['user'] }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="h-full">
      <div className="h-full bg-white dark:bg-gray-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-gray-200 dark:border-gray-800 overflow-hidden backdrop-blur-sm bg-opacity-50 dark:bg-opacity-50 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.3)]">
        <div className="p-6 flex flex-col h-full">
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
              <div className="flex space-x-3 text-gray-500 dark:text-gray-400">
                {website_url && (
                  <a
                    href={website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <Globe className="h-5 w-5" />
                  </a>
                )}
                {github_url && (
                  <a
                    href={github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <GithubIcon className="h-5 w-5" />
                  </a>
                )}
                <button
                  onClick={() => setShowModal(true)}
                  className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <Info className="h-5 w-5" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{description}</p>
            <div className="space-y-4">
              {tags && tags.length > 0 && (
                <div key="tags" className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{ backgroundColor: tag.color + '20', color: tag.color }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
              {roles && roles.length > 0 && (
                <div key="roles" className="flex flex-wrap gap-2">
                  {roles.map((role) => (
                    <span
                      key={role.id}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200"
                    >
                      {role.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              {user?.user_metadata?.avatar_url ? (
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    src={user.user_metadata.avatar_url}
                    alt={user.user_metadata?.full_name || 'User'}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                  {user?.email?.[0]?.toUpperCase() || 'A'}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.user_metadata?.full_name || 'Anonymous'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  Posted {new Date(created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white dark:bg-gray-900 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
                
                <div className="space-y-6">
                  {company_name && (
                    <div key="company">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Company</h4>
                      <p className="mt-1 text-gray-900 dark:text-white">{company_name}</p>
                    </div>
                  )}

                  <div key="description">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h4>
                    <p className="mt-1 text-gray-900 dark:text-white whitespace-pre-wrap">{description}</p>
                  </div>

                  {promotional_details && (
                    <div key="promotional">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Promotional Details</h4>
                      <p className="mt-1 text-gray-900 dark:text-white whitespace-pre-wrap">{promotional_details}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {team_size && (
                      <div key="team-size">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Team Size</h4>
                        <p className="mt-1 text-gray-900 dark:text-white">{team_size}</p>
                      </div>
                    )}

                    {location && (
                      <div key="location">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</h4>
                        <p className="mt-1 text-gray-900 dark:text-white">{location}</p>
                      </div>
                    )}

                    {funding_stage && (
                      <div key="funding">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Funding Stage</h4>
                        <p className="mt-1 text-gray-900 dark:text-white">{funding_stage}</p>
                      </div>
                    )}

                    {equity_offered && (
                      <div key="equity">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Equity Offered</h4>
                        <p className="mt-1 text-gray-900 dark:text-white">{equity_offered}</p>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div key="contact-name">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</h4>
                        <p className="mt-1 text-gray-900 dark:text-white">{contact_name}</p>
                      </div>

                      <div key="contact-email">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h4>
                        <p className="mt-1 text-gray-900 dark:text-white">{contact_email}</p>
                      </div>

                      {contact_phone && (
                        <div key="contact-phone">
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</h4>
                          <p className="mt-1 text-gray-900 dark:text-white">{contact_phone}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
