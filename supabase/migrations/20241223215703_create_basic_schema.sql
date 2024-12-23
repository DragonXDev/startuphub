-- Create basic enums
CREATE TYPE project_category AS ENUM (
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
    'IoT/Hardware'
);

CREATE TYPE funding_stage AS ENUM (
    'Pre-seed',
    'Seed',
    'Series A',
    'Series B',
    'Series C+',
    'Bootstrapped',
    'Revenue Generating'
);

-- Create basic tables
CREATE TABLE projects (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    description text NOT NULL,
    company_name text,
    category project_category NOT NULL,
    funding_stage funding_stage,
    team_size text,
    location text,
    equity_offered text,
    website_url text,
    github_url text,
    promotional_details text,
    contact_email text NOT NULL,
    contact_name text NOT NULL,
    contact_phone text,
    user_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE TABLE tags (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL UNIQUE,
    color text NOT NULL DEFAULT '#000000',
    created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE roles (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL UNIQUE,
    created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE project_tags (
    project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
    tag_id uuid REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, tag_id)
);

CREATE TABLE project_roles (
    project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
    role_id uuid REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, role_id)
);