import { NextRequest, NextResponse } from 'next/server';
import { generatePDF } from '@/lib/pdfGenerator';
import { TailoredResume } from '@/lib/resumeTailor';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ResumeTemplate from '@/components/ResumeTemplate';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resume, personalInfo } = body;

    if (!resume || !personalInfo) {
      return NextResponse.json(
        { error: 'Resume and personal info are required' },
        { status: 400 }
      );
    }

    // Render React component to HTML
    const htmlContent = renderToStaticMarkup(
      React.createElement(ResumeTemplate, {
        resume: resume as TailoredResume,
        personalInfo,
      })
    );

    // Wrap in full HTML document
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Times New Roman', Times, serif;
              margin: 0;
              padding: 0;
            }
          </style>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

    // Generate PDF
    const pdfBuffer = await generatePDF(fullHtml);

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="tailored-resume.pdf"',
      },
    });
  } catch (error: any) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', message: error.message },
      { status: 500 }
    );
  }
}

