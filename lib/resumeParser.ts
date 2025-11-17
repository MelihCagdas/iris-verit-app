import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { getFileExtension } from './fileStorage';
import { readFile } from 'fs/promises';
import { join } from 'path';

export interface ParsedResume {
  text: string;
  personalInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
  };
  sections: {
    summary?: string;
    experience?: string[];
    education?: string[];
    skills?: string[];
  };
}

export async function parseResumeFile(
  filepath: string,
  filename: string
): Promise<ParsedResume> {
  const ext = getFileExtension(filename);
  const fullPath = join(process.cwd(), filepath.replace('/uploads/', 'uploads/'));

  let text = '';

  if (ext === 'pdf') {
    const dataBuffer = await readFile(fullPath);
    const pdfData = await pdfParse(dataBuffer);
    text = pdfData.text;
  } else if (ext === 'docx' || ext === 'doc') {
    const dataBuffer = await readFile(fullPath);
    const result = await mammoth.extractRawText({ buffer: dataBuffer });
    text = result.value;
  } else {
    throw new Error(`Unsupported file type: ${ext}`);
  }

  return parseResumeText(text);
}

export function parseResumeText(text: string): ParsedResume {
  // Basic parsing - extract structured data from text
  // This is a simplified parser; in production, you'd use more sophisticated NLP
  const lines = text.split('\n').map((line) => line.trim()).filter((line) => line);

  const parsed: ParsedResume = {
    text,
    sections: {},
  };

  // Extract email
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const emails = text.match(emailRegex);
  if (emails && emails.length > 0) {
    parsed.personalInfo = { ...parsed.personalInfo, email: emails[0] };
  }

  // Extract phone
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  const phones = text.match(phoneRegex);
  if (phones && phones.length > 0) {
    parsed.personalInfo = { ...parsed.personalInfo, phone: phones[0] };
  }

  // Try to identify sections
  let currentSection = '';
  const experience: string[] = [];
  const education: string[] = [];
  const skills: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase();

    if (line.match(/^(experience|work experience|employment|professional experience)/i)) {
      currentSection = 'experience';
      continue;
    }
    if (line.match(/^(education|academic|qualifications)/i)) {
      currentSection = 'education';
      continue;
    }
    if (line.match(/^(skills|technical skills|competencies)/i)) {
      currentSection = 'skills';
      continue;
    }
    if (line.match(/^(summary|objective|profile|about)/i)) {
      currentSection = 'summary';
      parsed.sections.summary = lines.slice(i + 1, i + 3).join(' ');
      continue;
    }

    if (currentSection === 'experience' && lines[i].length > 10) {
      experience.push(lines[i]);
    } else if (currentSection === 'education' && lines[i].length > 5) {
      education.push(lines[i]);
    } else if (currentSection === 'skills' && lines[i].length > 2) {
      skills.push(lines[i]);
    }
  }

  if (experience.length > 0) parsed.sections.experience = experience;
  if (education.length > 0) parsed.sections.education = education;
  if (skills.length > 0) parsed.sections.skills = skills;

  return parsed;
}

