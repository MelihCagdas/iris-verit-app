'use client';

import React from 'react';
import Link from 'next/link';

const glossaryTerms = [
  {
    term: 'ATS (Applicant Tracking System)',
    definition: 'Software used by employers to manage, filter, and track job applications. ATS systems scan resumes for keywords and qualifications before they reach human recruiters. Over 98% of Fortune 500 companies use ATS systems.',
    category: 'Core Concepts',
  },
  {
    term: 'Keyword Optimization',
    definition: 'The practice of strategically placing relevant keywords from job descriptions throughout your resume to improve ATS matching scores. Keywords should appear naturally in your summary, skills section, and work experience.',
    category: 'Optimization',
  },
  {
    term: 'Resume Tailoring',
    definition: 'The process of customizing your resume for each specific job application by matching keywords, emphasizing relevant experience, and aligning your qualifications with job requirements. Tailored resumes receive 3x more callbacks.',
    category: 'Core Concepts',
  },
  {
    term: 'ATS-Friendly Format',
    definition: 'Resume formatting that can be easily parsed by ATS systems. Characteristics include: standard fonts (Arial, Calibri), simple layouts, standard section headings, no graphics or images, and .docx or .pdf file formats.',
    category: 'Formatting',
  },
  {
    term: 'Keyword Density',
    definition: 'The frequency with which important keywords appear in your resume relative to the total word count. Optimal keyword density is typically 1-2% for primary keywords, ensuring natural readability while maximizing ATS matching.',
    category: 'Optimization',
  },
  {
    term: 'Applicant Tracking System Score',
    definition: 'A numerical rating assigned by ATS systems indicating how well your resume matches a job description. Higher scores increase your chances of passing automated screening and reaching human recruiters.',
    category: 'Core Concepts',
  },
  {
    term: 'Resume Parsing',
    definition: 'The process by which ATS systems extract and structure information from resumes into searchable databases. Poor formatting can cause parsing errors, leading to missing or incorrectly categorized information.',
    category: 'Technical',
  },
  {
    term: 'Skills Section',
    definition: 'A dedicated section of your resume listing relevant technical and soft skills. Should include keywords from the job description and be formatted for easy ATS scanning. Often placed after work experience.',
    category: 'Formatting',
  },
  {
    term: 'Quantifiable Achievements',
    definition: 'Resume bullet points that include specific numbers, percentages, or metrics to demonstrate impact. Examples: "Increased sales by 45%" or "Managed team of 12." Quantified achievements improve both ATS scores and human readability.',
    category: 'Content',
  },
  {
    term: 'Job Description Analysis',
    definition: 'The process of identifying key requirements, keywords, and qualifications from a job posting. Essential for effective resume tailoring and ATS optimization.',
    category: 'Optimization',
  },
  {
    term: 'Resume Variant',
    definition: 'A customized version of your resume tailored for a specific job application. Maintaining multiple variants allows you to quickly apply to similar roles while ensuring each application is optimized.',
    category: 'Core Concepts',
  },
  {
    term: 'Master Resume',
    definition: 'A comprehensive version of your resume containing all your experience, skills, and achievements. Used as the source document for creating tailored resume variants for specific job applications.',
    category: 'Core Concepts',
  },
  {
    term: 'ATS Filter',
    definition: 'Automated screening criteria used by ATS systems to eliminate resumes that don\'t meet minimum requirements. Common filters include: missing keywords, insufficient experience, wrong file format, or poor formatting.',
    category: 'Technical',
  },
  {
    term: 'Resume Scanner',
    definition: 'Technology used by ATS systems to read and extract information from resumes. Scanners can struggle with complex layouts, images, or non-standard fonts, making ATS-friendly formatting essential.',
    category: 'Technical',
  },
  {
    term: 'Keyword Stuffing',
    definition: 'The practice of overusing keywords in a resume, which can actually hurt your ATS score and make your resume unreadable. Keywords should be integrated naturally throughout your content.',
    category: 'Optimization',
  },
  {
    term: 'Relevance Score',
    definition: 'A metric indicating how closely your resume matches a job description. Higher relevance scores improve your chances of passing ATS screening and being reviewed by recruiters.',
    category: 'Core Concepts',
  },
  {
    term: 'Resume Optimization',
    definition: 'The process of improving your resume\'s performance in ATS systems and with human recruiters through keyword matching, formatting improvements, and content refinement.',
    category: 'Optimization',
  },
  {
    term: 'Cover Letter Optimization',
    definition: 'The practice of tailoring cover letters to match job descriptions, similar to resume tailoring. Optimized cover letters complement tailored resumes and improve overall application quality.',
    category: 'Content',
  },
  {
    term: 'ATS Testing',
    definition: 'The process of checking how well your resume performs in ATS systems before submitting applications. Can be done using ATS testing tools or by submitting test applications.',
    category: 'Optimization',
  },
  {
    term: 'Resume Template',
    definition: 'A pre-formatted resume layout designed for ATS compatibility. Good templates use standard fonts, simple layouts, and clear section headings that ATS systems can easily parse.',
    category: 'Formatting',
  },
  {
    term: 'File Format Compatibility',
    definition: 'The ability of ATS systems to read and parse different file formats. .docx and .pdf formats are most compatible, while .pages, .rtf, or image-based formats may cause parsing errors.',
    category: 'Technical',
  },
  {
    term: 'Resume Length',
    definition: 'The optimal length for resumes varies by experience level. Entry-level: 1 page, Mid-level: 1-2 pages, Senior-level: 2-3 pages. ATS systems can handle longer resumes, but human recruiters prefer concise documents.',
    category: 'Formatting',
  },
];

const categories = ['All', 'Core Concepts', 'Optimization', 'Formatting', 'Technical', 'Content'];

// Note: Metadata export for client components needs to be handled differently
// We'll create a separate metadata file or handle it in layout
export default function GlossaryPage() {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredTerms = selectedCategory === 'All' 
    ? glossaryTerms 
    : glossaryTerms.filter(term => term.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <section className="border-b border-white/10 bg-gradient-to-br from-indigo-950/50 via-slate-900 to-purple-950/50 py-20">
        <div className="mx-auto max-w-4xl px-8 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            ATS & Resume Glossary
          </h1>
          <p className="mt-4 text-xl text-slate-300">
            Master the language of modern hiring. Learn essential terms for ATS optimization, resume tailoring, and job applications.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b border-white/10 bg-slate-900/60 py-8">
        <div className="mx-auto max-w-6xl px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white'
                    : 'border border-white/20 bg-white/5 text-slate-300 hover:border-white/40'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Glossary Terms */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {filteredTerms.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-violet-300/50"
              >
                <div className="mb-2">
                  <span className="rounded-full bg-indigo-600/20 px-3 py-1 text-xs font-medium text-indigo-300">
                    {item.category}
                  </span>
                </div>
                <h2 className="mb-3 text-xl font-bold text-white">{item.term}</h2>
                <p className="text-slate-300 leading-relaxed">{item.definition}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 py-20">
        <div className="mx-auto max-w-4xl px-8 text-center text-white">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to Optimize Your Resume?
          </h2>
          <p className="mt-4 text-lg text-indigo-100">
            Use Tailor AI to automatically optimize your resume with the right keywords and formatting.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-8 py-3 text-lg font-semibold text-indigo-600 shadow-lg transition hover:-translate-y-0.5"
            >
              Start Tailoring Now
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-2xl border border-white/40 px-8 py-3 text-lg font-semibold text-white transition hover:border-white"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

