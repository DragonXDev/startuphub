'use client';

import { useState } from 'react';
import StepIndicator from '@/components/StepIndicator';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const categories = [
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
] as const;

const steps = ['Basic Info', 'Project Details', 'Review & Post'];

export default function PostIdea() {
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    companyName: '',
    teamSize: '',
    category: '',
    email: '',
    website: '',
    contactName: '',
    phone: '',
    description: '',
    tags: [] as string[],
    fundingStage: '',
    location: '',
    promotionalDetails: '',
    equity: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 0) {
      if (!formData.companyName) newErrors.companyName = 'Company name is required';
      if (!formData.teamSize) newErrors.teamSize = 'Team size is required';
      if (!formData.category) newErrors.category = 'Category is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.contactName) newErrors.contactName = 'Contact name is required';
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    }

    if (currentStep === 1) {
      if (!formData.description) newErrors.description = 'Description is required';
      if (!formData.fundingStage) newErrors.fundingStage = 'Funding stage is required';
      if (!formData.location) newErrors.location = 'Location is required';
      if (!formData.equity) newErrors.equity = 'Equity is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep() && currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg bg-white dark:bg-gray-900 border ${
                    errors.companyName ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'
                  } focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 outline-none transition-all`}
                  placeholder="Enter company name"
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Team Size *</label>
                <select
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg bg-white dark:bg-gray-900 border ${
                    errors.teamSize ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'
                  } focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 outline-none transition-all`}
                >
                  <option value="" className="text-gray-500">Select team size</option>
                  <option value="1">Solo Founder</option>
                  <option value="2-5">2-5 people</option>
                  <option value="6-10">6-10 people</option>
                  <option value="11-20">11-20 people</option>
                  <option value="20+">20+ people</option>
                </select>
                {errors.teamSize && (
                  <p className="mt-1 text-sm text-red-500">{errors.teamSize}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg bg-white dark:bg-gray-900 border ${
                    errors.category ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'
                  } focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 outline-none transition-all`}
                >
                  <option value="" className="text-gray-500">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Contact Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg bg-white dark:bg-gray-900 border ${
                    errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'
                  } focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 outline-none transition-all`}
                  placeholder="Enter contact email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 outline-none transition-all"
                  placeholder="Enter website URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Contact Name *</label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg bg-white dark:bg-gray-900 border ${
                    errors.contactName ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'
                  } focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 outline-none transition-all`}
                  placeholder="Enter contact name"
                />
                {errors.contactName && (
                  <p className="mt-1 text-sm text-red-500">{errors.contactName}</p>
                )}
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Project Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full p-3 rounded-lg bg-white dark:bg-gray-900 border ${
                  errors.description ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'
                } focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 outline-none transition-all`}
                placeholder="Describe your project..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Funding Stage *</label>
                <select
                  name="fundingStage"
                  value={formData.fundingStage}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg bg-white dark:bg-gray-900 border ${
                    errors.fundingStage ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'
                  } focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 outline-none transition-all`}
                >
                  <option value="" className="text-gray-500">Select funding stage</option>
                  <option value="bootstrapped">Bootstrapped</option>
                  <option value="pre-seed">Pre-seed</option>
                  <option value="seed">Seed</option>
                  <option value="series-a">Series A</option>
                  <option value="series-b+">Series B+</option>
                </select>
                {errors.fundingStage && (
                  <p className="mt-1 text-sm text-red-500">{errors.fundingStage}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg bg-white dark:bg-gray-900 border ${
                    errors.location ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'
                  } focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 outline-none transition-all`}
                  placeholder="Enter location"
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-500">{errors.location}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Equity Offered (%) *</label>
                <input
                  type="text"
                  name="equity"
                  value={formData.equity}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg bg-white dark:bg-gray-900 border ${
                    errors.equity ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'
                  } focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 outline-none transition-all`}
                  placeholder="Enter equity percentage"
                />
                {errors.equity && (
                  <p className="mt-1 text-sm text-red-500">{errors.equity}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Promotional Details</label>
              <textarea
                name="promotionalDetails"
                value={formData.promotionalDetails}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 outline-none transition-all"
                placeholder="Add any promotional details or perks..."
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8">
            <div className="bg-white/50 dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold mb-4">Review Your Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Company</p>
                  <p className="mt-1">{formData.companyName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Team Size</p>
                  <p className="mt-1">{formData.teamSize}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Category</p>
                  <p className="mt-1">{formData.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact</p>
                  <p className="mt-1">{formData.contactName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                  <p className="mt-1">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</p>
                  <p className="mt-1">{formData.location}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/50 dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold mb-4">Project Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</p>
                  <p className="mt-1">{formData.description}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Funding Stage</p>
                  <p className="mt-1">{formData.fundingStage}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Equity Offered</p>
                  <p className="mt-1">{formData.equity}%</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => console.log('Submit:', formData)}
              className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-all duration-300 font-medium"
            >
              Post Project
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Post Your Project</h1>
          <p className="text-gray-600 dark:text-gray-400">Share your startup idea and find the perfect team</p>
        </div>

        <StepIndicator currentStep={currentStep} steps={steps} />

        <div className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-800">
          {renderStep()}

          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={currentStep === 0}
            >
              <ChevronLeftIcon className="h-5 w-5" />
              Back
            </button>
            {currentStep < steps.length - 1 && (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-opacity"
              >
                Next
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
