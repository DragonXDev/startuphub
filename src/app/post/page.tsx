'use client';

import { useState, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import StepIndicator from '@/components/StepIndicator';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { createProject } from '@/lib/projects';
import { ProjectCategory, FundingStage } from '@/types/project';

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

const fundingStages: FundingStage[] = [
  'Pre-seed',
  'Seed',
  'Series A',
  'Series B',
  'Series C+',
  'Bootstrapped',
  'Revenue Generating',
];

const steps = ['Basic Info', 'Project Details', 'Review & Post'];

export default function PostIdea() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [roleInput, setRoleInput] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    company_name: '',
    team_size: '',
    category: '',
    contact_email: '',
    website_url: '',
    github_url: '',
    contact_name: '',
    contact_phone: '',
    description: '',
    tags: [] as string[],
    roles: [] as string[],
    funding_stage: '',
    location: '',
    promotional_details: '',
    equity_offered: '',
  });

  const MAX_TAGS = 6;
  const MAX_ROLES = 8;
  const MIN_DESCRIPTION_LENGTH = 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === ',' || e.key === ' ' || e.key === 'Enter') && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/,/g, '');
      if (formData.tags.length < MAX_TAGS && !formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }));
        setTagInput('');
      }
    } else if (e.key === 'Backspace' && !tagInput && formData.tags.length > 0) {
      e.preventDefault();
      const lastTag = formData.tags[formData.tags.length - 1];
      setFormData(prev => ({
        ...prev,
        tags: prev.tags.slice(0, -1)
      }));
      setTagInput(lastTag);
    }
  };

  const handleRoleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === ',' || e.key === 'Enter') && roleInput.trim()) {
      e.preventDefault();
      const newRole = roleInput.trim().replace(/,/g, '');
      if (formData.roles.length < MAX_ROLES && !formData.roles.includes(newRole)) {
        setFormData(prev => ({
          ...prev,
          roles: [...prev.roles, newRole]
        }));
        setRoleInput('');
      }
    } else if (e.key === 'Backspace' && !roleInput && formData.roles.length > 0) {
      e.preventDefault();
      const lastRole = formData.roles[formData.roles.length - 1];
      setFormData(prev => ({
        ...prev,
        roles: prev.roles.slice(0, -1)
      }));
      setRoleInput(lastRole);
    }
  };

  const removeTag = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, index) => index !== indexToRemove)
    }));
  };

  const removeRole = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.filter((_, index) => index !== indexToRemove)
    }));
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 0) {
      if (!formData.title) newErrors.title = 'Title is required';
      if (!formData.category) newErrors.category = 'Category is required';
      if (!formData.description) {
        newErrors.description = 'Description is required';
      } else if (formData.description.length < MIN_DESCRIPTION_LENGTH) {
        newErrors.description = `Description must be at least ${MIN_DESCRIPTION_LENGTH} characters`;
      }
      if (!formData.tags || formData.tags.length === 0) {
        newErrors.tags = 'At least one tag is required';
      } else if (formData.tags.length > MAX_TAGS) {
        newErrors.tags = `Maximum ${MAX_TAGS} tags allowed`;
      }
    } else if (currentStep === 1) {
      if (!formData.company_name) newErrors.company_name = 'Company name is required';
      if (!formData.team_size) newErrors.team_size = 'Team size is required';
      if (!formData.location) newErrors.location = 'Location is required';
      if (!formData.funding_stage) newErrors.funding_stage = 'Funding stage is required';
      if (!formData.roles || formData.roles.length === 0) {
        newErrors.roles = 'At least one role is required';
      } else if (formData.roles.length > MAX_ROLES) {
        newErrors.roles = `Maximum ${MAX_ROLES} roles allowed`;
      }
    } else if (currentStep === 2) {
      if (!formData.contact_name) newErrors.contact_name = 'Contact name is required';
      if (!formData.contact_email) newErrors.contact_email = 'Contact email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact_email)) {
        newErrors.contact_email = 'Invalid email format';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    try {
      setSubmitting(true);
      await createProject(formData);
      router.push('/projects');
    } catch (error) {
      console.error('Error creating project:', error);
      setErrors({ submit: 'Failed to create project. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black pt-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-gray-200/10 p-6 sm:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Post Your Project</h1>
            <p className="text-gray-400 mt-2">Share your startup idea and find collaborators</p>
          </div>

          <StepIndicator steps={steps} currentStep={currentStep} />

          <div className="mt-8">
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Project Title*</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-200/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Give your project a clear, descriptive title"
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Category*</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-200/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Description* (minimum {MIN_DESCRIPTION_LENGTH} characters)</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-200/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your project, its goals, and what makes it unique"
                  />
                  <div className="mt-1 text-sm">
                    <span className={formData.description.length < MIN_DESCRIPTION_LENGTH ? "text-red-500" : "text-green-500"}>
                      {formData.description.length}/{MIN_DESCRIPTION_LENGTH} characters
                    </span>
                  </div>
                  {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Tags* ({formData.tags.length}/{MAX_TAGS} - press space, comma, or enter to add)
                  </label>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm flex items-center"
                        >
                          {tag}
                          <button
                            onClick={() => removeTag(index)}
                            className="ml-2 text-blue-400 hover:text-blue-300"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                      disabled={formData.tags.length >= MAX_TAGS}
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-200/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={formData.tags.length >= MAX_TAGS ? "Max tags reached" : "Type and press space, comma, or enter to add tags"}
                    />
                  </div>
                  {errors.tags && <p className="mt-1 text-sm text-red-500">{errors.tags}</p>}
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Company Name*</label>
                    <input
                      type="text"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-200/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.company_name && <p className="mt-1 text-sm text-red-500">{errors.company_name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Team Size*</label>
                    <input
                      type="text"
                      name="team_size"
                      value={formData.team_size}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-200/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Solo Founder, 2-5, 6-10"
                    />
                    {errors.team_size && <p className="mt-1 text-sm text-red-500">{errors.team_size}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Location*</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-200/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="City, Country"
                    />
                    {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Funding Stage*</label>
                    <select
                      name="funding_stage"
                      value={formData.funding_stage}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-200/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select funding stage</option>
                      {fundingStages.map(stage => (
                        <option key={stage} value={stage}>{stage}</option>
                      ))}
                    </select>
                    {errors.funding_stage && <p className="mt-1 text-sm text-red-500">{errors.funding_stage}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Website URL</label>
                    <input
                      type="url"
                      name="website_url"
                      value={formData.website_url}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-200/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">GitHub URL</label>
                    <input
                      type="url"
                      name="github_url"
                      value={formData.github_url}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-200/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://github.com/"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Roles Needed* ({formData.roles.length}/{MAX_ROLES} - press comma or enter to add)
                  </label>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.roles.map((role, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm flex items-center"
                        >
                          {role}
                          <button
                            onClick={() => removeRole(index)}
                            className="ml-2 text-purple-400 hover:text-purple-300"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={roleInput}
                      onChange={(e) => setRoleInput(e.target.value)}
                      onKeyDown={handleRoleKeyDown}
                      disabled={formData.roles.length >= MAX_ROLES}
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-200/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={formData.roles.length >= MAX_ROLES ? "Max roles reached" : "Type and press comma or enter to add roles"}
                    />
                  </div>
                  {errors.roles && <p className="mt-1 text-sm text-red-500">{errors.roles}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Equity Offered</label>
                  <input
                    type="text"
                    name="equity_offered"
                    value={formData.equity_offered}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-200/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 1-5%, Negotiable"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Promotional Details</label>
                  <textarea
                    name="promotional_details"
                    value={formData.promotional_details}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-200/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Any additional details to attract potential collaborators"
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Contact Name*</label>
                  <input
                    type="text"
                    name="contact_name"
                    value={formData.contact_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-200/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.contact_name && <p className="mt-1 text-sm text-red-500">{errors.contact_name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Contact Email*</label>
                  <input
                    type="email"
                    name="contact_email"
                    value={formData.contact_email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-200/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.contact_email && <p className="mt-1 text-sm text-red-500">{errors.contact_email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    name="contact_phone"
                    value={formData.contact_phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-200/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {errors.submit && <p className="text-sm text-red-500">{errors.submit}</p>}
              </div>
            )}

            <div className="mt-8 flex justify-between">
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="flex items-center px-6 py-3 rounded-xl text-white hover:bg-white/5 transition-colors"
                >
                  <ChevronLeftIcon className="h-5 w-5 mr-2" />
                  Back
                </button>
              )}
              <div className="ml-auto">
                {currentStep < steps.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center px-6 py-3 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                  >
                    Next
                    <ChevronRightIcon className="h-5 w-5 ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="flex items-center px-6 py-3 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Posting...' : 'Post Project'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
