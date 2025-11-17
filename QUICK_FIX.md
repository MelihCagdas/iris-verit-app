# ⚡ QUICK FIX: Get Localhost Working Now

## The Problem
Your `.env` file has `DATABASE_URL="file:./dev.db"` (SQLite), but your Prisma schema is now PostgreSQL. This causes errors.

## Solution: Get a Free PostgreSQL Database (2 minutes)

### Option 1: Neon (Recommended - Easiest)

1. **Go to:** https://neon.tech
2. **Sign up** (free, no credit card)
3. **Create a new project:**
   - Name: `iris-verit-app`
   - Region: Choose closest to you
   - Click "Create project"
4. **Copy the connection string:**
   - It will look like: `postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require`
5. **Update your `.env` file:**
   ```bash
   DATABASE_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require"
   OPENAI_API_KEY="your-key-here"
   ```
6. **Run these commands:**
   ```bash
   npm run db:generate
   npm run db:push
   npm run dev
   ```

### Option 2: Supabase (Also Free)

1. **Go to:** https://supabase.com
2. **Sign up** (free)
3. **Create new project**
4. **Go to:** Settings → Database
5. **Copy connection string** (URI format)
6. **Update `.env`** with the connection string
7. **Run:**
   ```bash
   npm run db:generate
   npm run db:push
   npm run dev
   ```

---

## After Setting Up Database

1. **Stop the dev server** (Ctrl+C if running)

2. **Update `.env`** with your PostgreSQL connection string

3. **Generate Prisma client:**
   ```bash
   npm run db:generate
   ```

4. **Push schema to database:**
   ```bash
   npm run db:push
   ```

5. **Start dev server:**
   ```bash
   npm run dev
   ```

6. **Open:** http://localhost:3000

---

## Temporary Workaround (If You Want to Use SQLite Locally)

If you want to use SQLite for local development and PostgreSQL for production:

1. **Change schema back to SQLite temporarily:**
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

2. **Update `.env`:**
   ```
   DATABASE_URL="file:./dev.db"
   ```

3. **Run:**
   ```bash
   npm run db:generate
   npm run db:push
   npm run dev
   ```

**Note:** You'll need to change back to PostgreSQL before deploying to Vercel.

---

## Recommended: Use Neon (Free PostgreSQL)

**Why Neon?**
- ✅ Free tier (no credit card)
- ✅ Fast setup (2 minutes)
- ✅ Works perfectly with Prisma
- ✅ Same as Vercel Postgres (so no issues when deploying)

**Steps:**
1. https://neon.tech → Sign up
2. Create project
3. Copy connection string
4. Paste in `.env`
5. `npm run db:push`
6. `npm run dev`

Done! 🎉

