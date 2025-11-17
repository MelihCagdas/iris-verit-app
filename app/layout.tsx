import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Iris Verit-app | AI-Powered Resume Tailoring",
  description: "Tailor your resume for each job application with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

