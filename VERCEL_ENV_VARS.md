# 🔧 Vercel Environment Variables Setup

Your build is failing because environment variables are missing in Vercel. Add these to your Vercel project:

## How to Add Environment Variables in Vercel

1. Go to: https://vercel.com/dashboard
2. Click on your project: **iris-verit-app**
3. Go to **Settings** → **Environment Variables**
4. Add each variable below (make sure to select **Production**, **Preview**, and **Development** environments)

---

## Required Environment Variables

### 1. Supabase (handles authentication AND database)
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```
- Get these from: Supabase Dashboard → Settings → API
- Copy from your local `.env` file (don't commit secrets!)
- **Important**: 
  - Enable Google OAuth provider in Supabase Dashboard → Authentication → Providers → Google
  - Add redirect URL in Supabase: `https://iris-verit-app.vercel.app/auth/callback`
  - Add redirect URL in Google Console: `https://edpbwdvkmazrmvfgdrtb.supabase.co/auth/v1/callback`
  - **Run SQL migrations** in Supabase Dashboard → SQL Editor (see `SUPABASE_MIGRATION.md`)

### 2. OpenAI
```
OPENAI_API_KEY=sk-proj-your-openai-api-key
```
- Get from: https://platform.openai.com/api-keys
- Copy from your local `.env` file (don't commit secrets!)

---

## Quick Steps

1. **Copy all variables above**
2. **Go to Vercel Dashboard** → Your Project → Settings → Environment Variables
3. **Add each variable** (click "Add New")
4. **Select all environments** (Production, Preview, Development) for each variable
5. **Save**
6. **Redeploy** (go to Deployments → Click "Redeploy" on latest)

---

## Important Notes

- **Supabase**: 
  - Make sure email auth is enabled in Supabase Dashboard → Authentication → Providers → Email
  - Enable Google OAuth in Supabase Dashboard → Authentication → Providers → Google
  - Add your Google OAuth credentials in Supabase (not in Vercel env vars)
  - Redirect URL in Supabase: `https://iris-verit-app.vercel.app/auth/callback`
  - Redirect URL in Google Console: `https://edpbwdvkmazrmvfgdrtb.supabase.co/auth/v1/callback`

---

After adding these variables, the build should succeed! 🚀

