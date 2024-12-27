-- Create a secure profiles table with proper RLS policies
create table if not exists public.profiles (
    id uuid references auth.users on delete cascade primary key,
    bio text,
    role text default 'user'::text,
    email text,
    website text,
    location text,
    username text unique,
    full_name text,
    avatar_url text,
    updated_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Grant necessary permissions to the authenticated and anon roles
grant usage on schema public to postgres, anon, authenticated;
grant all privileges on public.profiles to postgres, anon, authenticated;
grant all privileges on all sequences in schema public to postgres, anon, authenticated;

-- Create policies for profile access and modification
create policy "Public profiles are viewable by everyone"
    on profiles for select
    using (true);

create policy "Users can insert their own profile"
    on profiles for insert
    with check (auth.uid() = id);

create policy "Users can update their own profile"
    on profiles for update
    using (auth.uid() = id);

-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id, email, full_name, avatar_url)
    values (
        new.id,
        new.email,
        new.raw_user_meta_data->>'full_name',
        new.raw_user_meta_data->>'avatar_url'
    );
    return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user creation
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();
