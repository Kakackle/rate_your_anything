import { createClient } from '@supabase/supabase-js'

const project_url = "https://zevkdwdzjjsvdjyvnrta.supabase.co"
const api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpldmtkd2R6ampzdmRqeXZucnRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg0MDM4MzMsImV4cCI6MjAxMzk3OTgzM30._PvxYL1qlPqRNkvK-nNTeQYy-AndOFyiaZxdE_VcFYE"

// Create a single supabase client for interacting with your database
export const supabase = createClient(project_url, api_key)