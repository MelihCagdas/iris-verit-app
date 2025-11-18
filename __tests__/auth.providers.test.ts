import { authConfig } from '@/lib/auth.config';

describe('Auth providers', () => {
  it('Google login URL is generated', () => {
    const google = authConfig.providers.find((provider) => provider.id === 'google');
    expect(google).toBeDefined();
    expect(google?.authorization?.url).toContain('google');
  });
});

