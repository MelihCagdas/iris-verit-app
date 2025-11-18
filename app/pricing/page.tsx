import Link from 'next/link';
import { CheckIcon } from '@heroicons/react/24/outline';
import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/metadata';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out Tailor AI',
    features: [
      '5 tailored resumes per month',
      'Basic ATS optimization',
      'PDF export',
      'Email support',
      'Standard resume templates',
    ],
    cta: 'Get Started Free',
    ctaLink: '/login',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: 'month',
    description: 'For serious job seekers',
    features: [
      'Unlimited tailored resumes',
      'Advanced ATS optimization',
      'Priority keyword matching',
      'Multiple job tracking',
      'Cover letter generation',
      'Resume version history',
      'Priority email support',
      'Premium templates',
      'Export to multiple formats',
    ],
    cta: 'Start Free Trial',
    ctaLink: '/login',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For teams and agencies',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Bulk resume processing',
      'API access',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantee',
      'Custom branding',
      'Advanced analytics',
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact',
    popular: false,
  },
];

export const metadata: Metadata = genMeta({
  title: 'Pricing - Resume Tailoring Plans',
  description: 'Choose the perfect plan for your job search. Free tier available, Pro plans starting at $19/month. Unlimited resume tailoring and ATS optimization.',
  keywords: 'resume builder pricing, ATS optimization pricing, resume tailoring cost, job application software pricing',
});

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Choose the plan that fits your job search needs. All plans include our core AI
              tailoring technology.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl bg-white p-8 shadow-lg ${
                plan.popular
                  ? 'border-2 border-indigo-600 ring-2 ring-indigo-600'
                  : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-indigo-600 px-4 py-1 text-sm font-medium text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && (
                    <span className="ml-2 text-lg text-gray-600">/{plan.period}</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-600">{plan.description}</p>
              </div>

              <ul className="mb-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckIcon className="h-5 w-5 flex-shrink-0 text-indigo-600" />
                    <span className="ml-3 text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.ctaLink}
                className={`block w-full rounded-lg px-4 py-3 text-center text-sm font-medium transition ${
                  plan.popular
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
          Frequently asked questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Can I change plans later?
            </h3>
            <p className="mt-2 text-gray-600">
              Yes, you can upgrade or downgrade your plan at any time. Changes take effect
              immediately.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              What payment methods do you accept?
            </h3>
            <p className="mt-2 text-gray-600">
              We accept all major credit cards, debit cards, and PayPal. Enterprise plans can be
              invoiced.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Is there a free trial?</h3>
            <p className="mt-2 text-gray-600">
              Yes! The Free plan is available forever. Pro plans include a 14-day free trial with
              full access to all features.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              What happens if I exceed my plan limits?
            </h3>
            <p className="mt-2 text-gray-600">
              We'll notify you when you're approaching your limits. You can upgrade at any time to
              continue using the service.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">Ready to land your dream job?</h2>
          <p className="mt-4 text-lg text-indigo-100">
            Start tailoring your resume today. No credit card required.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block rounded-lg bg-white px-8 py-3 text-base font-medium text-indigo-600 transition hover:bg-indigo-50"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </div>
  );
}

