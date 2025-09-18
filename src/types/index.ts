// Core data models for Surakshit AI Agent

export interface RawFinding {
  finding_id: string;
  evidence: Evidence;
  repo: string;
  branch: string;
  metadata?: Record<string, any>;
}

export interface Evidence {
  file_path: string;
  line_number?: number;
  code_snippet: string;
  vulnerability_type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
}

export interface NormalizedFinding extends RawFinding {
  session_id: string;
  created_at: string;
  normalized_evidence: NormalizedEvidence;
}

export interface NormalizedEvidence extends Evidence {
  sanitized_code_snippet: string;
  context_lines: string[];
  file_hash: string;
}

export interface AnalysisResult {
  vulnerability_category: VulnerabilityCategory;
  risk_assessment: RiskAssessment;
  compliance_mappings: ComplianceMapping[];
  technology_context: TechnologyContext;
}

export interface VulnerabilityCategory {
  owasp_category: string;
  cwe_id: string;
  category_name: string;
  description: string;
}

export interface RiskAssessment {
  cvss_score: number;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  exploitability: number;
  impact: number;
  likelihood: number;
}

export interface ComplianceMapping {
  framework: 'OWASP' | 'CIS' | 'PCI' | 'NIST' | 'ISO27001';
  requirement_id: string;
  requirement_title: string;
  compliance_status: 'COMPLIANT' | 'NON_COMPLIANT' | 'PARTIAL';
}

export interface TechnologyContext {
  language: string;
  framework?: string;
  version?: string;
  dependencies: string[];
  build_system?: string;
}

export interface RemediationStrategy {
  id: string;
  type: 'QUICK_PATCH' | 'FULL_FIX' | 'LONG_TERM_HARDENING';
  priority: number;
  description: string;
  rationale: string;
  estimated_effort: string;
  security_impact: string;
  patch: UnifiedDiff;
  rollback: UnifiedDiff;
  tests: TestSuite[];
  ci_changes?: CIChanges;
}

export interface UnifiedDiff {
  file_path: string;
  original_content: string;
  modified_content: string;
  diff_content: string;
  line_changes: LineChange[];
}

export interface LineChange {
  line_number: number;
  change_type: 'ADD' | 'DELETE' | 'MODIFY';
  original_line?: string;
  new_line?: string;
}

export interface TestSuite {
  name: string;
  type: 'UNIT' | 'INTEGRATION' | 'SMOKE' | 'SECURITY';
  framework: string;
  test_files: TestFile[];
  setup_commands?: string[];
  run_commands: string[];
}

export interface TestFile {
  file_path: string;
  content: string;
  description: string;
}

export interface CIChanges {
  platform: 'GITHUB_ACTIONS' | 'GITLAB_CI' | 'JENKINS' | 'AZURE_DEVOPS';
  config_files: ConfigFile[];
  pipeline_changes: PipelineChange[];
}

export interface ConfigFile {
  file_path: string;
  content: string;
  description: string;
}

export interface PipelineChange {
  stage: string;
  action: 'ADD' | 'MODIFY' | 'DELETE';
  description: string;
  commands?: string[];
}

export interface SurakshitResponse {
  session_id: string;
  finding_id: string;
  strategies: RemediationStrategy[];
  patch: UnifiedDiff;
  rollback: UnifiedDiff;
  tests: TestSuite[];
  ci_changes?: CIChanges;
  compliance: ComplianceMapping[];
  rationale: string;
  logs_ulid: string;
}

export interface Session {
  id: string;
  finding_id: string;
  status: SessionStatus;
  created_at: string;
  updated_at: string;
  expires_at: string;
  metadata: Record<string, any>;
}

export type SessionStatus = 'CREATED' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'EXPIRED';

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings?: ValidationWarning[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationWarning {
  field: string;
  message: string;
  suggestion?: string;
}

export interface ApprovalToken {
  token: string;
  session_id: string;
  expires_at: string;
  permissions: string[];
  issued_by: string;
}

export interface ExecuteRequest {
  command: string; // Must be "EXECUTE:OPEN_PR"
  session_id: string;
  approval_token: string;
  strategy_id?: string;
}

export interface ExecuteResponse {
  success: boolean;
  pr_url?: string;
  message: string;
  session_id: string;
  logs_ulid: string;
}

export interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
    session_id?: string;
    timestamp: string;
  };
}