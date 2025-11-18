'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-client';
import type { User } from '@supabase/supabase-js';

const jobTypes = [
  'Software Engineering',
  'Product Management',
  'Data Science',
  'Design',
  'Marketing',
  'Sales',
  'Operations',
  'Finance',
  'HR',
  'Other',
];

  export default function WelcomePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [seniorityLevel, setSeniorityLevel] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkingPreferences, setCheckingPreferences] = useState(true);

  // Check if user has already completed welcome
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

      fetch('/api/user/preferences')
        .then((res) => res.json())
        .then((data) => {
          if (data.preferences?.completedWelcome) {
            router.push('/dashboard');
          } else {
            setCheckingPreferences(false);
          }
        })
        .catch(() => {
          setCheckingPreferences(false);
        });
    };

    checkAuth();
  }, [router]);

  if (checkingPreferences || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  const toggleJobType = (type: string) => {
    setSelectedJobTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedJobTypes.length === 0) {
      setError('Please select at least one job type');
      return;
    }

    if (!seniorityLevel) {
      setError('Please select your seniority level');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/user/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTypes: selectedJobTypes,
          seniorityLevel,
          completedWelcome: true,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save preferences');
      }

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Emotional Header */}
        <div className="mb-12 text-center">
          <div className="mb-8 flex flex-col items-center justify-center gap-4">
            <img 
              src="/Screenshot 2025-11-18 at 21.50.35.png" 
              alt="Tailor AI Logo" 
              className="h-24 w-24"
            />
            <div>
              <p className="text-3xl font-bold text-gray-900 leading-tight">
                Tailor <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">AI</span>
              </p>
              <p className="text-base text-gray-500 font-medium mt-1.5">Intelligent Custom Resumes</p>
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
            Welcome to Tailor AI
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            You're here because you're tired of sending resumes into the void. Let's make sure your next application gets noticed.
          </p>
        </div>

        {/* Value Proposition */}
        <div className="mb-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-8 shadow-lg border border-indigo-100">
          <div className="mb-6 space-y-4">
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong className="text-gray-900">Here's the truth:</strong> Every job description tells you exactly what they want. The keywords they'll search for. The skills they'll prioritize. The experience they'll value most. Most people ignore these signals and send generic resumes. We don't.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We read every job description like a blueprint. Then we reshape your real experience to match their exact specifications—using your actual achievements, just presented in the way they need to see them. It's the difference between being filtered out and being invited in.
            </p>
          </div>
        </div>

        {/* Preferences Form */}
        <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">
            Tell us what you're looking for
          </h2>
          <p className="mb-6 text-sm text-gray-600">
            This helps us understand your goals so we can tailor resumes that match the roles you're targeting.
          </p>

          {/* Job Types */}
          <div className="mb-8">
            <label className="mb-3 block text-sm font-medium text-gray-700">
              What types of jobs are you looking for? <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {jobTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleJobType(type)}
                  className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition ${
                    selectedJobTypes.includes(type)
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Seniority Level */}
          <div className="mb-8">
            <label className="mb-3 block text-sm font-medium text-gray-700">
              What's your seniority level? <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {['junior', 'mid', 'senior'].map((level) => (
                <label
                  key={level}
                  className="flex cursor-pointer items-center rounded-lg border-2 border-gray-200 p-4 transition hover:border-indigo-300"
                >
                  <input
                    type="radio"
                    name="seniority"
                    value={level}
                    checked={seniorityLevel === level}
                    onChange={(e) => setSeniorityLevel(e.target.value)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700 capitalize">
                    {level}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Get Started'}
          </button>
        </form>
      </div>
    </div>
  );
    }

