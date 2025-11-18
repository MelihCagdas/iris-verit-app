import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { generateMetadata as genMeta } from "@/lib/metadata";

export const metadata: Metadata = genMeta({
  title: "Tailor AI — ATS-Optimized Resume Builder | Beat AI Screening Systems",
  description: "Tailor AI rewrites your resume to match each job description's exact keywords and language. Beat ATS filters, bypass AI screening, and get your real experience seen by real humans.",
  keywords: "ATS resume builder, AI resume tailoring, applicant tracking system, resume optimization, ATS-friendly resume, resume keyword optimization, beat ATS filters, resume tailoring software, job application resume, ATS resume checker",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

