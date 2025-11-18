import '@testing-library/jest-dom'

process.env.NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET ?? 'test-secret'
process.env.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ?? 'google-client'
process.env.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET ?? 'google-secret'
process.env.LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID ?? 'linkedin-client'
process.env.LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET ?? 'linkedin-secret'
process.env.FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID ?? 'facebook-client'
process.env.FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET ?? 'facebook-secret'
process.env.NEXTAUTH_URL = process.env.NEXTAUTH_URL ?? 'http://localhost:3000'
process.env.NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://test.supabase.co'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'test-anon-key'
process.env.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? 'test-service-key'

jest.mock('@auth/prisma-adapter', () => ({
  PrismaAdapter: () => ({}),
}))

jest.mock('next-auth/providers/google', () => ({
  __esModule: true,
  default: (options) => ({ id: 'google', authorization: { url: 'https://accounts.google.com/o/oauth2/v2/auth' }, options }),
}))

jest.mock('next-auth/providers/credentials', () => ({
  __esModule: true,
  default: (config) => ({ id: 'credentials', ...config }),
}))

jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
      verifyOtp: jest.fn(),
    },
  },
  supabaseAdmin: null,
}))

const { TextEncoder, TextDecoder } = require('util')
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

const fetch = require('node-fetch')

// Polyfill for Request/Response in Node.js test environment
if (typeof global.Request === 'undefined') {
  global.Request = fetch.Request
}

if (typeof global.Response === 'undefined') {
  global.Response = fetch.Response
}

