'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import ProjectCard from '@/components/ProjectCard';
import { Loader2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  team_size: string;
  category: string;
  email: string;
  website: string | null;
  contact_name: string;
  phone: string | null;
  funding_stage: string;
  location: string;
  promotional_details: string | null;
  equity: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

interface Tag {
  id: string;
  name: string;
  color: string | null;
}

interface ProjectWithTags extends Project {
  tags: Tag[];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectWithTags[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);

  const supabase = createClientComponentClient();

  // Fetch projects and their associated tags
  const fetchProjects = async () => {
    try {
      setLoading(true);
      
      // First, fetch all projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (projectsError) throw projectsError;

      // Fetch all project-tag relationships and tags
      const { data: projectTags, error: tagsError } = await supabase
        .from('project_tags')
        .select(`
          project_id,
          tags (
            id,
            name,
            color
          )
        `);

      if (tagsError) throw tagsError;

      // Group tags by project
      const tagsByProject = projectTags.reduce((acc: Record<string, Tag[]>, pt: any) => {
        const projectId = pt.project_id;
        if (!acc[projectId]) acc[projectId] = [];
        if (pt.tags) acc[projectId].push(pt.tags);
        return acc;
      }, {});

      // Combine projects with their tags
      const projectsWithTags = projectsData.map((project: Project) => ({
        ...project,
        tags: tagsByProject[project.id] || [],
      }));

      setProjects(projectsWithTags);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all available tags
  const fetchTags = async () => {
    const { data: tags, error } = await supabase
      .from('tags')
      .select('*')
      .order('name');

    if (error) {
      setError(error.message);
    } else {
      setAvailableTags(tags || []);
    }
  };

  useEffect(() => {
    fetchTags();
    fetchProjects();
  }, []);

  // Filter projects based on selected tags
  const filteredProjects = projects.filter(project => {
    if (selectedTags.length === 0) return true;
    return project.tags.some(tag => selectedTags.includes(tag.id));
  });

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  if (error) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-red-500">
            Error loading projects: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Browse Projects</h1>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTags.includes(tag.id)
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                style={tag.color ? { backgroundColor: selectedTags.includes(tag.id) ? tag.color : `${tag.color}33` } : undefined}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                teamSize={project.team_size}
                location={project.location}
                fundingStage={project.funding_stage}
                equity={project.equity}
                tags={project.tags}
                category={project.category}
                createdAt={project.created_at}
              />
            ))}
          </div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-12">
            No projects found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
