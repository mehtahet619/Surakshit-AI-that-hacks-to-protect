# Surakshit AI Agent

Surakshit is a remediation-first penetration testing companion that automatically generates safe, minimal, test-backed fixes as remediation-as-code, packaged as draft pull requests.

## Features

- **Automated Remediation**: Generates 1-3 ranked remediation strategies for security findings
- **Safe-by-Default**: All fixes are least-privilege, reversible, and auditable
- **Test Generation**: Automatically creates unit, integration, and security tests
- **CI/CD Integration**: Seamlessly integrates with existing development workflows
- **Human-in-the-Loop**: Requires explicit approval before any code changes
- **Compliance Mapping**: Maps fixes to OWASP, CIS, PCI, and other frameworks
- **Complete Auditability**: Full session tracking and provenance information

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Run tests**:
   ```bash
   npm test
   ```

## API Endpoints

### Core Operations

- `POST /api/v1/findings` - Submit security finding for remediation
- `GET /api/v1/sessions/{sessionId}` - Get session details
- `POST /api/v1/execute` - Execute approved remediation
- `GET /api/v1/audit/{sessionId}` - Get audit trail

### Management

- `GET /health` - Health check
- `POST /api/v1/rollback` - Rollback changes

## Usage Example

```bash
# Submit a security finding
curl -X POST http://localhost:3000/api/v1/findings \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key" \
  -d '{
    "finding_id": "SEC-001",
    "evidence": {
      "file_path": "/src/auth.js",
      "line_number": 42,
      "code_snippet": "const password = \"hardcoded123\";",
      "vulnerability_type": "hardcoded-credentials",
      "severity": "HIGH",
      "description": "Hardcoded credentials detected"
    },
    "repo": "my-app",
    "branch": "main"
  }'

# Execute approved remediation
curl -X POST http://localhost:3000/api/v1/execute \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key" \
  -d '{
    "command": "EXECUTE:OPEN_PR",
    "session_id": "session-123",
    "approval_token": "approval-token-456"
  }'
```

## Response Format

All responses follow a standardized JSON format:

```json
{
  "session_id": "01HKQR8Z9X...",
  "finding_id": "SEC-001",
  "strategies": [...],
  "patch": {...},
  "rollback": {...},
  "tests": [...],
  "ci_changes": {...},
  "compliance": [...],
  "rationale": "...",
  "logs_ulid": "01HKQR8Z9Y..."
}
```

## Security

- All API endpoints require authentication
- Human approval required for all code changes
- Complete audit trails for all operations
- Rate limiting and input validation
- Secure token management

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

See `.env.example` for all available configuration options.

## License

MIT License[LICENSE](LICENSE) - see LICENSE file for details.
