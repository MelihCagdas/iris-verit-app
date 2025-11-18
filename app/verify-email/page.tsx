'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const token = searchParams.get('token');
    const type = searchParams.get('type');

    if (type === 'email' && token) {
      // Handle email verification
      fetch(`/api/auth/verify-email?token=${token}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setStatus('success');
            setMessage('Your email has been verified! You can now sign in.');
            setTimeout(() => {
              router.push('/login');
            }, 3000);
          } else {
            setStatus('error');
            setMessage(data.error || 'Verification failed. Please try again.');
          }
        })
        .catch(() => {
          setStatus('error');
          setMessage('An error occurred during verification.');
        });
    } else {
      setStatus('error');
      setMessage('Invalid verification link.');
    }
  }, [searchParams, router]);

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg text-center">
        {status === 'verifying' && (
          <div className="space-y-4">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
            <p className="text-gray-600">{message}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">Email Verified!</h1>
            <p className="text-gray-600">{message}</p>
            <Link
              href="/login"
              className="inline-block rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              Go to Sign In
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">Verification Failed</h1>
            <p className="text-gray-600">{message}</p>
            <Link
              href="/login"
              className="inline-block rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              Back to Sign In
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <section className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg text-center">
            <div className="space-y-4">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        </section>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}

