import { middleware } from '@/middleware';
import { getToken } from 'next-auth/jwt';

jest.mock('next-auth/jwt', () => ({
  getToken: jest.fn(),
}));

const mockGetToken = getToken as jest.MockedFunction<typeof getToken>;

function createRequest(path: string) {
  const url = new URL(`http://localhost${path}`);
  return {
    nextUrl: url,
    url: url.toString(),
  } as any;
}

describe('Auth middleware', () => {
  beforeEach(() => {
    mockGetToken.mockReset();
  });

  it('Unauthenticated user cannot access /generate', async () => {
    mockGetToken.mockResolvedValue(null);
    const response = await middleware(createRequest('/generate'));

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('http://localhost/login?callbackUrl=%2Fgenerate');
  });

  it('Unauthenticated user cannot access /dashboard', async () => {
    mockGetToken.mockResolvedValue(null);
    const response = await middleware(createRequest('/dashboard'));

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('http://localhost/login?callbackUrl=%2Fdashboard');
  });

  it('Allows authenticated users through middleware', async () => {
    mockGetToken.mockResolvedValue({ sub: 'user-123' } as any);
    const response = await middleware(createRequest('/dashboard'));

    expect(response.status).toBe(200);
  });
});

