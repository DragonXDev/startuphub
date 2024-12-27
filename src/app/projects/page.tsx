'use client';

import { useState, useMemo, useEffect } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { Project, ProjectCategory } from '@/types/project';
import { getProjects } from '@/lib/projects';

// Constants
const categories: ProjectCategory[] = [
  'AI/Machine Learning',
  'Web3/Blockchain',
  'SaaS',
  'E-commerce',
  'FinTech',
  'EdTech',
  'HealthTech',
  'Social Media',
  'Developer Tools',
  'Mobile Apps',
  'Gaming',
  'IoT/Hardware',
];

const fundingStages = [
  'Pre-seed',
  'Seed',
  'Series A',
  'Series B',
  'Series C+',
  'Bootstrapped',
  'Revenue Generating',
];

const teamSizes = [
  'Solo Founder',
  '2-5',
  '6-10',
  '11-25',
  '26-50',
  '51-100',
  '100+',
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedFundingStage, setSelectedFundingStage] = useState<string>('');
  const [selectedTeamSize, setSelectedTeamSize] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        console.log("HERE: ", data);
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
        console.error('Error loading projects:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = !selectedCategory || project.category === selectedCategory;
      const matchesFundingStage = !selectedFundingStage || project.funding_stage === selectedFundingStage;
      const matchesTeamSize = !selectedTeamSize || project.team_size === selectedTeamSize;
      const matchesSearch = !searchQuery ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.company_name?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesFundingStage && matchesTeamSize && matchesSearch;
    });
  }, [projects, selectedCategory, selectedFundingStage, selectedTeamSize, searchQuery]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black pt-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Explore Projects</h1>
          <p className="text-gray-400">Discover innovative projects and connect with founders</p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <input
            type="text"
            placeholder="Search projects..."
            className="px-4 py-2 rounded-xl bg-white/5 border border-gray-200/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className="px-4 py-2 rounded-xl bg-white/5 border border-gray-200/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            className="px-4 py-2 rounded-xl bg-white/5 border border-gray-200/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedFundingStage}
            onChange={(e) => setSelectedFundingStage(e.target.value)}
          >
            <option value="">All Funding Stages</option>
            {fundingStages.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>

          <select
            className="px-4 py-2 rounded-xl bg-white/5 border border-gray-200/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedTeamSize}
            onChange={(e) => setSelectedTeamSize(e.target.value)}
          >
            <option value="">All Team Sizes</option>
            {teamSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-8">
              {filteredProjects.map((project) => (
                <div key={project.id} className="min-w-[300px]">
                  <ProjectCard {...project} />
                </div>
              ))}
              {filteredProjects.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400">No projects found matching your criteria.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
