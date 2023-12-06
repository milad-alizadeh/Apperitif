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
      app_content: {
        Row: {
          content: Json | null
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          content?: Json | null
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          content?: Json | null
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          name: string
          parent_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          name: string
          parent_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          name?: string
          parent_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_categories_id_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categories_parent_id_categories_id_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "ingredients_by_categories"
            referencedColumns: ["id"]
          }
        ]
      }
      equipment: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      ingredients: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      ingredients_categories: {
        Row: {
          category_id: string
          created_at: string
          ingredient_id: string
          updated_at: string
        }
        Insert: {
          category_id: string
          created_at?: string
          ingredient_id: string
          updated_at?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          ingredient_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ingredients_categories_category_id_categories_id_fk"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ingredients_categories_category_id_categories_id_fk"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "ingredients_by_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ingredients_categories_ingredient_id_ingredients_id_fk"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_auth_users"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles_ingredients: {
        Row: {
          created_at: string
          ingredient_id: string
          profile_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          ingredient_id: string
          profile_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          ingredient_id?: string
          profile_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_ingredients_ingredient_id_ingredients_id_fk"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_ingredients_profile_id_profiles_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "available_recipes_for_profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "profiles_ingredients_profile_id_profiles_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles_recipes: {
        Row: {
          created_at: string
          profile_id: string
          recipe_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          profile_id: string
          recipe_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          profile_id?: string
          recipe_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_recipes_profile_id_profiles_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "available_recipes_for_profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "profiles_recipes_profile_id_profiles_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_recipes_recipe_id_recipes_id_fk"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "available_recipes_for_profiles"
            referencedColumns: ["recipe_id"]
          },
          {
            foreignKeyName: "profiles_recipes_recipe_id_recipes_id_fk"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          }
        ]
      }
      recipes: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_draft: boolean | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_draft?: boolean | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_draft?: boolean | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      recipes_categories: {
        Row: {
          category_id: string
          created_at: string
          recipe_id: string
          updated_at: string
        }
        Insert: {
          category_id: string
          created_at?: string
          recipe_id: string
          updated_at?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          recipe_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipes_categories_category_id_categories_id_fk"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipes_categories_category_id_categories_id_fk"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "ingredients_by_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipes_categories_recipe_id_recipes_id_fk"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "available_recipes_for_profiles"
            referencedColumns: ["recipe_id"]
          },
          {
            foreignKeyName: "recipes_categories_recipe_id_recipes_id_fk"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          }
        ]
      }
      recipes_equipment: {
        Row: {
          created_at: string
          equipment_id: string
          recipe_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          equipment_id: string
          recipe_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          equipment_id?: string
          recipe_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipes_equipment_equipment_id_equipment_id_fk"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipes_equipment_recipe_id_recipes_id_fk"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "available_recipes_for_profiles"
            referencedColumns: ["recipe_id"]
          },
          {
            foreignKeyName: "recipes_equipment_recipe_id_recipes_id_fk"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          }
        ]
      }
      recipes_ingredients: {
        Row: {
          created_at: string
          ingredient_id: string
          is_optional: boolean | null
          quantity: number | null
          recipe_id: string
          unit_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          ingredient_id: string
          is_optional?: boolean | null
          quantity?: number | null
          recipe_id: string
          unit_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          ingredient_id?: string
          is_optional?: boolean | null
          quantity?: number | null
          recipe_id?: string
          unit_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipes_ingredients_ingredient_id_ingredients_id_fk"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipes_ingredients_recipe_id_recipes_id_fk"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "available_recipes_for_profiles"
            referencedColumns: ["recipe_id"]
          },
          {
            foreignKeyName: "recipes_ingredients_recipe_id_recipes_id_fk"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipes_ingredients_unit_id_units_id_fk"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          }
        ]
      }
      steps: {
        Row: {
          created_at: string
          description: string
          id: string
          number: number
          recipe_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          number: number
          recipe_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          number?: number
          recipe_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "steps_recipe_id_recipes_id_fk"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "available_recipes_for_profiles"
            referencedColumns: ["recipe_id"]
          },
          {
            foreignKeyName: "steps_recipe_id_recipes_id_fk"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          }
        ]
      }
      units: {
        Row: {
          abbreviation: string
          base_conversion_factor: number | null
          base_unit_id: string | null
          created_at: string
          id: string
          is_convertable: boolean
          name: string
          plural: string
          system: string
          system_to_system_conversion_factor: number | null
          type: string
          updated_at: string
        }
        Insert: {
          abbreviation: string
          base_conversion_factor?: number | null
          base_unit_id?: string | null
          created_at?: string
          id?: string
          is_convertable?: boolean
          name: string
          plural: string
          system?: string
          system_to_system_conversion_factor?: number | null
          type?: string
          updated_at?: string
        }
        Update: {
          abbreviation?: string
          base_conversion_factor?: number | null
          base_unit_id?: string | null
          created_at?: string
          id?: string
          is_convertable?: boolean
          name?: string
          plural?: string
          system?: string
          system_to_system_conversion_factor?: number | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "units_base_unit_id_units_id_fk"
            columns: ["base_unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      available_recipes_for_profiles: {
        Row: {
          can_almost_make: boolean | null
          is_total_match: boolean | null
          matched_ingredients_count: number | null
          missing_ingredients: Json | null
          profile_id: string | null
          recipe_id: string | null
          recipe_image_url: string | null
          recipe_name: string | null
          total_required_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_auth_users"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      ingredients_by_categories: {
        Row: {
          count: number | null
          data: Json | null
          id: string | null
          title: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      create_or_update_app_content: {
        Args: {
          payload: Json
        }
        Returns: string
      }
      create_or_update_category: {
        Args: {
          payload: Json
        }
        Returns: string
      }
      create_or_update_equipment: {
        Args: {
          payload: Json
        }
        Returns: string
      }
      create_or_update_ingredient: {
        Args: {
          payload: Json
        }
        Returns: string
      }
      create_or_update_recipe: {
        Args: {
          payload: Json
        }
        Returns: string
      }
      create_trigger_for_table: {
        Args: {
          table_name: string
        }
        Returns: undefined
      }
      delete_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      does_email_exist: {
        Args: {
          email: string
        }
        Returns: boolean
      }
      get_available_recipes_for_profile: {
        Args: {
          user_id: string
        }
        Returns: {
          profile_id: string
          recipe_id: string
          recipe_image_url: string
          recipe_name: string
          matched_ingredients_count: number
          total_required_count: number
          is_total_match: boolean
          can_almost_make: boolean
          missing_ingredients: Json[]
        }[]
      }
      get_recipes_by_category_ids: {
        Args: {
          search_term: string
          category_ids: string[]
          page_number: number
          page_size: number
        }
        Returns: Database["public"]["CompositeTypes"]["recipes_page_info"]
      }
      gtrgm_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_options: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      gtrgm_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      search_ingredients: {
        Args: {
          search_term: string
        }
        Returns: Database["public"]["CompositeTypes"]["ingredient_result"][]
      }
      set_limit: {
        Args: {
          "": number
        }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      unaccent: {
        Args: {
          "": string
        }
        Returns: string
      }
      unaccent_init: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      ingredient_result: {
        id: string
        name: string
        description: string
      }
      recipe_preview: {
        id: string
        name: string
        image_url: string
      }
      recipe_profile_info: {
        profile_id: string
        recipe_id: string
        recipe_name: string
        matched_ingredients_count: number
        total_required_count: number
        is_total_match: boolean
        can_almost_make: boolean
        missing_ingredients: unknown
      }
      recipes_page_info: {
        recipes: unknown
        total_count: number
        has_next_page: boolean
      }
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
