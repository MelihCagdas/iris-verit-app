import { ProfileData, TailoredResume } from './resumeTailor';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateTailoredResume(
  tailored: TailoredResume,
  profile: ProfileData
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate experiences
  tailored.experiences.forEach((exp) => {
    const sourceExp = profile.workExperiences.find((e) => e.id === exp.sourceId);
    if (!sourceExp) {
      errors.push(`Experience with sourceId ${exp.sourceId} not found in profile`);
      return;
    }

    // Check company name matches
    if (exp.company !== sourceExp.company) {
      errors.push(
        `Company name mismatch: "${exp.company}" vs "${sourceExp.company}"`
      );
    }

    // Check role matches
    if (exp.role !== sourceExp.role) {
      errors.push(`Role mismatch: "${exp.role}" vs "${sourceExp.role}"`);
    }

    // Check dates match
    if (exp.startDate !== sourceExp.startDate) {
      errors.push(
        `Start date mismatch: "${exp.startDate}" vs "${sourceExp.startDate}"`
      );
    }
    if (exp.endDate !== sourceExp.endDate) {
      errors.push(
        `End date mismatch: "${exp.endDate}" vs "${sourceExp.endDate}"`
      );
    }

    // Check if bullets reference information not in source
    // This is a basic check - in production, you'd use more sophisticated NLP
    const sourceText = `${sourceExp.description || ''} ${sourceExp.achievements || ''}`.toLowerCase();
    exp.bullets.forEach((bullet, idx) => {
      // Simple check: if bullet mentions something very specific not in source
      // This is a heuristic and may need refinement
      const bulletLower = bullet.toLowerCase();
      if (bulletLower.length > 50 && !sourceText.includes(bulletLower.substring(0, 20))) {
        warnings.push(
          `Bullet point ${idx + 1} for ${exp.company} may contain information not in source`
        );
      }
    });
  });

  // Validate education
  tailored.education.forEach((edu) => {
    const sourceEdu = profile.educations.find((e) => e.id === edu.sourceId);
    if (!sourceEdu) {
      errors.push(`Education with sourceId ${edu.sourceId} not found in profile`);
      return;
    }

    if (edu.institution !== sourceEdu.institution) {
      errors.push(
        `Institution mismatch: "${edu.institution}" vs "${sourceEdu.institution}"`
      );
    }

    if (edu.degree && sourceEdu.degree && edu.degree !== sourceEdu.degree) {
      errors.push(`Degree mismatch: "${edu.degree}" vs "${sourceEdu.degree}"`);
    }

    if (edu.gpa && sourceEdu.gpa && edu.gpa !== sourceEdu.gpa) {
      errors.push(`GPA mismatch: "${edu.gpa}" vs "${sourceEdu.gpa}"`);
    }
  });

  // Validate skills
  tailored.skills.forEach((skill) => {
    const sourceSkill = profile.skills.find((s) => s.id === skill.sourceId);
    if (!sourceSkill) {
      errors.push(`Skill with sourceId ${skill.sourceId} not found in profile`);
      return;
    }

    if (skill.name !== sourceSkill.name) {
      errors.push(
        `Skill name mismatch: "${skill.name}" vs "${sourceSkill.name}"`
      );
    }
  });

  // Check for any experiences/education/skills in profile not in tailored
  // (This is okay - we may filter by relevance)
  const tailoredExpIds = new Set(tailored.experiences.map((e) => e.sourceId));
  profile.workExperiences.forEach((exp) => {
    if (!tailoredExpIds.has(exp.id)) {
      warnings.push(`Experience "${exp.role} at ${exp.company}" not included in tailored resume`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

