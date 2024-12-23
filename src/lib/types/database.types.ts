export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          bio: string | null
          avatar_url: string | null
          website: string | null
          linkedin_url: string | null
          github_url: string | null
          twitter_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          website?: string | null
          linkedin_url?: string | null
          github_url?: string | null
          twitter_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          website?: string | null
          linkedin_url?: string | null
          github_url?: string | null
          twitter_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string
          team_size: string
          category: string
          email: string
          website: string | null
          contact_name: string
          phone: string | null
          funding_stage: string
          location: string
          promotional_details: string | null
          equity: string
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          team_size: string
          category: string
          email: string
          website?: string | null
          contact_name: string
          phone?: string | null
          funding_stage: string
          location: string
          promotional_details?: string | null
          equity: string
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          team_size?: string
          category?: string
          email?: string
          website?: string | null
          contact_name?: string
          phone?: string | null
          funding_stage?: string
          location?: string
          promotional_details?: string | null
          equity?: string
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      roles: {
        Row: {
          id: string
          project_id: string
          title: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          title: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          title?: string
          description?: string | null
          created_at?: string
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          color: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          color?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          color?: string | null
          created_at?: string
        }
      }
      project_tags: {
        Row: {
          project_id: string
          tag_id: string
        }
        Insert: {
          project_id: string
          tag_id: string
        }
        Update: {
          project_id?: string
          tag_id?: string
        }
      }
    }
  }
}
