-- Drop existing tables if they exist (be careful with this in production!)
drop table if exists public.project_roles cascade;
drop table if exists public.project_tags cascade;
drop table if exists public.projects cascade;
drop table if exists public.tags cascade;
drop table if exists public.roles cascade;

-- Create tags table
create table public.tags (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    color text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create roles table
create table public.roles (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create projects table with proper foreign key to auth.users
create table public.projects (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    description text not null,
    company_name text,
    category text not null,
    funding_stage text,
    team_size text,
    location text,
    equity_offered text,
    website_url text,
    github_url text,
    promotional_details text,
    contact_email text not null,
    contact_name text not null,
    contact_phone text,
    user_id uuid references auth.users(id) on delete cascade not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create junction table for projects and tags
create table public.project_tags (
    project_id uuid references public.projects(id) on delete cascade,
    tag_id uuid references public.tags(id) on delete cascade,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    primary key (project_id, tag_id)
);

-- Create junction table for projects and roles
create table public.project_roles (
    project_id uuid references public.projects(id) on delete cascade,
    role_id uuid references public.roles(id) on delete cascade,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    primary key (project_id, role_id)
);

-- Enable RLS on all tables
alter table public.projects enable row level security;
alter table public.tags enable row level security;
alter table public.roles enable row level security;
alter table public.project_tags enable row level security;
alter table public.project_roles enable row level security;

-- Grant necessary permissions
grant usage on schema public to postgres, anon, authenticated;
grant all privileges on all tables in schema public to postgres, anon, authenticated;
grant all privileges on all sequences in schema public to postgres, anon, authenticated;

-- Create policies for projects
create policy "Projects are viewable by everyone"
    on projects for select
    using (true);

create policy "Users can insert their own projects"
    on projects for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own projects"
    on projects for update
    using (auth.uid() = user_id);

create policy "Users can delete their own projects"
    on projects for delete
    using (auth.uid() = user_id);

-- Policies for tags
create policy "Tags are viewable by everyone"
    on tags for select
    using (true);

create policy "Users can create tags"
    on tags for insert
    with check (true);

-- Policies for roles
create policy "Roles are viewable by everyone"
    on roles for select
    using (true);

create policy "Users can create roles"
    on roles for insert
    with check (true);

-- Policies for project_tags
create policy "Project tags are viewable by everyone"
    on project_tags for select
    using (true);

create policy "Users can manage project tags for their projects"
    on project_tags for all
    using (
        exists (
            select 1 from projects
            where projects.id = project_tags.project_id
            and projects.user_id = auth.uid()
        )
    );

-- Policies for project_roles
create policy "Project roles are viewable by everyone"
    on project_roles for select
    using (true);

create policy "Users can manage project roles for their projects"
    on project_roles for all
    using (
        exists (
            select 1 from projects
            where projects.id = project_roles.project_id
            and projects.user_id = auth.uid()
        )
    );

-- Create indexes for better performance
create index if not exists projects_user_id_idx on projects(user_id);
create index if not exists project_tags_project_id_idx on project_tags(project_id);
create index if not exists project_tags_tag_id_idx on project_tags(tag_id);
create index if not exists project_roles_project_id_idx on project_roles(project_id);
create index if not exists project_roles_role_id_idx on project_roles(role_id);
