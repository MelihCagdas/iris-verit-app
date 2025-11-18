# 🔧 Vercel Environment Variables Setup

Your build is failing because environment variables are missing in Vercel. Add these to your Vercel project:

## How to Add Environment Variables in Vercel

1. Go to: https://vercel.com/dashboard
2. Click on your project: **iris-verit-app**
3. Go to **Settings** → **Environment Variables**
4. Add each variable below (make sure to select **Production**, **Preview**, and **Development** environments)

---

## Required Environment Variables

### 1. Database
```
DATABASE_URL=postgres://...
```
- Get this from Vercel Dashboard → Your Project → Storage → Postgres → Connection String

### 2. NextAuth Authentication
```
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=https://iris-verit-app.vercel.app
```
- Generate a secret: Run `openssl rand -base64 32` in terminal
- Copy the value from your local `.env` file (don't commit secrets!)
- For `NEXTAUTH_URL`: Use your production URL: `https://iris-verit-app.vercel.app`

### 3. Google OAuth
```
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```
- Get these from: https://console.cloud.google.com/apis/credentials
- Make sure redirect URI includes: `https://iris-verit-app.vercel.app/api/auth/callback/google`

### 4. Supabase (for email/password auth)
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```
- Get these from: Supabase Dashboard → Settings → API
- Copy from your local `.env` file (don't commit secrets!)

### 5. OpenAI
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

- **NEXTAUTH_URL**: Must match your production domain exactly
- **NEXTAUTH_SECRET**: Must be the same across all environments
- **Google OAuth**: Make sure redirect URIs in Google Console include:
  - `https://iris-verit-app.vercel.app/api/auth/callback/google`
- **Supabase**: Make sure email auth is enabled in Supabase dashboard

---

After adding these variables, the build should succeed! 🚀

