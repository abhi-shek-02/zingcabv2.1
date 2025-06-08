import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string
          booking_id: string
          phone: string
          from_city: string
          to_city: string | null
          pickup_date: string
          return_date: string | null
          pickup_time: string
          trip_type: string
          car_type: string
          estimated_fare: number
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          phone: string
          from_city: string
          to_city?: string | null
          pickup_date: string
          return_date?: string | null
          pickup_time: string
          trip_type: string
          car_type: string
          estimated_fare: number
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          phone?: string
          from_city?: string
          to_city?: string | null
          pickup_date?: string
          return_date?: string | null
          pickup_time?: string
          trip_type?: string
          car_type?: string
          estimated_fare?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      routes: {
        Row: {
          id: string
          from_city: string
          to_city: string
          distance: number
          sedan_price: number
          suv_price: number
          created_at: string
        }
        Insert: {
          id?: string
          from_city: string
          to_city: string
          distance: number
          sedan_price: number
          suv_price: number
          created_at?: string
        }
        Update: {
          id?: string
          from_city?: string
          to_city?: string
          distance?: number
          sedan_price?: number
          suv_price?: number
          created_at?: string
        }
      }
    }
  }
}