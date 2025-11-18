
**Project Goal**
- Build a minimal system that fetches remote job postings, deduplicates, tailors resumes/cover letters, and prepares applications (auto or manual) using only verified user profile/resume data.

**Tech Stack**
- Backend: Node.js (TypeScript), Express or Next.js API routes
- Frontend: Next.js + React, Tailwind
- DB: SQLite (with Prisma ORM)
- Scheduler: node-cron (local instance)
- Tests: Use Jest/Playwright for logic and integration; run at each step

**Phases & Deliverables**

| Phase                   | Deliverables                          | Success Criteria                    |
|-------------------------|--------------------------------------|-------------------------------------|
| Initial Setup & Scaffolding | Repo created, lint/test setup, DB connected | App runs locally, linting/tests pass |
| User Profile & Resume CRUD | CRUD endpoints & UI for profile/resume | User can view/edit/upload profile & resume |
| Job Source Integrations    | At least 1 fetcher (API/RSS/manual) | Jobs appear in DB, deduplication verified |
| Resume/Cover Letter Generator | Service that takes job + user data, generates markdown | Documents contain only verified facts, tests validate no hallucination |
| Application Flow | UI to preview/apply jobs, mark status | User can progress jobs, generated docs link to source data |
| Logging/Monitoring | Logs and status visible on dashboard | Fetch/apply events and errors logged, viewable in UI |

**Cursor Usage & Rules**
- **Always run and review tests** before accepting agent output
- **Make commits after each working step**
- **Enforce traceability**: connect all generated resumes/letters to source items (profile, experience ids)
- **Non-hallucination strict**: Generated docs never mention data not present in the profile or resume.
- Use markdown files, to-do lists, and Cursor's memory/local context to keep requirements and open questions visible and update the plan as details evolve.

**Example "Cursor Rule" Headings**
- Always run tests before committing changes.
- Commit frequently, with descriptive messages.
- Never generate resumes/cover letters with information not present in profile/master resume.
- Log all fetch/apply actions; track application artifacts by job/profile link.
- Keep a living to-do list in the markdown plan and adjust as needed.

***

### 2. **Iterative Workflow (Cursor Style)**

1. **Paste this plan as your README or main instructions in Cursor.**
2. Break the work into simple, verifiable to-dos (setup, DB, profile CRUD, job fetcher, generator, application flow, logging).
3. After each step, review output, run tests, and commit with descriptive messages.
4. Keep feedback, open issues, and quality gates visible for the next step.
5. Whenever context evolves, update your markdown plan and Cursor rules.
6. Let the AI agent prompt for clarification if requirements are unclear—never proceed on hallucinated/fake data.

***