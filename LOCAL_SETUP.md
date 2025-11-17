# 🚀 Local Development Setup

## Quick Fix for "Cannot see anything on localhost"

### Step 1: Set Up Environment Variables

Create or update your `.env` file in the project root:

```bash
# For local development, you can use a local PostgreSQL or a free cloud database
# Option A: Use a free PostgreSQL database (recommended for quick start)
DATABASE_URL="postgresql://user:password@host:5432/database"

# Option B: Use Vercel Postgres connection string (if you already created it)
# DATABASE_URL="postgres://..."

# OpenAI API Key (required)
OPENAI_API_KEY="your-openai-api-key-here"
```

### Step 2: Generate Prisma Client

```bash
npm run db:generate
```

### Step 3: Set Up Database (Choose One)

#### Option A: Use a Free PostgreSQL Database (Easiest)

1. **Neon (Free Tier)** - Recommended:
   - Go to: https://neon.tech
   - Sign up (free)
   - Create a new project
   - Copy the connection string
   - Paste it in `.env` as `DATABASE_URL`

2. **Supabase (Free Tier)**:
   - Go to: https://supabase.com
   - Create a new project
   - Go to Settings → Database
   - Copy the connection string
   - Paste it in `.env` as `DATABASE_URL`

3. **Railway (Free Tier)**:
   - Go to: https://railway.app
   - Create a new project
   - Add PostgreSQL database
   - Copy the connection string
   - Paste it in `.env` as `DATABASE_URL`

#### Option B: Use Local PostgreSQL

If you have PostgreSQL installed locally:

```bash
# Create database
createdb iris_verit_app

# Update .env
DATABASE_URL="postgresql://localhost:5432/iris_verit_app"
```

### Step 4: Run Database Migrations

```bash
# Push schema to database
npm run db:push
```

### Step 5: Start Development Server

```bash
npm run dev
```

### Step 6: Open Browser

Go to: **http://localhost:3000**

---

## Troubleshooting

### Error: "Module not found: Can't resolve '../generated/prisma'"

**Fix:**
```bash
npm run db:generate
```

### Error: "Can't reach database server"

**Fix:**
- Check your `DATABASE_URL` in `.env`
- Make sure the database is running (if local)
- Verify the connection string is correct

### Error: "P1001: Can't reach database server"

**Fix:**
- Your database connection string might be wrong
- Check if the database service is running
- Verify network/firewall settings

### Error: "P1003: Database does not exist"

**Fix:**
- Create the database first
- Or use `npm run db:push` which will create tables

### Port 3000 Already in Use

**Fix:**
```bash
# Find what's using port 3000
lsof -ti:3000

# Kill the process
kill -9 $(lsof -ti:3000)

# Or use a different port
PORT=3001 npm run dev
```

### Still Not Working?

1. **Check if dev server is running:**
   ```bash
   npm run dev
   ```
   You should see: "Ready on http://localhost:3000"

2. **Check browser console** for errors

3. **Check terminal** for build errors

4. **Restart the dev server:**
   ```bash
   # Stop with Ctrl+C, then:
   npm run dev
   ```

---

## Quick Start Checklist

- [ ] `.env` file created with `DATABASE_URL` and `OPENAI_API_KEY`
- [ ] Prisma client generated: `npm run db:generate`
- [ ] Database schema pushed: `npm run db:push`
- [ ] Dev server running: `npm run dev`
- [ ] Browser open at http://localhost:3000

---

## Recommended: Use Neon (Free PostgreSQL)

1. Go to https://neon.tech
2. Sign up (free, no credit card needed)
3. Create project
4. Copy connection string
5. Paste in `.env`:
   ```
   DATABASE_URL="postgresql://..."
   ```
6. Run: `npm run db:push`
7. Run: `npm run dev`

That's it! 🎉

