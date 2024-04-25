import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://fcdxdivntqowzdcldfab.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjZHhkaXZudHFvd3pkY2xkZmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2NjU1MzAsImV4cCI6MjAyNDI0MTUzMH0.g3vnzf-U8YGcsGb8ljYCGegy1F9T5bt2Hupw7DvB9TA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
