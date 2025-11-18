import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/metadata';

export const metadata: Metadata = genMeta({
  title: 'ATS & Resume Glossary - Complete Guide to Resume Terms',
  description: 'Comprehensive glossary of ATS terms, resume keywords, and job application terminology. Learn the language of modern hiring and optimize your resume.',
  keywords: 'ATS glossary, resume terms, applicant tracking system terms, resume keywords, hiring terminology, ATS vocabulary, resume optimization terms',
});

export default function GlossaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

