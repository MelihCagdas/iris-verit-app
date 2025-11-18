import Link from 'next/link';
import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/metadata';

export const metadata: Metadata = genMeta({
  title: 'Blog - Resume Tips, ATS Optimization & Job Search Advice',
  description: 'Learn how to beat AI resume filters, optimize for ATS systems, and land more interviews with our expert guides.',
  keywords: 'ATS optimization blog, resume tips, job search advice, beat AI filters, resume tailoring guide',
});

const blogPosts = [
  {
    slug: 'how-ai-resume-filters-work-and-how-to-beat-them',
    title: 'How AI Resume Filters Work and How to Beat Them',
    excerpt:
      'Most companies use AI systems that scan your resume in seconds. Learn how these systems work and the proven strategies to get past them.',
    date: '2025-01-15',
    readTime: '8 min read',
    category: 'ATS Optimization',
  },
  {
    slug: 'ats-optimization-complete-guide-2025',
    title: 'ATS Optimization: The Complete Guide for 2025',
    excerpt:
      'Everything you need to know about Applicant Tracking Systems, keyword optimization, and formatting your resume to pass automated screening.',
    date: '2025-01-10',
    readTime: '12 min read',
    category: 'Resume Tips',
  },
  {
    slug: 'why-generic-resumes-get-rejected-in-seconds',
    title: 'Why Generic Resumes Get Rejected in Seconds',
    excerpt:
      'Understanding why one-size-fits-all resumes fail and how tailoring your resume to each job description dramatically increases your callback rate.',
    date: '2025-01-05',
    readTime: '6 min read',
    category: 'Job Search',
  },
  {
    slug: 'resume-tailoring-secret-to-landing-interviews',
    title: 'Resume Tailoring: The Secret to Landing Interviews',
    excerpt:
      'Discover the proven method of customizing your resume for each application and why it can increase your interview rate by 300%.',
    date: '2024-12-28',
    readTime: '10 min read',
    category: 'Resume Tips',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Beat AI Resume Filters
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Expert guides on ATS optimization, resume tailoring, and landing more interviews
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl bg-white p-8 shadow-lg transition hover:shadow-xl"
            >
              <div className="mb-4">
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                  {post.category}
                </span>
              </div>
              <Link href={`/blog/${post.slug}`}>
                <h2 className="mb-3 text-2xl font-bold text-gray-900 hover:text-indigo-600">
                  {post.title}
                </h2>
              </Link>
              <p className="mb-4 text-gray-600">{post.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

