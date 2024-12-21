import { GithubIcon, Globe, Info } from 'lucide-react';

interface Tag {
  name: string;
  color: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  tags: Tag[];
  lookingFor: string[];
  websiteUrl?: string;
  githubUrl?: string;
  postedBy: {
    name: string;
    role: string;
    company?: string;
    avatar?: string;
    postedDate?: string;
  };
}

export default function ProjectCard({
  title,
  description,
  tags,
  lookingFor,
  websiteUrl,
  githubUrl,
  postedBy,
}: ProjectCardProps) {
  return (
    <div className="h-full">
      <div className="h-full bg-white dark:bg-gray-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-gray-200 dark:border-gray-800 overflow-hidden backdrop-blur-sm bg-opacity-50 dark:bg-opacity-50 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.3)]">
        <div className="p-6 flex flex-col h-full">
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
              <div className="flex space-x-3 text-gray-500 dark:text-gray-400">
                {websiteUrl && (
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <Globe className="h-5 w-5" />
                  </a>
                )}
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <GithubIcon className="h-5 w-5" />
                  </a>
                )}
                <button className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                  <Info className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm shadow-[0_2px_8px_rgb(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgb(0,0,0,0.2)] ${tag.color}`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">Looking for:</h4>
                <div className="flex flex-wrap gap-2">
                  {lookingFor.map((role, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm shadow-[0_2px_8px_rgb(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgb(0,0,0,0.2)]"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-1 text-sm">
                  <p className="font-medium text-gray-900 dark:text-gray-100 truncate">{postedBy.name}</p>
                  {postedBy.postedDate && (
                    <span className="text-gray-500 dark:text-gray-400 text-xs flex-shrink-0">• {postedBy.postedDate}</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {postedBy.role}{postedBy.company ? ` at ${postedBy.company}` : ''}
                </p>
              </div>
              <button className="ml-4 px-6 py-2.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105 font-medium shadow-lg dark:shadow-white/10 flex-shrink-0">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
