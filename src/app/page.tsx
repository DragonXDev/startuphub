import ProjectCard from '@/components/ProjectCard';
import { ArrowRight } from 'lucide-react';

const exampleProjects = [
  {
    title: "AI-Powered Health Assistant",
    description: "Building a revolutionary health monitoring app that uses AI to provide personalized health insights and recommendations.",
    tags: [
      { name: "AI/ML", color: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100" },
      { name: "Healthcare", color: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100" },
      { name: "Mobile", color: "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100" }
    ],
    lookingFor: ["ML Engineer", "Mobile Developer", "UI/UX Designer"],
    websiteUrl: "https://example.com",
    githubUrl: "https://github.com",
    postedBy: {
      name: "Sarah Chen",
      role: "Founder & CEO",
      company: "HealthTech AI",
      postedDate: "2 days ago"
    }
  },
  {
    title: "Sustainable Fashion Marketplace",
    description: "Creating a platform that connects eco-friendly fashion brands with conscious consumers.",
    tags: [
      { name: "E-commerce", color: "bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-100" },
      { name: "Sustainability", color: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100" }
    ],
    lookingFor: ["Full-stack Developer", "Marketing Expert"],
    websiteUrl: "https://example.com",
    postedBy: {
      name: "Michael Rodriguez",
      role: "Co-founder",
      company: "EcoStyle",
      postedDate: "5 days ago"
    }
  },
  {
    title: "Decentralized Education Platform",
    description: "Revolutionizing education with blockchain technology for verified credentials and peer-to-peer learning.",
    tags: [
      { name: "Blockchain", color: "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100" },
      { name: "Education", color: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100" }
    ],
    lookingFor: ["Blockchain Developer", "Product Manager", "Content Creator"],
    githubUrl: "https://github.com",
    postedBy: {
      name: "Alex Thompson",
      role: "Technical Lead",
      company: "EduChain",
      postedDate: "1 week ago"
    }
  },
  {
    title: "Smart Home Automation System",
    description: "Developing an integrated IoT platform for seamless home automation and energy management.",
    tags: [
      { name: "IoT", color: "bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-100" },
      { name: "Hardware", color: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100" }
    ],
    lookingFor: ["IoT Engineer", "Frontend Developer"],
    websiteUrl: "https://example.com",
    githubUrl: "https://github.com",
    postedBy: {
      name: "David Park",
      role: "CTO",
      company: "SmartSpace",
      postedDate: "3 days ago"
    }
  },
  {
    title: "Community-Driven Food Delivery",
    description: "Building a platform that connects local home chefs with food enthusiasts in their neighborhood.",
    tags: [
      { name: "Food-Tech", color: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100" },
      { name: "Community", color: "bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-100" }
    ],
    lookingFor: ["Backend Developer", "UX Researcher", "Mobile Developer"],
    websiteUrl: "https://example.com",
    postedBy: {
      name: "Lisa Wang",
      role: "Product Lead",
      company: "LocalEats",
      postedDate: "1 day ago"
    }
  },
  {
    title: "AR-based Interior Design Tool",
    description: "Creating an augmented reality application for visualizing furniture and decor in real-time.",
    tags: [
      { name: "AR/VR", color: "bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-100" },
      { name: "Design", color: "bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-100" }
    ],
    lookingFor: ["AR Developer", "3D Artist", "iOS Developer"],
    githubUrl: "https://github.com",
    postedBy: {
      name: "James Foster",
      role: "Founder",
      company: "ARchitect",
      postedDate: "4 days ago"
    }
  },
  {
    title: "AI-Powered Content Creation Platform",
    description: "Building an innovative platform that helps creators generate and optimize content using advanced AI algorithms.",
    tags: [
      { name: "AI", color: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100" },
      { name: "Content", color: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100" }
    ],
    lookingFor: ["ML Engineer", "Frontend Developer", "Content Strategist"],
    websiteUrl: "https://example.com",
    postedBy: {
      name: "Emma Watson",
      role: "CEO",
      company: "ContentAI",
      postedDate: "6 days ago"
    }
  },
  {
    title: "Crypto Trading Analytics Dashboard",
    description: "Developing a comprehensive analytics platform for cryptocurrency traders with real-time insights and AI predictions.",
    tags: [
      { name: "Crypto", color: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100" },
      { name: "Analytics", color: "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100" }
    ],
    lookingFor: ["Data Scientist", "Full-stack Developer", "UI Designer"],
    githubUrl: "https://github.com",
    postedBy: {
      name: "Ryan Chen",
      role: "Technical Co-founder",
      company: "CryptoMetrics",
      postedDate: "2 days ago"
    }
  },
  {
    title: "Social Learning Platform for Musicians",
    description: "Creating an interactive platform where musicians can learn, collaborate, and share their musical journey.",
    tags: [
      { name: "Music", color: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100" },
      { name: "Social", color: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100" }
    ],
    lookingFor: ["Audio Engineer", "React Developer", "Community Manager"],
    websiteUrl: "https://example.com",
    postedBy: {
      name: "Maria Garcia",
      role: "Founder",
      company: "MusicMentor",
      postedDate: "1 week ago"
    }
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-4 mb-[-10vh]">
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white">
            Turn Ideas into Reality
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join innovative startup projects or find talented co-founders for your next big idea
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 font-medium">
              Explore Projects <ArrowRight className="h-5 w-5" />
            </button>
            <button className="px-8 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium">
              Post Your Idea
            </button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exampleProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </section>
    </main>
  );
}
