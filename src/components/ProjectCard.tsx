'use client';

import { GithubIcon, Globe, Info, X, Users, MapPin, Briefcase, TrendingUp } from 'lucide-react';
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
  category
}: Project & { user: Project['user'] }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="h-full">
      <div className="h-full bg-white dark:bg-gray-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-gray-200 dark:border-gray-800 overflow-hidden backdrop-blur-sm bg-opacity-50 dark:bg-opacity-50 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.3)]">
        <div className="p-6 flex flex-col h-full">
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                {company_name && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    {company_name}
                  </p>
                )}
              </div>
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

            <div className="flex flex-wrap gap-2 mb-4">
              {/* Category Tag */}
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300">
                {category}
              </span>
              {/* Funding Stage Tag */}
              {funding_stage && (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {funding_stage}
                </span>
              )}
              {/* Team Size Tag */}
              {team_size && (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  {team_size} members
                </span>
              )}
              {/* Location Tag */}
              {location && (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {location}
                </span>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{description}</p>
            
            <div className="space-y-4">
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 6).map((tag) => (
                    <span
                      key={tag.id}
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{ backgroundColor: tag.color + '20', color: tag.color }}
                    >
                      {tag.name}
                    </span>
                  ))}
                  {tags.length > 6 && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                      +{tags.length - 6} more
                    </span>
                  )}
                </div>
              )}
              {roles && roles.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {roles.slice(0, 4).map((role) => (
                    <span
                      key={role.id}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300"
                    >
                      {role.name}
                    </span>
                  ))}
                  {roles.length > 4 && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                      +{roles.length - 4} more
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              {user?.avatar_url ? (
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    src={user.avatar_url}
                    alt={user.full_name || 'User'}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                  {user?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'A'}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.full_name || 'Anonymous'}
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

            <div className="inline-block align-bottom bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full border border-gray-200/20 dark:border-gray-700/20">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
                    {company_name && (
                      <p className="mt-2 text-gray-600 dark:text-gray-400 flex items-center">
                        <Briefcase className="h-4 w-4 mr-2" />
                        {company_name}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {website_url && (
                      <a
                        href={website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                      >
                        <Globe className="h-5 w-5" />
                      </a>
                    )}
                    {github_url && (
                      <a
                        href={github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                      >
                        <GithubIcon className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    {location && (
                      <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{location}</p>
                          <p className="text-xs text-gray-500">Location</p>
                        </div>
                      </div>
                    )}
                    {team_size && (
                      <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3">
                        <Users className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{team_size} members</p>
                          <p className="text-xs text-gray-500">Team Size</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Description</h4>
                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{description}</p>
                  </div>

                  {promotional_details && (
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Additional Details</h4>
                      <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{promotional_details}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    {funding_stage && (
                      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Funding Stage</h4>
                        <p className="text-gray-600 dark:text-gray-300">{funding_stage}</p>
                      </div>
                    )}
                    {equity_offered && (
                      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Equity Offered</h4>
                        <p className="text-gray-600 dark:text-gray-300">{equity_offered}</p>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Name</h4>
                        <p className="text-gray-600 dark:text-gray-300">{contact_name}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Email</h4>
                        <p className="text-gray-600 dark:text-gray-300">{contact_email}</p>
                      </div>
                      {contact_phone && (
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Phone</h4>
                          <p className="text-gray-600 dark:text-gray-300">{contact_phone}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {user && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About the Founder</h4>
                      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                        <div className="flex items-center space-x-3 mb-4">
                          {user.avatar_url ? (
                            <div className="h-12 w-12 rounded-full overflow-hidden">
                              <Image
                                src={user.avatar_url}
                                alt={user.full_name || 'User'}
                                width={48}
                                height={48}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-medium">
                              {user.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'A'}
                            </div>
                          )}
                          <div>
                            <h5 className="text-base font-medium text-gray-900 dark:text-white">{user.full_name}</h5>
                            {user.username && (
                              <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
                            )}
                          </div>
                        </div>
                        {user.bio && (
                          <p className="text-gray-600 dark:text-gray-300 mb-4">{user.bio}</p>
                        )}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
                          {user.location && (
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {user.location}
                            </div>
                          )}
                          {user.website && (
                            <a
                              href={user.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center hover:text-gray-900 dark:hover:text-gray-100"
                            >
                              <Globe className="h-4 w-4 mr-1" />
                              Website
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
