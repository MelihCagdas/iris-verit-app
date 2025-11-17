# Resume Tailoring System

A minimal system that takes a user's master resume (uploaded as PDF/DOC) and a job description, then generates a tailored, optimized resume in PDF format using only verified data from the master resume.

## Features

- **File Upload**: Upload PDF or DOC/DOCX resume files
- **Resume Parsing**: Automatically extract structured data from uploaded resumes
- **Profile Management**: Edit and manage your profile, work experience, education, and skills
- **Job Description Input**: Store and manage job postings
- **AI-Powered Tailoring**: Uses OpenAI to tailor resumes to specific job descriptions
- **Validation**: Ensures generated resumes contain only verified data (no hallucinations)
- **PDF Export**: Generate professional, ATS-friendly PDF resumes

## Tech Stack

- **Frontend**: Next.js 14+ (App Router) + React + Tailwind CSS
- **Backend**: Next.js API routes (TypeScript)
- **Database**: Vercel Postgres with Prisma ORM
- **LLM**: OpenAI API
- **File Parsing**: pdf-parse (PDF), mammoth (DOCX)
- **PDF Generation**: Puppeteer

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env file
DATABASE_URL="your-vercel-postgres-connection-string"
OPENAI_API_KEY="your-openai-api-key-here"
```

4. Set up the database:
```bash
npm run db:generate
npm run db:push
```

**For Vercel Deployment:**
- Add Vercel Postgres database in your Vercel project dashboard
- The `DATABASE_URL` will be automatically provided by Vercel
- Run migrations: `npm run db:migrate` (or use `db:push` for development)

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Upload Resume**: Go to `/profile` and upload your master resume (PDF or DOC/DOCX)
2. **Review/Edit**: Review the parsed data and make any necessary corrections
3. **Add Job**: Go to `/jobs` and paste a job description
4. **Generate**: Go to `/dashboard`, select your profile and a job, then click "Generate Tailored Resume"
5. **Export**: Preview the tailored resume and export as PDF

## Project Structure

```
├── app/
│   ├── api/          # API routes
│   ├── dashboard/    # Main dashboard page
│   ├── jobs/         # Job management page
│   ├── profile/      # Profile management page
│   └── page.tsx      # Home page
├── components/       # React components
├── lib/              # Utility functions and services
├── prisma/           # Database schema
└── uploads/          # Uploaded resume files
```

## Key Rules

1. **Non-hallucination strict**: Generated resumes must only contain data from master resume
2. **Traceability**: Every generated resume links to source profile/experience IDs
3. **Validation**: Automated tests verify no hallucination in generated content
4. **ATS-friendly**: Format must pass ATS parsing

## Testing

Run tests:
```bash
npm test
```

## License

ISC

