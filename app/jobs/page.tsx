'use client';

import { useState, useEffect } from 'react';
import JobInput from '@/components/JobInput';
import Link from 'next/link';

interface JobPosting {
  id: string;
  title?: string;
  company?: string;
  rawText: string;
  createdAt: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (jobData: { title?: string; company?: string; rawText: string }) => {
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) throw new Error('Failed to save job');

      await fetchJobs();
      setShowForm(false);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to save job');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job posting?')) return;

    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete job');

      await fetchJobs();
    } catch (err: any) {
      setError(err.message || 'Failed to delete job');
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
            <h1 className="text-4xl font-bold gradient-text mb-2">Job Descriptions</h1>
            <p className="text-gray-600">Manage job postings you want to apply for</p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/"
              className="px-6 py-2 bg-white/80 backdrop-blur-sm rounded-lg text-gray-700 hover:bg-white border border-gray-200 transition-all duration-300 font-medium"
            >
              ← Home
            </Link>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {showForm ? 'Cancel' : '+ Add Job'}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg shadow-sm">
            <div className="flex items-center">
              <span className="text-lg mr-2">⚠️</span>
              {error}
            </div>
          </div>
        )}

        {showForm && (
          <div className="mb-6">
            <div className="glass-effect rounded-2xl p-5">
              <JobInput onSave={handleSave} onCancel={() => setShowForm(false)} />
            </div>
          </div>
        )}

        <div className="space-y-4">
          {jobs.length === 0 ? (
            <div className="glass-effect rounded-2xl p-12 text-center">
              <div className="text-6xl mb-4">💼</div>
              <p className="text-xl text-gray-600 mb-2">No job postings yet</p>
              <p className="text-gray-500">Add your first job posting to get started!</p>
            </div>
          ) : (
            jobs.map((job) => (
              <div key={job.id} className="glass-effect rounded-xl p-6 card-hover border-2 border-transparent hover:border-blue-200">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {job.title || 'Untitled Position'}
                    </h3>
                    {job.company && (
                      <p className="text-indigo-600 font-medium mb-2">{job.company}</p>
                    )}
                    <p className="text-sm text-gray-500">
                      Added {new Date(job.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
                <div className="mt-4 p-4 bg-gray-50/50 rounded-lg">
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {job.rawText.substring(0, 300)}
                    {job.rawText.length > 300 ? '...' : ''}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

