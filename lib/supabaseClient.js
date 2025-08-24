// lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// Werte aus deinen Vercel Environment Variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Supabase-Client erstellen
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
