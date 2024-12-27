-- Grant necessary permissions for the projects table and related tables
grant usage on schema public to postgres, anon, authenticated;

-- Projects table permissions
grant all privileges on public.projects to postgres, anon, authenticated;

-- Tags and roles tables permissions
grant all privileges on public.tags to postgres, anon, authenticated;
grant all privileges on public.roles to postgres, anon, authenticated;

-- Junction tables permissions
grant all privileges on public.project_tags to postgres, anon, authenticated;
grant all privileges on public.project_roles to postgres, anon, authenticated;

-- Grant sequence permissions
grant all privileges on all sequences in schema public to postgres, anon, authenticated;

-- Enable Row Level Security
alter table public.projects enable row level security;
alter table public.tags enable row level security;
alter table public.roles enable row level security;
alter table public.project_tags enable row level security;
alter table public.project_roles enable row level security;

-- Projects policies
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

-- Tags policies
create policy "Tags are viewable by everyone"
    on tags for select
    using (true);

create policy "Users can create tags"
    on tags for insert
    with check (true);

-- Roles policies
create policy "Roles are viewable by everyone"
    on roles for select
    using (true);

create policy "Users can create roles"
    on roles for insert
    with check (true);

-- Project tags junction table policies
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

-- Project roles junction table policies
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
