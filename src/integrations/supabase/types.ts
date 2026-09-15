export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      career_applications: {
        Row: {
          applicant_name: string
          career_id: string | null
          created_at: string
          cv_link: string | null
          email: string
          id: string
          institution: string | null
          statement: string
          status: Database["public"]["Enums"]["submission_status"]
          user_id: string | null
        }
        Insert: {
          applicant_name: string
          career_id?: string | null
          created_at?: string
          cv_link?: string | null
          email: string
          id?: string
          institution?: string | null
          statement?: string
          status?: Database["public"]["Enums"]["submission_status"]
          user_id?: string | null
        }
        Update: {
          applicant_name?: string
          career_id?: string | null
          created_at?: string
          cv_link?: string | null
          email?: string
          id?: string
          institution?: string | null
          statement?: string
          status?: Database["public"]["Enums"]["submission_status"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "career_applications_career_id_fkey"
            columns: ["career_id"]
            isOneToOne: false
            referencedRelation: "careers"
            referencedColumns: ["id"]
          },
        ]
      }
      careers: {
        Row: {
          category: string
          created_at: string
          deadline: string | null
          description: string
          id: string
          is_open: boolean
          location: string
          position: string
        }
        Insert: {
          category?: string
          created_at?: string
          deadline?: string | null
          description?: string
          id?: string
          is_open?: boolean
          location?: string
          position: string
        }
        Update: {
          category?: string
          created_at?: string
          deadline?: string | null
          description?: string
          id?: string
          is_open?: boolean
          location?: string
          position?: string
        }
        Relationships: []
      }
      collaborations: {
        Row: {
          country: string | null
          created_at: string
          id: string
          kind: string
          partner: string
          proposal: string
          reviewed_by: string | null
          status: Database["public"]["Enums"]["submission_status"]
          submitted_by: string | null
          updated_at: string
        }
        Insert: {
          country?: string | null
          created_at?: string
          id?: string
          kind?: string
          partner: string
          proposal?: string
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
          submitted_by?: string | null
          updated_at?: string
        }
        Update: {
          country?: string | null
          created_at?: string
          id?: string
          kind?: string
          partner?: string
          proposal?: string
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
          submitted_by?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      datasets: {
        Row: {
          category: string
          created_at: string
          description: string
          file_link: string | null
          format: string
          id: string
          review_note: string | null
          reviewed_by: string | null
          station: string
          status: Database["public"]["Enums"]["submission_status"]
          submitted_by: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string
          file_link?: string | null
          format?: string
          id?: string
          review_note?: string | null
          reviewed_by?: string | null
          station?: string
          status?: Database["public"]["Enums"]["submission_status"]
          submitted_by?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          file_link?: string | null
          format?: string
          id?: string
          review_note?: string | null
          reviewed_by?: string | null
          station?: string
          status?: Database["public"]["Enums"]["submission_status"]
          submitted_by?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      education_modules: {
        Row: {
          content: Json
          created_at: string
          id: string
          kind: string
          level: string
          summary: string
          title: string
        }
        Insert: {
          content?: Json
          created_at?: string
          id?: string
          kind?: string
          level?: string
          summary?: string
          title: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          kind?: string
          level?: string
          summary?: string
          title?: string
        }
        Relationships: []
      }
      news: {
        Row: {
          category: string
          content: string
          created_at: string
          created_by: string | null
          id: string
          image_link: string | null
          published_at: string
          title: string
        }
        Insert: {
          category?: string
          content?: string
          created_at?: string
          created_by?: string | null
          id?: string
          image_link?: string | null
          published_at?: string
          title: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          created_by?: string | null
          id?: string
          image_link?: string | null
          published_at?: string
          title?: string
        }
        Relationships: []
      }
      outreach_posts: {
        Row: {
          content: string
          created_at: string
          id: string
          media_link: string | null
          media_type: string
          reviewed_by: string | null
          status: Database["public"]["Enums"]["submission_status"]
          submitted_by: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content?: string
          created_at?: string
          id?: string
          media_link?: string | null
          media_type?: string
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
          submitted_by?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          media_link?: string | null
          media_type?: string
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
          submitted_by?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          institution: string | null
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          institution?: string | null
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          institution?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      visualization_series: {
        Row: {
          id: string
          parameter: string
          recorded_at: string
          station: string
          unit: string
          value: number
        }
        Insert: {
          id?: string
          parameter: string
          recorded_at?: string
          station: string
          unit?: string
          value: number
        }
        Update: {
          id?: string
          parameter?: string
          recorded_at?: string
          station?: string
          unit?: string
          value?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "public_user" | "researcher" | "admin"
      submission_status: "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["public_user", "researcher", "admin"],
      submission_status: ["pending", "approved", "rejected"],
    },
  },
} as const
