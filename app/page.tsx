import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-3 tracking-tight">
              Iris Verit-app
            </h1>
            <p className="text-sm md:text-base text-blue-100 mb-6 font-medium">
              my first app project Nisha
            </p>
            <p className="text-lg md:text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              AI-Powered Resume Tailoring. Get the perfect resume for every job application in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Started →
              </Link>
              <Link
                href="/profile"
                className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Upload Resume
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Elements & Social Proof Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold gradient-text mb-1">100+</div>
            <div className="text-sm text-gray-600">Resumes Generated</div>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold gradient-text mb-1">95%</div>
            <div className="text-sm text-gray-600">ATS Success Rate</div>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold gradient-text mb-1">30s</div>
            <div className="text-sm text-gray-600">Average Time</div>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold gradient-text mb-1">4.9★</div>
            <div className="text-sm text-gray-600">User Rating</div>
          </div>
        </div>

        {/* Social Proof - Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="glass-effect rounded-xl p-6 card-hover">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                JS
              </div>
              <div>
                <div className="font-semibold text-gray-800">John Smith</div>
                <div className="text-sm text-gray-500">Software Engineer</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm italic">"Got 3 interviews in one week after using Iris Verit-app. The tailored resumes are spot-on!"</p>
            <div className="mt-3 text-yellow-400">★★★★★</div>
          </div>

          <div className="glass-effect rounded-xl p-6 card-hover">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                MJ
              </div>
              <div>
                <div className="font-semibold text-gray-800">Maria Johnson</div>
                <div className="text-sm text-gray-500">Product Manager</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm italic">"Saves me hours of work. Every resume is perfectly tailored and ATS-friendly."</p>
            <div className="mt-3 text-yellow-400">★★★★★</div>
          </div>

          <div className="glass-effect rounded-xl p-6 card-hover">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                DK
              </div>
              <div>
                <div className="font-semibold text-gray-800">David Kim</div>
                <div className="text-sm text-gray-500">Data Scientist</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm italic">"The AI understands job requirements perfectly. Highly recommend!"</p>
            <div className="mt-3 text-yellow-400">★★★★★</div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link
            href="/profile"
            className="group glass-effect rounded-xl p-6 card-hover border-2 border-transparent hover:border-blue-300"
          >
            <div className="text-4xl mb-3">📄</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
              Manage Profile
            </h3>
            <p className="text-gray-600 text-sm">
              Upload and manage your master resume. Edit your experience, education, and skills.
            </p>
          </Link>

          <Link
            href="/jobs"
            className="group glass-effect rounded-xl p-6 card-hover border-2 border-transparent hover:border-indigo-300"
          >
            <div className="text-4xl mb-3">💼</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-indigo-600 transition-colors">
              Job Descriptions
            </h3>
            <p className="text-gray-600 text-sm">
              Add and manage job postings. Keep track of all the positions you're interested in.
            </p>
          </Link>

          <Link
            href="/dashboard"
            className="group glass-effect rounded-xl p-6 card-hover border-2 border-transparent hover:border-purple-300"
          >
            <div className="text-4xl mb-3">✨</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-purple-600 transition-colors">
              Generate Resumes
            </h3>
            <p className="text-gray-600 text-sm">
              Create tailored resumes instantly. Preview and export professional PDFs ready to submit.
            </p>
          </Link>
        </div>
      </div>

      {/* How It Works Section - Moved Below */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 gradient-text">
            How It Works
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Transform your job application process in three simple steps
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="relative">
              <div className="glass-effect rounded-2xl p-6 card-hover h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xl font-bold mb-4 shadow-lg">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Upload Your Resume</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Upload your master resume in PDF or DOC format. Our AI extracts all your experience, skills, and education automatically.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="glass-effect rounded-2xl p-6 card-hover h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold mb-4 shadow-lg">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Add Job Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Paste the job description you're applying for. Our system analyzes requirements and matches them with your experience.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="glass-effect rounded-2xl p-6 card-hover h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-xl font-bold mb-4 shadow-lg">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Get Tailored Resume</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Receive a perfectly tailored, ATS-friendly resume optimized for that specific job. Export as PDF and apply with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-lg text-blue-100 mb-6">
            Start tailoring your resume today and stand out from the competition.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Started Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
