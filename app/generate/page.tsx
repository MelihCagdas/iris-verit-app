import { getServerSession } from '@/lib/auth-server';

export default async function GeneratePage() {
  const session = await getServerSession();

  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-gray-900">Generate Tailored Documents</h1>
      <p className="mt-4 text-gray-600">
        {session?.user?.user_metadata?.name || session?.user?.email
          ? `Welcome back, ${session.user.user_metadata?.name || session.user.email}.`
          : 'Use the uploader to create tailored resumes and cover letters.'}
      </p>
      <div className="mt-8 rounded-lg border border-dashed border-gray-300 p-8 text-gray-500">
        Generation UI coming soon.
      </div>
    </section>
  );
}

