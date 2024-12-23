"use client"
import { GithubIcon, Globe, Info } from 'lucide-react';
import { Database } from '@/lib/types/database.types';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

type Project = Database['public']['Tables']['projects']['Row'];
type Tag = Database['public']['Tables']['tags']['Row'];
type Role = Database['public']['Tables']['roles']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [postedBy, setPostedBy] = useState<Profile | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      // Fetch tags
      const { data: projectTags } = await supabase
        .from('project_tags')
        .select('tags(*)')
        .eq('project_id', project.id);
      
      if (projectTags) {
        setTags(projectTags.map((pt: any) => pt.tags));
      }

      // Fetch roles
      const { data: projectRoles } = await supabase
        .from('roles')
        .select('*')
        .eq('project_id', project.id);
      
      if (projectRoles) {
        setRoles(projectRoles);
      }

      // Fetch user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', project.user_id)
        .single();
      
      if (profile) {
        setPostedBy(profile);
      }
    };

    fetchProjectDetails();
  }, [project.id, project.user_id]);

  return (
    <div className="h-full">
      <div className="h-full bg-white dark:bg-gray-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-gray-200 dark:border-gray-800 overflow-hidden backdrop-blur-sm bg-opacity-50 dark:bg-opacity-50 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.3)]">
        <div className="p-6 flex flex-col h-full">
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
              <div className="flex space-x-3 text-gray-500 dark:text-gray-400">
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <Globe className="h-5 w-5" />
                  </a>
                )}
                {postedBy?.github_url && (
                  <a
                    href={postedBy.github_url}
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
            
            <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag.id}
                    className={`px-3 py-1 rounded-full text-sm shadow-[0_2px_8px_rgb(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgb(0,0,0,0.2)] ${tag.color || 'bg-gray-100 dark:bg-gray-800'}`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">Looking for:</h4>
                <div className="flex flex-wrap gap-2">
                  {roles.map((role) => (
                    <span
                      key={role.id}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm shadow-[0_2px_8px_rgb(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgb(0,0,0,0.2)]"
                    >
                      {role.title}
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
                  <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                    {postedBy?.full_name || 'Anonymous'}
                  </p>
                  <span className="text-gray-500 dark:text-gray-400 text-xs flex-shrink-0">
                    • {new Date(project.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {project.contact_name}{project.location ? ` • ${project.location}` : ''}
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
