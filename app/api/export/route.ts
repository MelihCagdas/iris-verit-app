import { NextRequest, NextResponse } from 'next/server';
import { TailoredResume } from '@/lib/resumeTailor';

// Simple HTML-based PDF generation (works in serverless)
function generateResumeHTML(resume: TailoredResume, personalInfo: any): string {
  const { name, email, phone, location } = personalInfo;
  
  let html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: 'Times New Roman', Times, serif;
            margin: 0.5in;
            line-height: 1.6;
            color: #000;
          }
          h1 {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 10px;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
          }
          .header-info {
            text-align: center;
            font-size: 12px;
            color: #666;
            margin-bottom: 20px;
          }
          h2 {
            font-size: 18px;
            font-weight: bold;
            text-transform: uppercase;
            border-bottom: 1px solid #666;
            padding-bottom: 5px;
            margin-top: 20px;
            margin-bottom: 10px;
          }
          .experience-item, .education-item {
            margin-bottom: 15px;
          }
          .job-header {
            display: flex;
            justify-content: space-between;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .company {
            font-weight: normal;
          }
          .dates {
            font-size: 12px;
            color: #666;
          }
          ul {
            margin: 5px 0;
            padding-left: 20px;
          }
          li {
            margin: 3px 0;
          }
          .skills {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          .skill-tag {
            background: #f0f0f0;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <h1>${name || 'Your Name'}</h1>
        <div class="header-info">
          ${email ? `<span>${email}</span>` : ''}
          ${phone ? ` <span>| ${phone}</span>` : ''}
          ${location ? ` <span>| ${location}</span>` : ''}
        </div>
  `;

  if (resume.summary) {
    html += `<p style="margin-bottom: 20px;">${resume.summary}</p>`;
  }

  if (resume.experiences && resume.experiences.length > 0) {
    html += `<h2>Professional Experience</h2>`;
    resume.experiences.forEach((exp) => {
      html += `
        <div class="experience-item">
          <div class="job-header">
            <div>
              <strong>${exp.role}</strong>
              <span class="company"> - ${exp.company}</span>
            </div>
            ${exp.startDate && exp.endDate ? `<span class="dates">${exp.startDate} - ${exp.endDate}</span>` : ''}
          </div>
          <ul>
            ${exp.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
          </ul>
        </div>
      `;
    });
  }

  if (resume.education && resume.education.length > 0) {
    html += `<h2>Education</h2>`;
    resume.education.forEach((edu) => {
      html += `
        <div class="education-item">
          <div class="job-header">
            <div>
              <strong>${edu.degree || 'Degree'}</strong> - ${edu.institution}
            </div>
            ${edu.startDate && edu.endDate ? `<span class="dates">${edu.startDate} - ${edu.endDate}</span>` : ''}
          </div>
          ${edu.gpa ? `<p style="margin: 5px 0; font-size: 12px;">GPA: ${edu.gpa}</p>` : ''}
        </div>
      `;
    });
  }

  if (resume.skills && resume.skills.length > 0) {
    html += `<h2>Skills</h2>`;
    html += `<div class="skills">`;
    resume.skills.forEach((skill) => {
      html += `<span class="skill-tag">${skill.name}</span>`;
    });
    html += `</div>`;
  }

  html += `
      </body>
    </html>
  `;

  return html;
}

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

    // Generate HTML
    const htmlContent = generateResumeHTML(resume as TailoredResume, personalInfo);

    // For now, return HTML (client can convert to PDF)
    // Or use a PDF service in production
    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': 'attachment; filename="tailored-resume.html"',
      },
    });
  } catch (error: any) {
    console.error('Error generating resume:', error);
    return NextResponse.json(
      { error: 'Failed to generate resume', message: error.message },
      { status: 500 }
    );
  }
}

