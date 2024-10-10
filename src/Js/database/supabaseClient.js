import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://necahlvgajdgcmbptxks.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lY2FobHZnYWpkZ2NtYnB0eGtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQxMTgyODMsImV4cCI6MjAzOTY5NDI4M30.1Ns9c_jZIRqjOoUygOQpCJGcruqRqmyZGaxy9CGwJm4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);