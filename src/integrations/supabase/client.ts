// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://wgwsjbvlfwasksyojxny.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indnd3NqYnZsZndhc2tzeW9qeG55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxNzQzOTgsImV4cCI6MjA0OTc1MDM5OH0.h2A9lT5RRKBos9HC_9TsTvZ6gZK4FzTYp9f202n7MSQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);