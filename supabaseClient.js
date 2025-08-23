import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://mqxmwtrldkcugetwpgtw.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xeG13dHJsZGtjdWdldHdwZ3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4ODk5NzMsImV4cCI6MjA3MTQ2NTk3M30.sxcao5vKHYQIH61Wdi69mr5hVByAk2IjV_hjP0UOZhc"

export const supabase = createClient(supabaseUrl, supabaseKey)