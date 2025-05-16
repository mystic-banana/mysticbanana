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
          name: string | null
          birth_date: string | null
          birth_time: string | null
          birth_place: string | null
          zodiac_sign: string | null
          is_premium: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name?: string | null
          birth_date?: string | null
          birth_time?: string | null
          birth_place?: string | null
          zodiac_sign?: string | null
          is_premium?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          birth_date?: string | null
          birth_time?: string | null
          birth_place?: string | null
          zodiac_sign?: string | null
          is_premium?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      readings: {
        Row: {
          id: string
          user_id: string
          type: string
          content: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          content: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          content?: Json
          created_at?: string
        }
      }
    }
  }
}