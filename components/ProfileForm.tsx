'use client';

import { useState, useEffect } from 'react';

interface WorkExperience {
  id?: string;
  company: string;
  role: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  achievements?: string;
}

interface Education {
  id?: string;
  institution: string;
  degree?: string;
  startDate?: string;
  endDate?: string;
  gpa?: string;
}

interface Skill {
  id?: string;
  name: string;
  category?: string;
  proficiency?: string;
}

interface UserProfile {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  summary?: string;
  workExperiences?: WorkExperience[];
  educations?: Education[];
  skills?: Skill[];
}

interface ProfileFormProps {
  profile?: UserProfile;
  onSave: (profile: Partial<UserProfile>) => void;
}

export default function ProfileForm({ profile, onSave }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    location: profile?.location || '',
    summary: profile?.summary || '',
  });

  const [experiences, setExperiences] = useState<WorkExperience[]>(
    profile?.workExperiences || []
  );
  const [educations, setEducations] = useState<Education[]>(
    profile?.educations || []
  );
  const [skills, setSkills] = useState<Skill[]>(profile?.skills || []);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        location: profile.location || '',
        summary: profile.summary || '',
      });
      setExperiences(profile.workExperiences || []);
      setEducations(profile.educations || []);
      setSkills(profile.skills || []);
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      workExperiences: experiences,
      educations,
      skills,
    });
  };

  const addExperience = () => {
    setExperiences([...experiences, { company: '', role: '' }]);
  };

  const updateExperience = (index: number, field: keyof WorkExperience, value: string) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    setExperiences(updated);
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const addEducation = () => {
    setEducations([...educations, { institution: '' }]);
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = [...educations];
    updated[index] = { ...updated[index], [field]: value };
    setEducations(updated);
  };

  const removeEducation = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  const addSkill = () => {
    setSkills([...skills, { name: '' }]);
  };

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], [field]: value };
    setSkills(updated);
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="glass-effect p-5 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Summary
          </label>
          <textarea
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="glass-effect p-5 rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Work Experience</h2>
          <button
            type="button"
            onClick={addExperience}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Experience
          </button>
        </div>
        {experiences.map((exp, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => updateExperience(index, 'company', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Role"
                value={exp.role}
                onChange={(e) => updateExperience(index, 'role', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Start Date (e.g., Jan 2020)"
                value={exp.startDate || ''}
                onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="End Date (e.g., Dec 2023 or Present)"
                value={exp.endDate || ''}
                onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <textarea
              placeholder="Description"
              value={exp.description || ''}
              onChange={(e) => updateExperience(index, 'description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
            />
            <textarea
              placeholder="Achievements (optional)"
              value={exp.achievements || ''}
              onChange={(e) => updateExperience(index, 'achievements', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
            />
            <button
              type="button"
              onClick={() => removeExperience(index)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="glass-effect p-5 rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Education</h2>
          <button
            type="button"
            onClick={addEducation}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Education
          </button>
        </div>
        {educations.map((edu, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <input
                type="text"
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree || ''}
                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Start Date"
                value={edu.startDate || ''}
                onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="End Date"
                value={edu.endDate || ''}
                onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="GPA (optional)"
                value={edu.gpa || ''}
                onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="button"
              onClick={() => removeEducation(index)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="glass-effect p-5 rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Skills</h2>
          <button
            type="button"
            onClick={addSkill}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Skill
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Skill name"
                value={skill.name}
                onChange={(e) => updateSkill(index, 'name', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 font-medium"
      >
        Save Profile
      </button>
    </form>
  );
}

