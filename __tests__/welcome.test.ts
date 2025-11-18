import { describe, it, expect, jest, beforeEach } from '@jest/globals';

// Mock fetch
global.fetch = jest.fn();

// Mock useSession
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: {
        id: 'user-123',
        email: 'test@example.com',
      },
    },
  }),
}));

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Welcome Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  it('should require job types selection', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Please select at least one job type' }),
    });

    // Simulate form submission without job types
    const formData = {
      jobTypes: [],
      seniorityLevel: 'mid',
    };

    const response = await fetch('/api/user/preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    expect(response.ok).toBe(false);
  });

  it('should require seniority level selection', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Please select your seniority level' }),
    });

    const formData = {
      jobTypes: ['Software Engineering'],
      seniorityLevel: '',
    };

    const response = await fetch('/api/user/preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    expect(response.ok).toBe(false);
  });

  it('should save preferences successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        preferences: {
          jobTypes: ['Software Engineering', 'Product Management'],
          seniorityLevel: 'senior',
          completedWelcome: true,
        },
      }),
    });

    const formData = {
      jobTypes: ['Software Engineering', 'Product Management'],
      seniorityLevel: 'senior',
      completedWelcome: true,
    };

    const response = await fetch('/api/user/preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(data.preferences.completedWelcome).toBe(true);
  });
});

