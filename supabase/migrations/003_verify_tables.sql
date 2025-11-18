-- Verification Query: Check if all tables exist
-- Run this after migrations 001 and 002 to verify everything was created correctly

-- Check if tables exist
SELECT 
  table_name,
  table_type
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN (
    'user_preferences',
    'user_profiles',
    'work_experiences',
    'educations',
    'skills',
    'job_postings'
  )
ORDER BY table_name;

-- Check if RLS is enabled
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN (
    'user_preferences',
    'user_profiles',
    'work_experiences',
    'educations',
    'skills',
    'job_postings'
  )
ORDER BY tablename;

-- Check if policies exist
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN (
    'user_preferences',
    'user_profiles',
    'work_experiences',
    'educations',
    'skills',
    'job_postings'
  )
ORDER BY tablename, policyname;
