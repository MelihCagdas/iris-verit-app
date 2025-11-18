-- Migration: Row Level Security Policies
-- Run this in Supabase Dashboard → SQL Editor after 001_initial_schema.sql

-- Enable RLS on all tables
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE educations ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;

-- User Preferences Policies
CREATE POLICY "Users can view own preferences"
  ON user_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON user_preferences FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own preferences"
  ON user_preferences FOR DELETE
  USING (auth.uid() = user_id);

-- User Profiles Policies
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own profile"
  ON user_profiles FOR DELETE
  USING (auth.uid() = user_id);

-- Work Experiences Policies
CREATE POLICY "Users can view own work experiences"
  ON work_experiences FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = work_experiences.user_profile_id
      AND user_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own work experiences"
  ON work_experiences FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = work_experiences.user_profile_id
      AND user_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own work experiences"
  ON work_experiences FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = work_experiences.user_profile_id
      AND user_profiles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = work_experiences.user_profile_id
      AND user_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own work experiences"
  ON work_experiences FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = work_experiences.user_profile_id
      AND user_profiles.user_id = auth.uid()
    )
  );

-- Education Policies
CREATE POLICY "Users can view own educations"
  ON educations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = educations.user_profile_id
      AND user_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own educations"
  ON educations FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = educations.user_profile_id
      AND user_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own educations"
  ON educations FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = educations.user_profile_id
      AND user_profiles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = educations.user_profile_id
      AND user_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own educations"
  ON educations FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = educations.user_profile_id
      AND user_profiles.user_id = auth.uid()
    )
  );

-- Skills Policies
CREATE POLICY "Users can view own skills"
  ON skills FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = skills.user_profile_id
      AND user_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own skills"
  ON skills FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = skills.user_profile_id
      AND user_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own skills"
  ON skills FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = skills.user_profile_id
      AND user_profiles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = skills.user_profile_id
      AND user_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own skills"
  ON skills FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = skills.user_profile_id
      AND user_profiles.user_id = auth.uid()
    )
  );

-- Job Postings Policies
CREATE POLICY "Users can view own job postings"
  ON job_postings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own job postings"
  ON job_postings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own job postings"
  ON job_postings FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own job postings"
  ON job_postings FOR DELETE
  USING (auth.uid() = user_id);

