'use client';

import { TailoredResume } from '@/lib/resumeTailor';

interface ResumeTemplateProps {
  resume: TailoredResume;
  personalInfo: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
  };
}

export default function ResumeTemplate({ resume, personalInfo }: ResumeTemplateProps) {
  return (
    <div className="resume-container bg-white p-8 max-w-4xl mx-auto" id="resume-content">
      {/* Header */}
      <header className="mb-6 text-center border-b-2 border-gray-300 pb-4">
        <h1 className="text-3xl font-bold mb-2">{personalInfo.name || 'Your Name'}</h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </header>

      {/* Summary */}
      {resume.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2 uppercase border-b border-gray-400 pb-1">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed">{resume.summary}</p>
        </section>
      )}

      {/* Experience */}
      {resume.experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3 uppercase border-b border-gray-400 pb-1">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {resume.experiences.map((exp, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-lg">{exp.role}</h3>
                    <p className="text-gray-700 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-sm text-gray-600 whitespace-nowrap">
                    {exp.startDate && exp.endDate && (
                      <span>
                        {exp.startDate} - {exp.endDate}
                      </span>
                    )}
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                  {exp.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="text-gray-700">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3 uppercase border-b border-gray-400 pb-1">
            Education
          </h2>
          <div className="space-y-3">
            {resume.education.map((edu, idx) => (
              <div key={idx} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">
                      {edu.degree || 'Degree'} - {edu.institution}
                    </h3>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  {edu.startDate && edu.endDate && (
                    <div className="text-sm text-gray-600 whitespace-nowrap">
                      {edu.startDate} - {edu.endDate}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3 uppercase border-b border-gray-400 pb-1">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gray-100 rounded text-sm font-medium"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      <style jsx>{`
        .resume-container {
          font-family: 'Times New Roman', Times, serif;
          line-height: 1.6;
          color: #000;
        }
        @media print {
          .resume-container {
            padding: 0;
            max-width: 100%;
          }
          @page {
            margin: 0.5in;
          }
        }
      `}</style>
    </div>
  );
}

