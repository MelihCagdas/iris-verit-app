import { validateTailoredResume } from '../validation';
import { ProfileData, TailoredResume } from '../resumeTailor';

describe('validateTailoredResume', () => {
  const mockProfile: ProfileData = {
    name: 'John Doe',
    email: 'john@example.com',
    workExperiences: [
      {
        id: 'exp1',
        company: 'Tech Corp',
        role: 'Software Engineer',
        startDate: '2020-01',
        endDate: '2023-12',
        description: 'Developed web applications',
        achievements: 'Led team of 5',
      },
    ],
    educations: [
      {
        id: 'edu1',
        institution: 'State University',
        degree: 'BS Computer Science',
        startDate: '2016-09',
        endDate: '2020-05',
        gpa: '3.8',
      },
    ],
    skills: [
      { id: 'skill1', name: 'JavaScript' },
      { id: 'skill2', name: 'React' },
    ],
  };

  it('should validate a correct tailored resume', () => {
    const tailored: TailoredResume = {
      summary: 'Experienced software engineer',
      experiences: [
        {
          sourceId: 'exp1',
          company: 'Tech Corp',
          role: 'Software Engineer',
          startDate: '2020-01',
          endDate: '2023-12',
          bullets: ['Developed web applications', 'Led team of 5'],
        },
      ],
      education: [
        {
          sourceId: 'edu1',
          institution: 'State University',
          degree: 'BS Computer Science',
          startDate: '2016-09',
          endDate: '2020-05',
          gpa: '3.8',
        },
      ],
      skills: [
        { sourceId: 'skill1', name: 'JavaScript' },
        { sourceId: 'skill2', name: 'React' },
      ],
    };

    const result = validateTailoredResume(tailored, mockProfile);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should detect company name mismatch', () => {
    const tailored: TailoredResume = {
      summary: 'Test',
      experiences: [
        {
          sourceId: 'exp1',
          company: 'Wrong Company',
          role: 'Software Engineer',
          startDate: '2020-01',
          endDate: '2023-12',
          bullets: [],
        },
      ],
      education: [],
      skills: [],
    };

    const result = validateTailoredResume(tailored, mockProfile);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes('Company name mismatch'))).toBe(true);
  });

  it('should detect missing source experience', () => {
    const tailored: TailoredResume = {
      summary: 'Test',
      experiences: [
        {
          sourceId: 'nonexistent',
          company: 'Tech Corp',
          role: 'Software Engineer',
          startDate: '2020-01',
          endDate: '2023-12',
          bullets: [],
        },
      ],
      education: [],
      skills: [],
    };

    const result = validateTailoredResume(tailored, mockProfile);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes('not found in profile'))).toBe(true);
  });

  it('should detect date mismatches', () => {
    const tailored: TailoredResume = {
      summary: 'Test',
      experiences: [
        {
          sourceId: 'exp1',
          company: 'Tech Corp',
          role: 'Software Engineer',
          startDate: '2021-01',
          endDate: '2023-12',
          bullets: [],
        },
      ],
      education: [],
      skills: [],
    };

    const result = validateTailoredResume(tailored, mockProfile);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes('Start date mismatch'))).toBe(true);
  });

  it('should validate education correctly', () => {
    const tailored: TailoredResume = {
      summary: 'Test',
      experiences: [],
      education: [
        {
          sourceId: 'edu1',
          institution: 'State University',
          degree: 'BS Computer Science',
          startDate: '2016-09',
          endDate: '2020-05',
          gpa: '3.8',
        },
      ],
      skills: [],
    };

    const result = validateTailoredResume(tailored, mockProfile);
    expect(result.isValid).toBe(true);
  });

  it('should detect education institution mismatch', () => {
    const tailored: TailoredResume = {
      summary: 'Test',
      experiences: [],
      education: [
        {
          sourceId: 'edu1',
          institution: 'Wrong University',
          degree: 'BS Computer Science',
          startDate: '2016-09',
          endDate: '2020-05',
        },
      ],
      skills: [],
    };

    const result = validateTailoredResume(tailored, mockProfile);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes('Institution mismatch'))).toBe(true);
  });

  it('should validate skills correctly', () => {
    const tailored: TailoredResume = {
      summary: 'Test',
      experiences: [],
      education: [],
      skills: [
        { sourceId: 'skill1', name: 'JavaScript' },
        { sourceId: 'skill2', name: 'React' },
      ],
    };

    const result = validateTailoredResume(tailored, mockProfile);
    expect(result.isValid).toBe(true);
  });

  it('should detect skill name mismatch', () => {
    const tailored: TailoredResume = {
      summary: 'Test',
      experiences: [],
      education: [],
      skills: [{ sourceId: 'skill1', name: 'TypeScript' }],
    };

    const result = validateTailoredResume(tailored, mockProfile);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes('Skill name mismatch'))).toBe(true);
  });
});

