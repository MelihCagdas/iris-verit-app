'use client';

import { useState, useEffect } from 'react';
import FileUpload from '@/components/FileUpload';
import ProfileForm from '@/components/ProfileForm';
import Link from 'next/link';

interface UserProfile {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  summary?: string;
  workExperiences?: any[];
  educations?: any[];
  skills?: any[];
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile');
      if (response.ok) {
        const profiles = await response.json();
        if (profiles.length > 0) {
          setProfile(profiles[0]); // Use first profile for now
        }
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = (data: any) => {
    setProfile(data.profile);
    setSuccess('Resume uploaded and parsed successfully!');
    setError(null);
    setTimeout(() => setSuccess(null), 5000);
  };

  const handleUploadError = (err: string) => {
    setError(err);
    setTimeout(() => setError(null), 5000);
  };

  const handleSave = async (profileData: Partial<UserProfile>) => {
    try {
      if (profile?.id) {
        // Update existing profile
        const response = await fetch(`/api/profile/${profile.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profileData),
        });

        if (!response.ok) throw new Error('Failed to update profile');

        const updated = await response.json();
        setProfile(updated);
        setSuccess('Profile updated successfully!');
      } else {
        // Create new profile
        const response = await fetch('/api/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profileData),
        });

        if (!response.ok) throw new Error('Failed to create profile');

        const created = await response.json();
        setProfile(created);
        setSuccess('Profile created successfully!');
      }
      setError(null);
      setTimeout(() => setSuccess(null), 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to save profile');
      setTimeout(() => setError(null), 5000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Manage Profile</h1>
            <p className="text-gray-600">Upload your resume and manage your professional information</p>
          </div>
          <Link
            href="/"
            className="px-6 py-2 bg-white/80 backdrop-blur-sm rounded-lg text-gray-700 hover:bg-white border border-gray-200 transition-all duration-300 font-medium"
          >
            ← Home
          </Link>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg shadow-sm">
            <div className="flex items-center">
              <span className="text-lg mr-2">⚠️</span>
              {error}
            </div>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-lg shadow-sm">
            <div className="flex items-center">
              <span className="text-lg mr-2">✅</span>
              {success}
            </div>
          </div>
        )}

        {!profile && (
          <div className="mb-6">
            <div className="glass-effect rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">Upload Your Resume</h2>
              <p className="text-gray-600 mb-6">Upload your master resume in PDF or DOC/DOCX format</p>
              <FileUpload
                onUploadSuccess={handleUploadSuccess}
                onUploadError={handleUploadError}
              />
            </div>
          </div>
        )}

        {profile && (
          <div>
            <ProfileForm profile={profile} onSave={handleSave} />
          </div>
        )}
      </div>
    </div>
  );
}

