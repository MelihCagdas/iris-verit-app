import '@testing-library/jest-dom'

process.env.NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://test.supabase.co'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'test-anon-key'
process.env.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? 'test-service-key'

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

