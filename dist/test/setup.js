"use strict";
// Jest setup file for Surakshit AI Agent tests
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
// Mock environment variables for testing
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.DB_NAME = 'surakshit_test';
process.env.LOG_LEVEL = 'error';
// Global test timeout
globals_1.jest.setTimeout(30000);
// Mock external dependencies
globals_1.jest.mock('../utils/logger', () => ({
    default: {
        info: globals_1.jest.fn(),
        error: globals_1.jest.fn(),
        warn: globals_1.jest.fn(),
        debug: globals_1.jest.fn(),
    },
}));
// Clean up after each test
afterEach(() => {
    globals_1.jest.clearAllMocks();
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
            severity: 'HIGH',
            description: 'Hardcoded credentials detected',
        },
        repo: 'test-repo',
        branch: 'main',
        metadata: { scanner: 'test-scanner' },
    }),
    createMockSession: () => ({
        id: 'test-session-001',
        finding_id: 'test-finding-001',
        status: 'CREATED',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        metadata: {},
    }),
};
//# sourceMappingURL=setup.js.map