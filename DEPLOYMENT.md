# Vercel Deployment Guide

## Prerequisites

1. Vercel account (sign up at https://vercel.com)
2. GitHub account (to connect your repository)
3. OpenAI API key

## Step-by-Step Deployment

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - Iris Verit-app"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Create Vercel Postgres Database

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project (or create a new one)
3. Go to the **Storage** tab
4. Click **Create Database**
5. Select **Postgres**
6. Choose a name for your database
7. Select a region (recommended: `iad1` - US East)
8. Click **Create**

### 3. Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New Project**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

### 4. Set Environment Variables

In your Vercel project settings, add these environment variables:

1. **DATABASE_URL**
   - Go to your Vercel Postgres database
   - Copy the **Connection String** (it will look like: `postgres://...`)
   - Paste it in Vercel project settings → Environment Variables → `DATABASE_URL`

2. **OPENAI_API_KEY**
   - Get your API key from https://platform.openai.com/api-keys
   - Add it as `OPENAI_API_KEY` in Vercel environment variables

### 5. Run Database Migrations

After deployment, you need to run migrations:

**Option A: Using Vercel CLI (Recommended)**
```bash
npm install -g vercel
vercel login
vercel link
npx prisma migrate deploy
```

**Option B: Using Vercel Dashboard**
1. Go to your project → Settings → Functions
2. Add a build command that includes migration:
   ```
   prisma generate && prisma migrate deploy && next build
   ```

**Option C: Manual Migration (One-time)**
```bash
# Connect to your Vercel Postgres database
# Use the connection string from Vercel dashboard
DATABASE_URL="your-vercel-postgres-url" npx prisma migrate deploy
```

### 6. Important Notes

#### File Uploads
- Local file storage (`/uploads`) won't work on Vercel
- Consider using:
  - **Vercel Blob Storage** (recommended)
  - **AWS S3**
  - **Cloudinary**
  - **Supabase Storage**

#### Puppeteer for PDF Generation
- Puppeteer may not work in serverless functions
- Consider alternatives:
  - `@react-pdf/renderer` (already installed)
  - **PDFShift API**
  - **Browserless.io**

#### Environment Variables
- Make sure to add environment variables for **Production**, **Preview**, and **Development** environments
- Vercel automatically provides `DATABASE_URL` when you connect Vercel Postgres

### 7. Update File Storage (Optional but Recommended)

If you want to use Vercel Blob Storage for file uploads:

```bash
npm install @vercel/blob
```

Then update `lib/fileStorage.ts` to use Vercel Blob instead of local filesystem.

### 8. Verify Deployment

1. Visit your deployed URL (e.g., `https://your-app.vercel.app`)
2. Test the application:
   - Upload a resume
   - Add a job description
   - Generate a tailored resume

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is set correctly in Vercel
- Check that migrations have been run
- Ensure the database is in the same region as your deployment

### Build Failures
- Check build logs in Vercel dashboard
- Ensure `prisma generate` runs during build (already in package.json)
- Verify all environment variables are set

### Runtime Errors
- Check function logs in Vercel dashboard
- Verify OpenAI API key is valid
- Check database connection

## Local Development with Vercel Postgres

For local development, you can:

1. Get the connection string from Vercel dashboard
2. Add it to your local `.env` file:
   ```
   DATABASE_URL="postgres://..."
   OPENAI_API_KEY="your-key"
   ```
3. Run migrations:
   ```bash
   npm run db:push
   ```

## Support

For issues:
- Check Vercel logs: Dashboard → Your Project → Logs
- Check Prisma logs: `npx prisma studio` (local)
- Vercel Docs: https://vercel.com/docs
- Vercel Postgres Docs: https://vercel.com/docs/storage/vercel-postgres

