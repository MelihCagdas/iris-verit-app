'use client';

import { useState } from 'react';

const faqData = [
  {
    question: 'What is an ATS (Applicant Tracking System)?',
    answer: 'An Applicant Tracking System (ATS) is software used by employers to manage and filter job applications. Over 98% of Fortune 500 companies use ATS systems to scan resumes for keywords, qualifications, and relevant experience before they reach human recruiters. Most resumes are rejected by ATS systems in under 7 seconds if they don\'t match the job requirements.',
  },
  {
    question: 'How does Tailor AI optimize resumes for ATS systems?',
    answer: 'Tailor AI analyzes job descriptions to identify key keywords, skills, and requirements. It then automatically rewrites your resume to match these requirements using your real experience. Our AI ensures proper keyword placement, ATS-friendly formatting, and optimal content structure that both ATS systems and human recruiters can easily parse.',
  },
  {
    question: 'Will Tailor AI add false information to my resume?',
    answer: 'No. Tailor AI only uses information from your uploaded resume and real work experience. We never add false qualifications, fake jobs, or fabricated achievements. Our AI reshapes and rephrases your existing experience to match job descriptions, but everything remains 100% factual and verifiable.',
  },
  {
    question: 'How long does it take to tailor a resume?',
    answer: 'With Tailor AI, you can create a perfectly tailored resume in under 30 seconds. Simply upload your master resume, paste the job description, and our AI generates an optimized version instantly. This saves hours compared to manual tailoring, which typically takes 30-60 minutes per application.',
  },
  {
    question: 'What file formats does Tailor AI support?',
    answer: 'Tailor AI accepts resumes in PDF, DOCX, and DOC formats. We recommend uploading a PDF or Word document for best results. Our AI can parse and extract information from most standard resume formats while maintaining ATS-friendly structure.',
  },
  {
    question: 'Can I customize the tailored resume after generation?',
    answer: 'Yes! While Tailor AI generates perfectly optimized resumes automatically, you can always review and edit the content before exporting. We maintain version history, so you can track changes and revert to previous versions if needed.',
  },
  {
    question: 'How many resumes can I create with Tailor AI?',
    answer: 'Our Free plan includes 5 tailored resumes per month, perfect for trying out the service. Our Pro plan offers unlimited resume tailoring, allowing you to apply to as many jobs as you want without restrictions.',
  },
  {
    question: 'Is my resume data secure?',
    answer: 'Absolutely. We use enterprise-grade encryption to protect your data. Your resumes are stored securely in the cloud with versioned audit history. We never share your information with third parties, and you can delete your data at any time.',
  },
  {
    question: 'What makes Tailor AI different from other resume builders?',
    answer: 'Unlike generic resume builders, Tailor AI specializes in job-specific optimization. We don\'t just format your resume—we analyze each job description and rewrite your experience to match exactly what employers are looking for. Our AI understands context, keyword importance, and ATS requirements, ensuring your resume passes automated screening.',
  },
  {
    question: 'Do I need to tailor my resume for every job application?',
    answer: 'Yes, and that\'s exactly why Tailor AI exists. Studies show that tailored resumes receive 3x more callbacks than generic ones. Even for similar roles, job descriptions vary significantly. Tailoring ensures your resume matches each employer\'s specific requirements and passes their ATS filters.',
  },
  {
    question: 'Can Tailor AI help with cover letters?',
    answer: 'Cover letter generation is available in our Pro plan. Our AI can generate personalized cover letters that complement your tailored resume, ensuring consistency across your application materials.',
  },
  {
    question: 'What industries does Tailor AI work best for?',
    answer: 'Tailor AI works for all industries and job levels. Whether you\'re applying for tech roles, marketing positions, healthcare jobs, finance, or any other field, our AI adapts to industry-specific terminology and requirements. We\'ve successfully helped candidates across 50+ industries.',
  },
];

export default function SEOFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const leftColumn = faqData.slice(0, 6);
  const rightColumn = faqData.slice(6, 12);

  return (
    <section id="faq" className="border-y border-white/10 bg-slate-900/50 py-20">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-violet-300">FAQ</p>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-300">
            Everything you need to know about Tailor AI and ATS optimization
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-3">
            {leftColumn.map((faq, index) => (
              <div
                key={index}
                className="rounded-lg border border-white/10 bg-white/5 transition hover:border-violet-300/50"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full items-center justify-between p-4 text-left"
                >
                  <h3 className="text-sm font-semibold text-white pr-6">{faq.question}</h3>
                  <svg
                    className={`h-4 w-4 flex-shrink-0 text-violet-300 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-4 pb-4">
                    <p className="text-xs text-slate-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            {rightColumn.map((faq, index) => {
              const actualIndex = index + 6;
              return (
                <div
                  key={actualIndex}
                  className="rounded-lg border border-white/10 bg-white/5 transition hover:border-violet-300/50"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === actualIndex ? null : actualIndex)}
                    className="flex w-full items-center justify-between p-4 text-left"
                  >
                    <h3 className="text-sm font-semibold text-white pr-6">{faq.question}</h3>
                    <svg
                      className={`h-4 w-4 flex-shrink-0 text-violet-300 transition-transform ${
                        openIndex === actualIndex ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openIndex === actualIndex && (
                    <div className="px-4 pb-4">
                      <p className="text-xs text-slate-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

