// Error classes for Surakshit AI Agent

export abstract class SurakshitError extends Error {
  abstract readonly code: string;
  abstract readonly statusCode: number;
  readonly timestamp: string;
  readonly details?: Record<string, any>;

  constructor(message: string, details?: Record<string, any>) {
    super(message);
    this.name = this.constructor.name;
    this.timestamp = new Date().toISOString();
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      error: {
        code: this.code,
        message: this.message,
        details: this.details,
        timestamp: this.timestamp,
      },
    };
  }
}

export class ValidationError extends SurakshitError {
  readonly code = 'VALIDATION_ERROR';
  readonly statusCode = 400;

  constructor(message: string, field?: string, details?: Record<string, any>) {
    super(message, { field, ...details });
  }
}

export class ProcessingError extends SurakshitError {
  readonly code = 'PROCESSING_ERROR';
  readonly statusCode = 500;

  constructor(message: string, stage?: string, details?: Record<string, any>) {
    super(message, { stage, ...details });
  }
}

export class SecurityError extends SurakshitError {
  readonly code = 'SECURITY_ERROR';
  readonly statusCode = 403;

  constructor(message: string, action?: string, details?: Record<string, any>) {
    super(message, { action, ...details });
  }
}

export class AuthenticationError extends SurakshitError {
  readonly code = 'AUTHENTICATION_ERROR';
  readonly statusCode = 401;

  constructor(message: string = 'Authentication required', details?: Record<string, any>) {
    super(message, details);
  }
}

export class AuthorizationError extends SurakshitError {
  readonly code = 'AUTHORIZATION_ERROR';
  readonly statusCode = 403;

  constructor(message: string = 'Insufficient permissions', details?: Record<string, any>) {
    super(message, details);
  }
}

export class NotFoundError extends SurakshitError {
  readonly code = 'NOT_FOUND_ERROR';
  readonly statusCode = 404;

  constructor(resource: string, id?: string) {
    super(`${resource} not found${id ? `: ${id}` : ''}`, { resource, id });
  }
}

export class ConflictError extends SurakshitError {
  readonly code = 'CONFLICT_ERROR';
  readonly statusCode = 409;

  constructor(message: string, resource?: string, details?: Record<string, any>) {
    super(message, { resource, ...details });
  }
}

export class SystemError extends SurakshitError {
  readonly code = 'SYSTEM_ERROR';
  readonly statusCode = 500;

  constructor(message: string, component?: string, details?: Record<string, any>) {
    super(message, { component, ...details });
  }
}

export class RateLimitError extends SurakshitError {
  readonly code = 'RATE_LIMIT_ERROR';
  readonly statusCode = 429;

  constructor(message: string = 'Rate limit exceeded', details?: Record<string, any>) {
    super(message, details);
  }
}