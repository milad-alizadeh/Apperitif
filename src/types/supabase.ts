export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
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
            foreignKeyName: 'categories_parent_id_categories_id_fk'
            columns: ['parent_id']
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
        ]
      }
      content_apperitivo: {
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
      equipments: {
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
            foreignKeyName: 'ingredients_categories_category_id_categories_id_fk'
            columns: ['category_id']
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'ingredients_categories_ingredient_id_ingredients_id_fk'
            columns: ['ingredient_id']
            referencedRelation: 'ingredients'
            referencedColumns: ['id']
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          name?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'fk_auth_users'
            columns: ['id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
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
            foreignKeyName: 'profiles_ingredients_ingredient_id_ingredients_id_fk'
            columns: ['ingredient_id']
            referencedRelation: 'ingredients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profiles_ingredients_profile_id_profiles_id_fk'
            columns: ['profile_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
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
            foreignKeyName: 'profiles_recipes_profile_id_profiles_id_fk'
            columns: ['profile_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profiles_recipes_recipe_id_recipes_id_fk'
            columns: ['recipe_id']
            referencedRelation: 'recipes'
            referencedColumns: ['id']
          },
        ]
      }
      recipes: {
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
            foreignKeyName: 'recipes_categories_category_id_categories_id_fk'
            columns: ['category_id']
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'recipes_categories_recipe_id_recipes_id_fk'
            columns: ['recipe_id']
            referencedRelation: 'recipes'
            referencedColumns: ['id']
          },
        ]
      }
      recipes_equipments: {
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
            foreignKeyName: 'recipes_equipments_equipment_id_equipments_id_fk'
            columns: ['equipment_id']
            referencedRelation: 'equipments'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'recipes_equipments_recipe_id_recipes_id_fk'
            columns: ['recipe_id']
            referencedRelation: 'recipes'
            referencedColumns: ['id']
          },
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
            foreignKeyName: 'recipes_ingredients_ingredient_id_ingredients_id_fk'
            columns: ['ingredient_id']
            referencedRelation: 'ingredients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'recipes_ingredients_recipe_id_recipes_id_fk'
            columns: ['recipe_id']
            referencedRelation: 'recipes'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'recipes_ingredients_unit_id_units_id_fk'
            columns: ['unit_id']
            referencedRelation: 'units'
            referencedColumns: ['id']
          },
        ]
      }
      steps: {
        Row: {
          created_at: string
          description: string
          id: string
          number: number
          recipe_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          number: number
          recipe_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          number?: number
          recipe_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'steps_recipe_id_recipes_id_fk'
            columns: ['recipe_id']
            referencedRelation: 'recipes'
            referencedColumns: ['id']
          },
        ]
      }
      units: {
        Row: {
          created_at: string
          id: string
          is_convertable: boolean | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_convertable?: boolean | null
          name?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_convertable?: boolean | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_trigger_for_table: {
        Args: {
          table_name: string
        }
        Returns: undefined
      }
      does_email_exist: {
        Args: {
          email: string
        }
        Returns: boolean
      }
      get_recipes_by_category_ids: {
        Args: {
          search_term: string
          category_ids: string[]
          page_number: number
          page_size: number
        }
        Returns: Database['public']['CompositeTypes']['recipes_page_info']
      }
      gtrgm_compress: {
        Args: {
          '': unknown
        }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: {
          '': unknown
        }
        Returns: unknown
      }
      gtrgm_in: {
        Args: {
          '': unknown
        }
        Returns: unknown
      }
      gtrgm_options: {
        Args: {
          '': unknown
        }
        Returns: undefined
      }
      gtrgm_out: {
        Args: {
          '': unknown
        }
        Returns: unknown
      }
      search_ingredients: {
        Args: {
          search_term: string
        }
        Returns: Database['public']['CompositeTypes']['ingredient_result'][]
      }
      set_limit: {
        Args: {
          '': number
        }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: {
          '': string
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
      }
      recipe_preview: {
        id: string
        name: string
        image_url: string
      }
      recipes_page_info: {
        recipes: unknown
        total_count: number
        has_next_page: boolean
      }
    }
  }
}
