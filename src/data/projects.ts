export interface Project {
  id: string;
  title: string;
  description: string;
  companyName: string;
  tags: Tag[];
  lookingFor: string[];
  websiteUrl?: string;
  githubUrl?: string;
  fundingStage: string;
  fundingAmount?: string;
  equity: string;
  location: string;
  remote: boolean;
  postedBy: {
    name: string;
    role: string;
    company: string;
    avatar?: string;
    postedDate: string;
  };
  teamSize: string;
  category: string;
  techStack?: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
}

export interface Tag {
  name: string;
  color: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Content Creation Platform',
    description: 'Building the next generation of AI-powered content creation tools for marketers and creators.',
    companyName: 'ContentAI',
    tags: [
      { name: 'AI/ML', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300' },
      { name: 'SaaS', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' },
    ],
    lookingFor: ['Full-stack Developer', 'ML Engineer', 'UI/UX Designer'],
    websiteUrl: 'https://contentai.example.com',
    githubUrl: 'https://github.com/contentai',
    fundingStage: 'Seed',
    fundingAmount: '$2M',
    equity: '2-3%',
    location: 'San Francisco, CA',
    remote: true,
    postedBy: {
      name: 'Sarah Chen',
      role: 'CTO',
      company: 'ContentAI',
      postedDate: '2 days ago',
    },
    teamSize: '6-10',
    category: 'AI/Machine Learning',
    techStack: ['Python', 'React', 'TensorFlow', 'AWS'],
    salary: {
      min: 120000,
      max: 180000,
      currency: 'USD',
    },
  },
  {
    id: '2',
    title: 'Decentralized Finance Analytics Dashboard',
    description: 'Creating a comprehensive analytics platform for DeFi traders and investors.',
    companyName: 'DeFiMetrics',
    tags: [
      { name: 'Web3', color: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' },
      { name: 'Blockchain', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' },
    ],
    lookingFor: ['Smart Contract Developer', 'Frontend Developer', 'Data Analyst'],
    websiteUrl: 'https://defimetrics.example.com',
    fundingStage: 'Pre-seed',
    equity: '4-5%',
    location: 'Remote',
    remote: true,
    postedBy: {
      name: 'Alex Thompson',
      role: 'Founder',
      company: 'DeFiMetrics',
      postedDate: '5 days ago',
    },
    teamSize: '2-5',
    category: 'Web3/Blockchain',
    techStack: ['Solidity', 'TypeScript', 'Next.js', 'The Graph'],
  },
  {
    id: '3',
    title: 'Healthcare Management Platform',
    description: 'Revolutionizing healthcare management with AI and automation.',
    companyName: 'HealthFlow',
    tags: [
      { name: 'HealthTech', color: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' },
      { name: 'Enterprise', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300' },
    ],
    lookingFor: ['Backend Developer', 'DevOps Engineer', 'Product Manager'],
    fundingStage: 'Series A',
    fundingAmount: '$8M',
    equity: '1-1.5%',
    location: 'Boston, MA',
    remote: false,
    postedBy: {
      name: 'Dr. Michael Roberts',
      role: 'CEO',
      company: 'HealthFlow',
      postedDate: '1 week ago',
    },
    teamSize: '11-20',
    category: 'HealthTech',
    techStack: ['Java', 'Spring Boot', 'React', 'AWS'],
    salary: {
      min: 140000,
      max: 200000,
      currency: 'USD',
    },
  },
  {
    id: '4',
    title: 'Social Learning Platform for Musicians',
    description: 'Building a collaborative platform for musicians to learn and teach.',
    companyName: 'MusicMentor',
    tags: [
      { name: 'EdTech', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300' },
      { name: 'Social', color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300' },
    ],
    lookingFor: ['Mobile Developer', 'Frontend Developer', 'Community Manager'],
    websiteUrl: 'https://musicmentor.example.com',
    fundingStage: 'Bootstrapped',
    equity: '5-7%',
    location: 'Austin, TX',
    remote: true,
    postedBy: {
      name: 'James Wilson',
      role: 'Co-founder',
      company: 'MusicMentor',
      postedDate: '3 days ago',
    },
    teamSize: '1',
    category: 'EdTech',
    techStack: ['React Native', 'Node.js', 'Firebase'],
  },
  {
    id: '5',
    title: 'E-commerce Analytics Platform',
    description: 'Helping e-commerce businesses make data-driven decisions.',
    companyName: 'RetailMetrics',
    tags: [
      { name: 'E-commerce', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300' },
      { name: 'Analytics', color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300' },
    ],
    lookingFor: ['Data Scientist', 'Full-stack Developer', 'Sales Lead'],
    fundingStage: 'Seed',
    fundingAmount: '$1.5M',
    equity: '2-4%',
    location: 'New York, NY',
    remote: true,
    postedBy: {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      company: 'RetailMetrics',
      postedDate: '4 days ago',
    },
    teamSize: '6-10',
    category: 'E-commerce',
    techStack: ['Python', 'Django', 'Vue.js', 'GCP'],
    salary: {
      min: 110000,
      max: 170000,
      currency: 'USD',
    },
  },
];

export const categories = [
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

export const roles = [
  'Full-stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Mobile Developer',
  'ML Engineer',
  'Data Scientist',
  'UI/UX Designer',
  'Product Manager',
  'DevOps Engineer',
  'Smart Contract Developer',
  'Community Manager',
  'Sales Lead',
] as const;

export const fundingStages = [
  'Bootstrapped',
  'Pre-seed',
  'Seed',
  'Series A',
  'Series B+',
] as const;

export const teamSizes = [
  '1',
  '2-5',
  '6-10',
  '11-20',
  '20+',
] as const;
