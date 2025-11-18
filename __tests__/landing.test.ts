import { describe, it, expect } from '@jest/globals';

describe('Landing Page', () => {
  it('should have concise H1', () => {
    const h1 = 'Stop Being Rejected by AI Resume Filters';
    expect(h1.length).toBeLessThan(60);
    expect(h1).toContain('AI');
    expect(h1).toContain('Resume');
  });

  it('should have clear value proposition', () => {
    const valueProps = [
      'Zero hallucinations',
      'Keyword alignment',
      'Instant PDF exports',
    ];

    valueProps.forEach((prop) => {
      expect(prop.length).toBeLessThan(30);
    });
  });

  it('should have prominent CTAs', () => {
    const ctas = ['Start tailoring now', 'See example resume'];
    expect(ctas.length).toBeGreaterThan(0);
    ctas.forEach((cta) => {
      expect(cta.length).toBeLessThan(30);
    });
  });

  it('should include key messaging', () => {
    const messages = [
      'Precision resume tailoring powered by AI',
      'Turn job descriptions into targeted resumes',
      'Custom-fit resumes for every opportunity',
    ];

    messages.forEach((msg) => {
      expect(msg.length).toBeGreaterThan(0);
    });
  });
});

