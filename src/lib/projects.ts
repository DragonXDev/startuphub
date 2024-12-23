import { createClient } from '@/lib/supabase/client'
import { Project, Tag, Role } from '@/types/project'

const supabase = createClient()

export async function getProjects() {
  const { data: projects, error } = await supabase
    .from('projects')
    .select(`
      *,
      tags:project_tags(
        tag:tags(*)
      ),
      roles:project_roles(
        role:roles(*)
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return projects.map(project => ({
    ...project,
    tags: project.tags?.map((t: any) => t.tag) || [],
    roles: project.roles?.map((r: any) => r.role) || []
  }))
}

export async function getProjectById(id: string) {
  const { data: project, error } = await supabase
    .from('projects')
    .select(`
      *,
      tags:project_tags(
        tag:tags(*)
      ),
      roles:project_roles(
        role:roles(*)
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    throw error
  }

  return {
    ...project,
    tags: project.tags?.map((t: any) => t.tag) || [],
    roles: project.roles?.map((r: any) => r.role) || []
  }
}

export async function createProject(
  project: Omit<Project, 'id' | 'user_id' | 'created_at' | 'updated_at'> & {
    tags: string[];
    roles: string[];
  }
) {
  const {
    tags: tagNames,
    roles: roleNames,
    ...projectData
  } = project

  // Get authenticated user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // Insert project
  const { data: newProject, error: projectError } = await supabase
    .from('projects')
    .insert([{ ...projectData, user_id: user.id }])
    .select()
    .single()

  if (projectError) throw projectError

  // Insert tags
  if (tagNames.length > 0) {
    const { data: tags, error: tagsError } = await supabase
      .from('tags')
      .upsert(
        tagNames.map(name => ({
          name,
          color: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`
        }))
      )
      .select()

    if (tagsError) throw tagsError

    // Link tags to project
    if (tags) {
      const { error: linkError } = await supabase
        .from('project_tags')
        .insert(
          tags.map(tag => ({
            project_id: newProject.id,
            tag_id: tag.id
          }))
        )

      if (linkError) throw linkError
    }
  }

  // Insert roles
  if (roleNames.length > 0) {
    const { data: roles, error: rolesError } = await supabase
      .from('roles')
      .upsert(roleNames.map(name => ({ name })))
      .select()

    if (rolesError) throw rolesError

    // Link roles to project
    if (roles) {
      const { error: linkError } = await supabase
        .from('project_roles')
        .insert(
          roles.map(role => ({
            project_id: newProject.id,
            role_id: role.id
          }))
        )

      if (linkError) throw linkError
    }
  }

  return newProject
}

export async function updateProject(
  id: string,
  project: Partial<Omit<Project, 'id' | 'user_id' | 'created_at' | 'updated_at'>> & {
    tags?: string[];
    roles?: string[];
  }
) {
  const {
    tags: tagNames,
    roles: roleNames,
    ...projectData
  } = project

  // Get authenticated user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // Update project
  const { error: projectError } = await supabase
    .from('projects')
    .update(projectData)
    .eq('id', id)
    .eq('user_id', user.id)

  if (projectError) throw projectError

  if (tagNames) {
    // Remove existing tags
    await supabase
      .from('project_tags')
      .delete()
      .eq('project_id', id)

    // Add new tags
    if (tagNames.length > 0) {
      const { data: tags, error: tagsError } = await supabase
        .from('tags')
        .upsert(
          tagNames.map(name => ({
            name,
            color: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`
          }))
        )
        .select()

      if (tagsError) throw tagsError

      if (tags) {
        const { error: linkError } = await supabase
          .from('project_tags')
          .insert(
            tags.map(tag => ({
              project_id: id,
              tag_id: tag.id
            }))
          )

        if (linkError) throw linkError
      }
    }
  }

  if (roleNames) {
    // Remove existing roles
    await supabase
      .from('project_roles')
      .delete()
      .eq('project_id', id)

    // Add new roles
    if (roleNames.length > 0) {
      const { data: roles, error: rolesError } = await supabase
        .from('roles')
        .upsert(roleNames.map(name => ({ name })))
        .select()

      if (rolesError) throw rolesError

      if (roles) {
        const { error: linkError } = await supabase
          .from('project_roles')
          .insert(
            roles.map(role => ({
              project_id: id,
              role_id: role.id
            }))
          )

        if (linkError) throw linkError
      }
    }
  }

  return getProjectById(id)
}

export async function deleteProject(id: string) {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) throw error
}
