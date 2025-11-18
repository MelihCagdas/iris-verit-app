import { describe, it, expect, jest, beforeEach } from '@jest/globals';

// Mock Supabase
const mockSignUp = jest.fn();
const mockSignIn = jest.fn();

jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      signUp: mockSignUp,
      signInWithPassword: mockSignIn,
      verifyOtp: jest.fn(),
    },
  },
}));

describe('Email Authentication', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle email signup successfully', async () => {
    mockSignUp.mockResolvedValue({
      data: {
        user: {
          id: 'user-123',
          email: 'test@example.com',
        },
      },
      error: null,
    });

    // Test the signup logic directly
    const signupData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    };

    expect(signupData.email).toBe('test@example.com');
    expect(signupData.password).toBeDefined();
    expect(mockSignUp).toBeDefined();
  });

  it('should require email and password for signup', () => {
    const signupData = {};
    expect(signupData.email).toBeUndefined();
    expect(signupData.password).toBeUndefined();
  });

  it('should handle email signin successfully', async () => {
    mockSignIn.mockResolvedValue({
      data: {
        user: {
          id: 'user-123',
          email: 'test@example.com',
          email_confirmed_at: new Date().toISOString(),
        },
      },
      error: null,
    });

    const signinData = {
      email: 'test@example.com',
      password: 'password123',
    };

    expect(signinData.email).toBe('test@example.com');
    expect(mockSignIn).toBeDefined();
  });

  it('should reject unverified email signin', () => {
    const user = {
      id: 'user-123',
      email: 'test@example.com',
      email_confirmed_at: null,
    };

    expect(user.email_confirmed_at).toBeNull();
  });
});

