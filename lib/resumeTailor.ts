import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export interface ProfileData {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  summary?: string;
  workExperiences: Array<{
    id: string;
    company: string;
    role: string;
    startDate?: string;
    endDate?: string;
    description?: string;
    achievements?: string;
  }>;
  educations: Array<{
    id: string;
    institution: string;
    degree?: string;
    startDate?: string;
    endDate?: string;
    gpa?: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    category?: string;
    proficiency?: string;
  }>;
}

export interface JobDescription {
  title?: string;
  company?: string;
  rawText: string;
}

export interface TailoredResume {
  summary: string;
  experiences: Array<{
    sourceId: string;
    company: string;
    role: string;
    startDate?: string;
    endDate?: string;
    bullets: string[];
  }>;
  education: Array<{
    sourceId: string;
    institution: string;
    degree?: string;
    startDate?: string;
    endDate?: string;
    gpa?: string;
  }>;
  skills: Array<{
    sourceId: string;
    name: string;
  }>;
}

export async function tailorResume(
  profile: ProfileData,
  jobDescription: JobDescription
): Promise<TailoredResume> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set');
  }

  // Build structured profile data for the prompt
  const profileText = buildProfileText(profile);

  const prompt = `You are a professional resume writer. Your task is to tailor a resume for a specific job description.

CRITICAL RULES:
1. ONLY use information provided in the user's profile. Never invent, assume, or add information not present.
2. For each experience/education/skill, you MUST reference the source ID provided.
3. Reorder experiences to highlight the most relevant ones first.
4. Tailor bullet points to match job requirements using keywords from the job description.
5. Keep all factual information (dates, companies, roles) exactly as provided.
6. Only rephrase descriptions and achievements to better match the job.

USER PROFILE:
${profileText}

JOB DESCRIPTION:
Title: ${jobDescription.title || 'Not specified'}
Company: ${jobDescription.company || 'Not specified'}
${jobDescription.rawText}

Generate a tailored resume in the following JSON format:
{
  "summary": "A 2-3 sentence professional summary tailored to this job",
  "experiences": [
    {
      "sourceId": "ID from profile workExperiences",
      "company": "Exact company name from profile",
      "role": "Exact role from profile",
      "startDate": "Exact date from profile",
      "endDate": "Exact date from profile",
      "bullets": ["Tailored bullet point 1", "Tailored bullet point 2", ...]
    }
  ],
  "education": [
    {
      "sourceId": "ID from profile educations",
      "institution": "Exact institution from profile",
      "degree": "Exact degree from profile",
      "startDate": "Exact date from profile",
      "endDate": "Exact date from profile",
      "gpa": "Exact GPA from profile if provided"
    }
  ],
  "skills": [
    {
      "sourceId": "ID from profile skills",
      "name": "Exact skill name from profile"
    }
  ]
}

IMPORTANT: Only include experiences, education, and skills that are relevant to the job. Order them by relevance.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are a professional resume writer. Always follow instructions precisely and never add information not present in the source data.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    const tailored = JSON.parse(content) as TailoredResume;
    return tailored;
  } catch (error) {
    console.error('Error tailoring resume:', error);
    throw error;
  }
}

function buildProfileText(profile: ProfileData): string {
  let text = `Name: ${profile.name || 'Not provided'}\n`;
  text += `Email: ${profile.email || 'Not provided'}\n`;
  text += `Phone: ${profile.phone || 'Not provided'}\n`;
  text += `Location: ${profile.location || 'Not provided'}\n`;
  text += `Summary: ${profile.summary || 'Not provided'}\n\n`;

  text += 'WORK EXPERIENCE:\n';
  profile.workExperiences.forEach((exp) => {
    text += `[ID: ${exp.id}] ${exp.role} at ${exp.company}\n`;
    text += `  Dates: ${exp.startDate || 'N/A'} - ${exp.endDate || 'Present'}\n`;
    if (exp.description) text += `  Description: ${exp.description}\n`;
    if (exp.achievements) text += `  Achievements: ${exp.achievements}\n`;
    text += '\n';
  });

  text += 'EDUCATION:\n';
  profile.educations.forEach((edu) => {
    text += `[ID: ${edu.id}] ${edu.degree || 'Degree'} from ${edu.institution}\n`;
    text += `  Dates: ${edu.startDate || 'N/A'} - ${edu.endDate || 'N/A'}\n`;
    if (edu.gpa) text += `  GPA: ${edu.gpa}\n`;
    text += '\n';
  });

  text += 'SKILLS:\n';
  profile.skills.forEach((skill) => {
    text += `[ID: ${skill.id}] ${skill.name}`;
    if (skill.category) text += ` (${skill.category})`;
    if (skill.proficiency) text += ` - ${skill.proficiency}`;
    text += '\n';
  });

  return text;
}

