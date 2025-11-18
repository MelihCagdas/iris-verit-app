'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-client';
import type { User } from '@supabase/supabase-js';
import Link from 'next/link';
import ResumeTemplate from '@/components/ResumeTemplate';
import { TailoredResume } from '@/lib/resumeTailor';

interface UserProfile {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  summary?: string;
}

interface JobPosting {
  id: string;
  title?: string;
  company?: string;
  rawText: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState<string>('');
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [tailoredResume, setTailoredResume] = useState<TailoredResume | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validation, setValidation] = useState<any>(null);
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [checkingWelcome, setCheckingWelcome] = useState(true);

  // Check authentication and welcome screen
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        router.push('/login');
        return;
      }

      setUser(session.user);

      // Check if user needs to complete welcome screen
      fetch('/api/user/preferences', {
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.preferences?.completedWelcome) {
            router.push('/welcome');
          } else {
            setCheckingWelcome(false);
            setLoading(false);
          }
        })
        .catch(() => {
          console.error('Failed to check welcome status');
          setCheckingWelcome(false);
          setLoading(false);
        });
    };

    checkAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  // Fetch data once welcome check is complete
  useEffect(() => {
    if (!checkingWelcome && !loading && user) {
      fetchProfiles();
      fetchJobs();
    }
  }, [checkingWelcome, loading, user]);

  const fetchProfiles = async () => {
    try {
      const response = await fetch('/api/profile');
      if (response.ok) {
        const data = await response.json();
        setProfiles(data);
        if (data.length > 0 && !selectedProfileId) {
          setSelectedProfileId(data[0].id);
          setSelectedProfile(data[0]);
        }
      }
    } catch (err) {
      console.error('Error fetching profiles:', err);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
        if (data.length > 0 && !selectedJobId) {
          setSelectedJobId(data[0].id);
        }
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  const handleProfileChange = (profileId: string) => {
    setSelectedProfileId(profileId);
    const profile = profiles.find((p) => p.id === profileId);
    setSelectedProfile(profile || null);
    setTailoredResume(null);
  };

  const handleGenerate = async () => {
    if (!selectedProfileId || !selectedJobId) {
      setError('Please select both a profile and a job');
      return;
    }

    setLoading(true);
    setError(null);
    setTailoredResume(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileId: selectedProfileId,
          jobId: selectedJobId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate resume');
      }

      const data = await response.json();
      setTailoredResume(data.tailored);
      setValidation(data.validation);

      if (!data.validation.isValid) {
        setError('Generated resume failed validation. Please review the errors.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to generate tailored resume');
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = async () => {
    if (!tailoredResume || !selectedProfile) {
      setError('No resume to export');
      return;
    }

    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume: tailoredResume,
          personalInfo: {
            name: selectedProfile.name,
            email: selectedProfile.email,
            phone: selectedProfile.phone,
            location: selectedProfile.location,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate resume');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'tailored-resume.html';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      // Also open in new window for printing
      window.open(url, '_blank');
    } catch (err: any) {
      setError(err.message || 'Failed to export resume');
    }
  };

  if (checkingWelcome || loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Resume Tailoring Dashboard</h1>
            <p className="text-gray-600">Generate AI-powered tailored resumes for your job applications</p>
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

        {validation && validation.warnings.length > 0 && (
          <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 rounded-lg shadow-sm">
            <p className="font-semibold mb-2">Validation Warnings:</p>
            <ul className="list-disc list-inside space-y-1">
              {validation.warnings.map((warning: string, idx: number) => (
                <li key={idx} className="text-sm">{warning}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1 space-y-4">
            <div className="glass-effect rounded-2xl p-5">
              <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                <span className="text-2xl mr-2">👤</span>
                Select Profile
              </h2>
              {profiles.length === 0 ? (
                <div className="text-gray-500 text-sm mb-4 p-4 bg-gray-50/50 rounded-lg">
                  No profiles found. <Link href="/profile" className="text-blue-600 hover:underline font-medium">Create one</Link>
                </div>
              ) : (
                <select
                  value={selectedProfileId}
                  onChange={(e) => handleProfileChange(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 font-medium"
                >
                  {profiles.map((profile) => (
                    <option key={profile.id} value={profile.id}>
                      {profile.name || profile.email || 'Unnamed Profile'}
                    </option>
                  ))}
                </select>
              )}
              <Link
                href="/profile"
                className="mt-3 block text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Manage Profiles →
              </Link>
            </div>

            <div className="glass-effect rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                <span className="text-2xl mr-2">💼</span>
                Select Job
              </h2>
              {jobs.length === 0 ? (
                <div className="text-gray-500 text-sm mb-4 p-4 bg-gray-50/50 rounded-lg">
                  No jobs found. <Link href="/jobs" className="text-blue-600 hover:underline font-medium">Add one</Link>
                </div>
              ) : (
                <select
                  value={selectedJobId}
                  onChange={(e) => setSelectedJobId(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 font-medium"
                >
                  {jobs.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title || 'Untitled'} {job.company && `- ${job.company}`}
                    </option>
                  ))}
                </select>
              )}
              <Link
                href="/jobs"
                className="mt-3 block text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Manage Jobs →
              </Link>
            </div>

            <div className="glass-effect rounded-2xl p-6">
              <button
                onClick={handleGenerate}
                disabled={loading || !selectedProfileId || !selectedJobId}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                    Generating...
                  </span>
                ) : (
                  '✨ Generate Tailored Resume'
                )}
              </button>

              {tailoredResume && (
                <button
                  onClick={handleExportPDF}
                  className="w-full mt-4 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  📥 Export Resume (HTML/Print)
                </button>
              )}
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-2">
            <div className="glass-effect rounded-2xl p-6 min-h-[500px]">
              {tailoredResume && selectedProfile ? (
                <ResumeTemplate
                  resume={tailoredResume}
                  personalInfo={{
                    name: selectedProfile.name,
                    email: selectedProfile.email,
                    phone: selectedProfile.phone,
                    location: selectedProfile.location,
                  }}
                />
              ) : (
                <div className="text-center text-gray-500 py-20">
                  <div className="text-6xl mb-4">📄</div>
                  <p className="text-xl font-semibold mb-2 text-gray-700">No resume generated yet</p>
                  <p className="text-gray-500">
                    Select a profile and job, then click "Generate Tailored Resume"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

