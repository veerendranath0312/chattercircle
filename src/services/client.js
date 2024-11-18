import { SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uuwrtunvdcvdnevymxsn.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY

const supabase = new SupabaseClient(supabaseUrl, supabaseKey)

export default supabase
