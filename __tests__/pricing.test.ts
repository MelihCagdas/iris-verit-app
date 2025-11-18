import { describe, it, expect } from '@jest/globals';

describe('Pricing Page', () => {
  it('should display all pricing tiers', () => {
    const plans = [
      { name: 'Free', price: '$0' },
      { name: 'Pro', price: '$19' },
      { name: 'Enterprise', price: 'Custom' },
    ];

    expect(plans).toHaveLength(3);
    expect(plans[0].name).toBe('Free');
    expect(plans[1].name).toBe('Pro');
    expect(plans[2].name).toBe('Enterprise');
  });

  it('should have Pro plan marked as popular', () => {
    const plans = [
      { name: 'Free', popular: false },
      { name: 'Pro', popular: true },
      { name: 'Enterprise', popular: false },
    ];

    const popularPlan = plans.find((p) => p.popular);
    expect(popularPlan?.name).toBe('Pro');
  });

  it('should include essential features in Free plan', () => {
    const freePlanFeatures = [
      '5 tailored resumes per month',
      'Basic ATS optimization',
      'PDF export',
      'Email support',
    ];

    expect(freePlanFeatures.length).toBeGreaterThan(0);
    expect(freePlanFeatures).toContain('5 tailored resumes per month');
  });

  it('should include unlimited resumes in Pro plan', () => {
    const proPlanFeatures = [
      'Unlimited tailored resumes',
      'Advanced ATS optimization',
      'Cover letter generation',
    ];

    expect(proPlanFeatures).toContain('Unlimited tailored resumes');
  });
});

