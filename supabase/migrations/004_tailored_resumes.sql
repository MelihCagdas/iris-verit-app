-- Migration: Create tailored_resumes table
-- Run this in Supabase Dashboard → SQL Editor

-- Tailored Resumes Table
CREATE TABLE IF NOT EXISTS tailored_resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  user_profile_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  job_posting_id UUID REFERENCES job_postings(id) ON DELETE CASCADE NOT NULL,
  tailored_data JSONB NOT NULL, -- Stores the full TailoredResume JSON
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create trigger for updated_at
CREATE TRIGGER update_tailored_resumes_updated_at
  BEFORE UPDATE ON tailored_resumes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_tailored_resumes_user_id ON tailored_resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_tailored_resumes_user_profile_id ON tailored_resumes(user_profile_id);
CREATE INDEX IF NOT EXISTS idx_tailored_resumes_job_posting_id ON tailored_resumes(job_posting_id);
CREATE INDEX IF NOT EXISTS idx_tailored_resumes_created_at ON tailored_resumes(created_at DESC);

-- Enable RLS
ALTER TABLE tailored_resumes ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own tailored resumes"
  ON tailored_resumes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tailored resumes"
  ON tailored_resumes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tailored resumes"
  ON tailored_resumes FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own tailored resumes"
  ON tailored_resumes FOR DELETE
  USING (auth.uid() = user_id);

