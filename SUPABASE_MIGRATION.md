# Supabase Migration Guide

This project has been migrated from Prisma to Supabase for all database operations.

## What Changed

- **Database**: All tables now exist in Supabase PostgreSQL database
- **Authentication**: Uses Supabase Auth (already migrated)
- **API Routes**: All routes now use Supabase client instead of Prisma
- **Security**: Row Level Security (RLS) policies enabled on all tables

## Setup Instructions

### Step 1: Run SQL Migrations in Supabase

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **SQL Editor**
4. Run the migrations in order:

#### Migration 1: Create Tables
- Open `supabase/migrations/001_initial_schema.sql`
- Copy the entire contents
- Paste into SQL Editor
- Click **Run**

#### Migration 2: Enable RLS Policies
- Open `supabase/migrations/002_rls_policies.sql`
- Copy the entire contents
- Paste into SQL Editor
- Click **Run**

### Step 2: Verify Tables

1. Go to **Table Editor** in Supabase Dashboard
2. You should see these tables:
   - `user_preferences`
   - `user_profiles`
   - `work_experiences`
   - `educations`
   - `skills`
   - `job_postings`

### Step 3: Environment Variables

Make sure these are set in your `.env` file and Vercel:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Note**: `DATABASE_URL` is no longer needed!

## What Was Removed

- Prisma schema (`prisma/schema.prisma`)
- Prisma client (`lib/prisma.ts`)
- Prisma config (`prisma.config.ts`)
- Prisma dependencies (`@prisma/client`, `prisma`)
- Prisma scripts (`db:generate`, `db:push`, `db:migrate`, `db:studio`)

## Database Schema Changes

### Column Naming
- Changed from camelCase to snake_case (Supabase convention)
  - `userId` → `user_id`
  - `userProfileId` → `user_profile_id`
  - `createdAt` → `created_at`
  - `updatedAt` → `updated_at`
  - `rawText` → `raw_text`
  - `originalFileUrl` → `original_file_url`

### ID Types
- All IDs are now UUIDs (Supabase standard)
- Generated automatically with `gen_random_uuid()`

### Foreign Keys
- All foreign keys reference `auth.users(id)` or related tables
- Cascade deletes enabled for data integrity

## API Changes

All API routes now:
- Use `getSupabaseDb()` instead of `prisma`
- Use snake_case column names
- Handle relations manually (Supabase doesn't auto-join)
- Include authentication checks with `getServerUser()`

## Benefits

1. **Simpler Architecture**: Single source of truth (Supabase)
2. **Built-in Security**: Row Level Security (RLS) policies
3. **Real-time Capabilities**: Can enable real-time subscriptions if needed
4. **Better Mobile Support**: Supabase client works everywhere
5. **No Migrations**: Tables managed directly in Supabase

## Troubleshooting

### Error: "relation does not exist"
- Make sure you ran both SQL migration files
- Check that tables exist in Supabase Table Editor

### Error: "permission denied"
- RLS policies are working correctly
- Make sure user is authenticated
- Check that `user_id` matches authenticated user

### Error: "column does not exist"
- Check column names are snake_case
- Verify table structure matches migration SQL

## Next Steps

1. Test all API endpoints
2. Verify RLS policies work correctly
3. Test authentication flows
4. Deploy to production

