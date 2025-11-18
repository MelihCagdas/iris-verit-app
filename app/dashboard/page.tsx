'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-client';
import type { User } from '@supabase/supabase-js';
import Link from 'next/link';

interface UserProfile {
  id: string;
  name?: string;
  email?: string;
  created_at: string;
  updated_at: string;
}

interface JobPosting {
  id: string;
  title?: string;
  company?: string;
  created_at: string;
}

interface TailoredResume {
  id: string;
  user_profile_id: string;
  job_posting_id: string;
  created_at: string;
  tailored_data: any;
  user_profiles?: UserProfile | UserProfile[];
  job_postings?: JobPosting | JobPosting[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [tailoredResumes, setTailoredResumes] = useState<TailoredResume[]>([]);
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
        .then(async (res) => {
          if (!res.ok) {
            console.error('Preferences API error:', res.status, res.statusText);
            const errorData = await res.json().catch(() => ({}));
            console.error('Error details:', errorData);
            // If unauthorized, redirect to login
            if (res.status === 401) {
              router.push('/login');
              return;
            }
            // For other errors, assume welcome not completed
            router.push('/welcome');
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (!data) return; // Already handled error above
          
          console.log('Preferences check result:', {
            hasPreferences: !!data.preferences,
            completedWelcome: data.preferences?.completed_welcome,
            allData: data
          });
          
          if (!data.preferences || !data.preferences.completed_welcome) {
            console.log('Redirecting to welcome - preferences not completed');
            router.push('/welcome');
          } else {
            console.log('Welcome completed, showing dashboard');
            setCheckingWelcome(false);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error('Failed to check welcome status:', error);
          // On error, redirect to welcome to be safe
          router.push('/welcome');
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
      fetchDashboardData();
    }
  }, [checkingWelcome, loading, user]);

  const fetchDashboardData = async () => {
    try {
      console.log('Fetching dashboard data...');
      
      // Fetch profiles
      const profilesRes = await fetch('/api/profile', {
        credentials: 'include',
      });
      if (!profilesRes.ok) {
        console.error('Failed to fetch profiles:', profilesRes.status, profilesRes.statusText);
      } else {
        const profilesData = await profilesRes.json();
        console.log('Profiles fetched:', profilesData?.length || 0);
        setProfiles(profilesData || []);
      }

      // Fetch jobs
      const jobsRes = await fetch('/api/jobs', {
        credentials: 'include',
      });
      if (!jobsRes.ok) {
        console.error('Failed to fetch jobs:', jobsRes.status, jobsRes.statusText);
      } else {
        const jobsData = await jobsRes.json();
        console.log('Jobs fetched:', jobsData?.length || 0);
        setJobs(jobsData || []);
      }

      // Fetch tailored resumes
      const resumesRes = await fetch('/api/tailored-resumes', {
        credentials: 'include',
      });
      if (!resumesRes.ok) {
        console.error('Failed to fetch tailored resumes:', resumesRes.status, resumesRes.statusText);
        const errorData = await resumesRes.json().catch(() => ({}));
        console.error('Error details:', errorData);
      } else {
        const resumesData = await resumesRes.json();
        console.log('Tailored resumes fetched:', resumesData?.length || 0);
        setTailoredResumes(resumesData || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (checkingWelcome || loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your resumes, job applications, and tailored resumes</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Resumes</dt>
                    <dd className="text-lg font-semibold text-gray-900">{profiles.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Job Applications</dt>
                    <dd className="text-lg font-semibold text-gray-900">{jobs.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Tailored Resumes</dt>
                    <dd className="text-lg font-semibold text-gray-900">{tailoredResumes.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Resume Applications</h2>
            <p className="mt-1 text-sm text-gray-500">All your resumes, job applications, and tailored resumes</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resume
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tailored Resume
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tailoredResumes.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                      <div className="flex flex-col items-center">
                        <svg className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-lg font-medium text-gray-900 mb-2">No tailored resumes yet</p>
                        <p className="text-sm text-gray-500 mb-4">Upload a resume and create a tailored version for a job application</p>
                        <Link
                          href="/"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          Get Started
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  tailoredResumes.map((resume) => {
                    // Handle Supabase relation format (can be object or array)
                    const profileData = Array.isArray(resume.user_profiles) 
                      ? resume.user_profiles[0] 
                      : resume.user_profiles;
                    const jobData = Array.isArray(resume.job_postings)
                      ? resume.job_postings[0]
                      : resume.job_postings;
                    
                    // Fallback to direct lookup if relation data not available
                    const profile = profileData || profiles.find((p) => p.id === resume.user_profile_id);
                    const job = jobData || jobs.find((j) => j.id === resume.job_posting_id);
                    
                    return (
                      <tr key={resume.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {profile?.name || 'Untitled Resume'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {profile?.email || 'No email'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {job?.title || 'Untitled Job'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {job?.company || 'No company'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Generated
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(resume.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link
                            href={`/dashboard/view/${resume.id}`}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => {
                              // TODO: Implement download
                              console.log('Download resume', resume.id);
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Download
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link
            href="/"
            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">Upload Resume</p>
              <p className="text-sm text-gray-500 truncate">Add a new resume</p>
            </div>
          </Link>

          <Link
            href="/jobs"
            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">Add Job</p>
              <p className="text-sm text-gray-500 truncate">Add a job description</p>
            </div>
          </Link>

          <Link
            href="/generate"
            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">Generate Resume</p>
              <p className="text-sm text-gray-500 truncate">Create tailored resume</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
