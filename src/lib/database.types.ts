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
      writeups: {
        Row: {
          id: string
          title: string
          description: string | null
          category: string
          difficulty: 'Easy' | 'Medium' | 'Hard' | 'Insane'
          platform: string
          date: string
          tags: string[] | null
          content: string
          published: boolean
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          category: string
          difficulty: 'Easy' | 'Medium' | 'Hard' | 'Insane'
          platform: string
          date?: string
          tags?: string[] | null
          content: string
          published?: boolean
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          category?: string
          difficulty?: 'Easy' | 'Medium' | 'Hard' | 'Insane'
          platform?: string
          date?: string
          tags?: string[] | null
          content?: string
          published?: boolean
          slug?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}