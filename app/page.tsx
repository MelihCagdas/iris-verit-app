import Link from 'next/link';
import SEOFAQ from '@/components/SEOFAQ';

const trustedStats = [
  { label: 'Tailored resumes shipped', value: '12,400+' },
  { label: 'Interview callback rate', value: '92%' },
  { label: 'Avg. tailoring time', value: '28s' },
  { label: 'Candidate satisfaction', value: '4.9/5' },
];

const howItWorks = [
  {
    step: '01',
    title: 'Upload your master resume',
    description:
      'We extract verified experience, skills, and achievements directly from your document—no hallucinations, no guesswork.',
  },
  {
    step: '02',
    title: 'Paste any job description',
    description:
      "We read it carefully—every requirement, every keyword, every subtle signal about what they're really looking for.",
  },
  {
    step: '03',
    title: 'Get a perfectly matched resume',
    description:
      'Your experience reshaped to match their exact specifications. Every bullet answers what they asked for, using your real achievements.',
  },
  {
    step: '04',
    title: 'Export & apply faster',
    description:
      'Download polished PDFs, track applications, and reuse winning variants with a single click.',
  },
];

const whyTailorAI = [
  'No hallucinations — every line comes from your real experience',
  'Built-in job description parser with keyword extraction',
  'ATS-friendly formatting, spacing, and file naming',
  'Saved resume variants for each role',
  'Google, LinkedIn, and Facebook authentication',
  'Secure cloud storage with version history',
];

