'use client';

import { useState, useMemo } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { projects, categories, roles, fundingStages, teamSizes, type Project } from '@/data/projects';
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { Switch } from '@headlessui/react';

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    categories: [] as string[],
    roles: [] as string[],
    fundingStages: [] as string[],
    teamSizes: [] as string[],
    remote: false,
  });
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = (type: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value],
    }));
  };

  const toggleRemote = () => {
    setFilters(prev => ({
      ...prev,
      remote: !prev.remote,
    }));
  };

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Search query
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = 
          project.title.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.companyName.toLowerCase().includes(searchLower) ||
          project.tags.some(tag => tag.name.toLowerCase().includes(searchLower)) ||
          project.lookingFor.some(role => role.toLowerCase().includes(searchLower));
        
        if (!matchesSearch) return false;
      }

      // Category filter - ANY of the selected categories
      if (filters.categories.length > 0 && !filters.categories.includes(project.category)) {
        return false;
      }

      // Role filter - ANY of the selected roles
      if (filters.roles.length > 0 && !project.lookingFor.some(role => filters.roles.includes(role))) {
        return false;
      }

      // Funding stage filter - ANY of the selected stages
      if (filters.fundingStages.length > 0 && !filters.fundingStages.includes(project.fundingStage)) {
        return false;
      }

      // Team size filter - ANY of the selected sizes
      if (filters.teamSizes.length > 0 && !filters.teamSizes.includes(project.teamSize)) {
        return false;
      }

      // Remote filter
      if (filters.remote && !project.remote) {
        return false;
      }

      return true;
    });
  }, [searchQuery, filters]);

  const FilterSection = ({ title, items, selectedItems, onToggle }: {
    title: string;
    items: readonly string[];
    selectedItems: string[];
    onToggle: (item: string) => void;
  }) => (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">{title}</h3>
      <div className="space-y-1">
        {items.map(item => (
          <label key={item} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedItems.includes(item)}
              onChange={() => onToggle(item)}
              className="rounded border-gray-300 text-gray-900 focus:ring-gray-900 dark:border-gray-700 dark:text-gray-100 dark:focus:ring-gray-100"
            />
            <span className="text-sm">{item}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex flex-col space-y-6">
          {/* Search and Filter Toggle */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all order-1 lg:order-none">
              <SparklesIcon className="h-5 w-5" />
              Upgrade to AI Search
            </button>
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:flex-none lg:w-[500px]">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects, companies, or roles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 outline-none"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors whitespace-nowrap"
              >
                <FunnelIcon className="h-5 w-5" />
                Filters
                {(filters.categories.length > 0 || filters.roles.length > 0 || filters.fundingStages.length > 0 || filters.teamSizes.length > 0 || filters.remote) && (
                  <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900">
                    {filters.categories.length + filters.roles.length + filters.fundingStages.length + filters.teamSizes.length + (filters.remote ? 1 : 0)}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Active Filters */}
          <div className={`min-h-[32px] transition-all duration-300 ${!showFilters ? 'opacity-0 invisible h-0 -mt-6' : 'opacity-100 visible'}`}>
            {(filters.categories.length > 0 || filters.roles.length > 0 || filters.fundingStages.length > 0 || filters.teamSizes.length > 0 || filters.remote) && (
              <div className="flex flex-wrap gap-2">
                {filters.categories.map(category => (
                  <button
                    key={category}
                    onClick={() => toggleFilter('categories', category)}
                    className="flex items-center gap-1 px-2 py-1 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {category}
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                ))}
                {filters.roles.map(role => (
                  <button
                    key={role}
                    onClick={() => toggleFilter('roles', role)}
                    className="flex items-center gap-1 px-2 py-1 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {role}
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                ))}
                {filters.fundingStages.map(stage => (
                  <button
                    key={stage}
                    onClick={() => toggleFilter('fundingStages', stage)}
                    className="flex items-center gap-1 px-2 py-1 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {stage}
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                ))}
                {filters.teamSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => toggleFilter('teamSizes', size)}
                    className="flex items-center gap-1 px-2 py-1 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {size} people
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                ))}
                {filters.remote && (
                  <button
                    onClick={toggleRemote}
                    className="flex items-center gap-1 px-2 py-1 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Remote
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={() => setFilters({
                    categories: [],
                    roles: [],
                    fundingStages: [],
                    teamSizes: [],
                    remote: false,
                  })}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <div className={`transition-all duration-300 overflow-hidden ${showFilters ? 'w-80 opacity-100 visible' : 'w-0 opacity-0 invisible'}`}>
              <div className="sticky top-24 space-y-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                <FilterSection
                  title="Categories"
                  items={categories}
                  selectedItems={filters.categories}
                  onToggle={(category) => toggleFilter('categories', category)}
                />

                <FilterSection
                  title="Roles"
                  items={roles}
                  selectedItems={filters.roles}
                  onToggle={(role) => toggleFilter('roles', role)}
                />

                <FilterSection
                  title="Funding Stage"
                  items={fundingStages}
                  selectedItems={filters.fundingStages}
                  onToggle={(stage) => toggleFilter('fundingStages', stage)}
                />

                <FilterSection
                  title="Team Size"
                  items={teamSizes}
                  selectedItems={filters.teamSizes}
                  onToggle={(size) => toggleFilter('teamSizes', size)}
                />

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Work Type</h3>
                  <Switch.Group>
                    <div className="flex items-center">
                      <Switch
                        checked={filters.remote}
                        onChange={toggleRemote}
                        className={`${
                          filters.remote ? 'bg-gray-900 dark:bg-gray-100' : 'bg-gray-200 dark:bg-gray-800'
                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:ring-offset-2`}
                      >
                        <span
                          className={`${
                            filters.remote ? 'translate-x-6' : 'translate-x-1'
                          } inline-block h-4 w-4 transform rounded-full bg-white dark:bg-gray-900 transition-transform`}
                        />
                      </Switch>
                      <Switch.Label className="ml-2 text-sm">Remote Only</Switch.Label>
                    </div>
                  </Switch.Group>
                </div>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-8">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="min-w-[300px]">
                    <ProjectCard {...project} />
                  </div>
                ))}
                {filteredProjects.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">No projects match your filters.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
