-- Drop all existing tables to start fresh
DROP TABLE IF EXISTS project_tags CASCADE;
DROP TABLE IF EXISTS project_comments CASCADE;
DROP TABLE IF EXISTS project_likes CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Ensure UUID extension is enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE,
    full_name TEXT,
    bio TEXT,
    avatar_url TEXT,
    website TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    twitter_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create projects table
CREATE TABLE projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    team_size TEXT NOT NULL,
    category TEXT NOT NULL,
    email TEXT NOT NULL,
    website TEXT,
    contact_name TEXT NOT NULL,
    phone TEXT,
    funding_stage TEXT NOT NULL,
    location TEXT NOT NULL,
    promotional_details TEXT,
    equity TEXT NOT NULL,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create tags table
CREATE TABLE tags (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    color TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create project_tags junction table
CREATE TABLE project_tags (
    project_id UUID REFERENCES projects ON DELETE CASCADE,
    tag_id UUID REFERENCES tags ON DELETE CASCADE,
    PRIMARY KEY (project_id, tag_id)
);

-- Create roles table for projects
CREATE TABLE roles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    project_id UUID REFERENCES projects ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create project_likes table
CREATE TABLE project_likes (
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    project_id UUID REFERENCES projects ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    PRIMARY KEY (user_id, project_id)
);

-- Create project_comments table
CREATE TABLE project_comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    project_id UUID REFERENCES projects ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create triggers for automatic timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable row-level security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_comments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Projects policies
CREATE POLICY "Published projects are viewable by everyone" ON projects
    FOR SELECT USING (true);

CREATE POLICY "Users can manage own projects" ON projects
    FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Create default policies for other tables
CREATE POLICY "Users can manage tags" ON tags
    FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Users can manage project_tags" ON project_tags
    FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Users can manage roles" ON roles
    FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Users can like projects" ON project_likes
    FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Users can comment on projects" ON project_comments
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Create function to handle new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url)
    VALUES (
        new.id,
        new.raw_user_meta_data->>'full_name',
        new.raw_user_meta_data->>'avatar_url'
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
