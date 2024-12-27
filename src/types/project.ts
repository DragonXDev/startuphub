export type ProjectCategory =
  | 'AI/Machine Learning'
  | 'Web3/Blockchain'
  | 'SaaS'
  | 'E-commerce'
  | 'FinTech'
  | 'EdTech'
  | 'HealthTech'
  | 'Social Media'
  | 'Developer Tools'
  | 'Mobile Apps'
  | 'Gaming'
  | 'IoT/Hardware';

export type FundingStage =
  | 'Pre-seed'
  | 'Seed'
  | 'Series A'
  | 'Series B'
  | 'Series C+'
  | 'Bootstrapped'
  | 'Revenue Generating';

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Role {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  title: string;
  company_name?: string;
  description: string;
  category: ProjectCategory;
  funding_stage?: FundingStage;
  team_size?: string;
  location?: string;
  equity_offered?: string;
  website_url?: string;
  github_url?: string;
  promotional_details?: string;
  contact_email: string;
  contact_name: string;
  contact_phone?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  tags?: Tag[];
  roles?: Role[];
}

export interface ProjectWithUser extends Project {
  user: {
    id: string;
    email?: string;
    user_metadata: {
      full_name?: string;
      avatar_url?: string;
    };
  };
}
