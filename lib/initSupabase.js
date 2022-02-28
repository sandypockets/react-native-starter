import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.REACT_NATIVE_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.REACT_NATIVE_SUPABASE_ANON_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  localStorage: AsyncStorage
})