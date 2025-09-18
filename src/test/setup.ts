// Jest setup file for Surakshit AI Agent tests

import { jest } from '@jest/globals';

// Mock environment variables for testing
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.DB_NAME = 'surakshit_test';
process.env.LOG_LEVEL = 'error';

// Global test timeout
jest.setTimeout(30000);

// Mock external dependencies
jest.mock('../utils/logger', () => ({
  default: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}));

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});

// Global test utilities
global.testUtils = {
  createMockFinding: () => ({
    finding_id: 'test-finding-001',
    evidence: {
      file_path: '/src/test.js',
      line_number: 42,
      code_snippet: 'const password = "hardcoded";',
      vulnerability_type: 'hardcoded-credentials',
      severity: 'HIGH' as const,
      description: 'Hardcoded credentials detected',
    },
    repo: 'test-repo',
    branch: 'main',
    metadata: { scanner: 'test-scanner' },
  }),
  
  createMockSession: () => ({
    id: 'test-session-001',
    finding_id: 'test-finding-001',
    status: 'CREATED' as const,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    metadata: {},
  }),
};

// Type declarations for global test utilities
declare global {
  var testUtils: {
    createMockFinding: () => any;
    createMockSession: () => any;
  };
}