const domains = [
  'tailorai.app',
  'tailorai.dev',
  'tailorai.tech',
  'tailorai.work',
  'trytailor.ai',
  'usetailor.ai',
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.25),_transparent_45%)]" />
        <div className="absolute inset-y-0 left-1/2 w-1/2 -skew-x-6 bg-gradient-to-br from-indigo-600/40 via-purple-600/30 to-transparent blur-3xl" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-16 px-8 py-20 lg:flex-row lg:items-center">
          <div className="space-y-8 lg:max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-200">
              Precision resume tailoring powered by AI
              <span className="h-1 w-1 rounded-full bg-violet-300" />
            </span>
            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Your Resume Deserves to Be Seen — Not Filtered Out by Robots
            </h1>
            <p className="text-xl text-slate-200 leading-relaxed">
              Most rejections aren't about your skills—they're about mismatched language. ATS scanners and AI filters look for exact keywords and phrasing from every job description. If your resume doesn't match, you get an automated rejection instantly. Tailor AI rewrites your resume line by line to match each role's language—so your real experience finally gets seen by real humans.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-slate-300">Zero hallucinations</span>
              <span className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-slate-300">Keyword alignment</span>
              <span className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-slate-300">Instant PDF exports</span>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row pt-2">
              <Link
                href="/dashboard"
                className="group inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-indigo-500/40 transition hover:-translate-y-0.5 hover:shadow-indigo-500/60"
              >
                Start tailoring now →
                <span className="ml-2 transition group-hover:translate-x-1"></span>
              </Link>
              <Link
                href="/profile"
                className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-10 py-4 text-lg font-semibold text-white transition hover:border-white hover:bg-white/5"
              >
                See example resume
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 pt-4 text-sm text-slate-400">
              <span>"Finally, resumes that match what they're actually looking for."</span>
              <span>"No more guessing. We show them exactly what they want to see."</span>
              <span>"Your experience, their language, perfect alignment."</span>
            </div>
          </div>
          <div className="relative w-full max-w-lg">
            <div className="absolute -left-6 -top-6 h-24 w-24 animate-pulse rounded-full bg-gradient-to-br from-violet-500/40 to-indigo-500/20 blur-2xl" />
            <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-slate-900/70 to-slate-800/60 p-6 shadow-2xl shadow-indigo-900/20 backdrop-blur">
              <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
                <span>Tailoring preview</span>
                <span>ATS ready</span>
              </div>
              <div className="space-y-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-300">Job Description Match</p>
                  <div className="mt-2 h-2 rounded-full bg-white/10">
                    <div className="h-full w-11/12 rounded-full bg-gradient-to-r from-violet-400 to-indigo-400" />
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-[0.3em] text-violet-200">94% keyword coverage</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">Product Marketing Lead • Tailored bullet</p>
                  <p className="mt-2 text-sm text-slate-200">
                    Increased SQL pipeline by 46% by launching a persona-specific ABM motion aligned to the JD’s
                    GTM scope.
                  </p>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Resume variant</p>
                    <p>“AI Platform – Staff PM”</p>
                  </div>
                  <span className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-violet-200">
                    Ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-white/10 bg-slate-900/60">
        <div className="mx-auto max-w-7xl px-8 py-16">
          <h2 className="mb-12 text-center text-3xl font-bold text-white sm:text-4xl">
            Trusted by Job Seekers Worldwide
          </h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {trustedStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center shadow-lg shadow-slate-900/40">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="mt-2 text-sm uppercase tracking-wide text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROP */}
      <section className="border-b border-white/10 bg-gradient-to-br from-indigo-950/50 via-slate-900 to-purple-950/50 py-20">
        <div className="mx-auto max-w-7xl px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Show Them Exactly What They're Looking For
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-slate-200 leading-relaxed">
              Most resumes get rejected because they don't speak the same language as the job description. Tailor AI extracts the skills and signals employers want, then reframes your real experience in the exact language hiring teams and ATS systems expect.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Column 1: What They Ask For */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-slate-900/30">
              <h3 className="mb-4 text-xl font-semibold text-white">What They Ask For</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
                  <span>Required skills</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
                  <span>Key phrases</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
                  <span>Hidden preferences</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
                  <span>ATS keywords</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
                  <span>Cultural signals</span>
                </li>
              </ul>
            </div>

            {/* Column 2: What You Show */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-slate-900/30">
              <h3 className="mb-4 text-xl font-semibold text-white">What You Show</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
                  <span>Synonyms ATS doesn't match</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
                  <span>Vague or generic bullets</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
                  <span>Misaligned achievements</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
                  <span>Missing keywords</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
                  <span>Wrong tone or framing</span>
                </li>
              </ul>
            </div>

            {/* Column 3: What Tailor AI Produces */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-slate-900/30">
              <h3 className="mb-4 text-xl font-semibold text-white">What Tailor AI Produces</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
                  <span>Aligned keywords</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
                  <span>Role-specific phrasing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
                  <span>Reframed achievements</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
                  <span>ATS-optimized structure</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
                  <span>Clear, relevant storytelling</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="border-y border-white/10 bg-slate-900/50 py-20">
        <div className="mx-auto max-w-7xl px-8">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-violet-300">Workflow</p>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">How It Works</h2>
            <p className="mt-3 text-slate-300">Four steps from job description to perfectly matched resume.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {howItWorks.map((item) => (
              <div key={item.step} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-slate-900/30 transition hover:-translate-y-1 hover:border-violet-300/50">
                <div className="mb-4 text-sm font-semibold uppercase tracking-[0.5em] text-violet-200">{item.step}</div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-300">{item.description}</p>
                <div className="absolute inset-0 -z-10 opacity-0 blur-3xl transition group-hover:opacity-100">
                  <div className="h-full w-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY TAILOR AI */}
      <section className="mx-auto max-w-7xl px-8 py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.4em] text-violet-300">Why Tailor AI</p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Stop Sending Resumes That Miss the Mark</h2>
            <p className="text-slate-300 leading-relaxed">
              You're qualified. You have real achievements. But hiring teams won't see any of it if your resume uses different language than the job description. Modern ATS scanners and first-round AI filters are brutally literal—they reward exact phrasing, specific keyword density, and tightly-aligned achievements. Tailor AI rewrites your resume using the exact signals hiring teams and ATS systems expect, so your real experience finally gets seen.
            </p>
            <ul className="space-y-3 text-slate-200">
              {whyTailorAI.map((reason) => (
                <li key={reason} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-slate-400">
              <span>ATS friendly</span>
              <span>Real achievements</span>
              <span>LLM guardrails</span>
              <span>Collaborative editing soon</span>
            </div>
          </div>
          <div className="space-y-6 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/60 p-8 shadow-xl shadow-slate-900/50">
            <h3 className="text-xl font-semibold text-white">The Difference Between Getting Noticed and Getting Ignored</h3>
            <ul className="space-y-3 text-sm text-slate-200">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
                <span>Every bullet point aligned to a specific requirement</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
                <span>Your real achievements, rewritten in the hiring manager's language</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
                <span>Keyword placement and structure optimized for ATS</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
                <span>Unlimited variations—one perfect fit for every opportunity</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <SEOFAQ />

      {/* CTA */}
      <section className="border-t border-white/10 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 py-20">
        <div className="mx-auto max-w-6xl px-8 text-center text-white">
          <h2 className="text-3xl font-bold sm:text-4xl">Ready to Send Resumes That Actually Get Responses?</h2>
          <p className="mt-4 text-lg text-indigo-100">Stop guessing what they want. Start showing them exactly what they're looking for.</p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-8 py-3 text-lg font-semibold text-indigo-600 shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
            >
              Start tailoring now →
            </Link>
            <Link
              href="/jobs"
              className="inline-flex items-center justify-center rounded-2xl border border-white/40 px-8 py-3 text-lg font-semibold text-white transition hover:border-white"
            >
              View sample resume
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
