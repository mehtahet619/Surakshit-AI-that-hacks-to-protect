"use strict";
// Error classes for Surakshit AI Agent
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitError = exports.SystemError = exports.ConflictError = exports.NotFoundError = exports.AuthorizationError = exports.AuthenticationError = exports.SecurityError = exports.ProcessingError = exports.ValidationError = exports.SurakshitError = void 0;
class SurakshitError extends Error {
    constructor(message, details) {
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
exports.SurakshitError = SurakshitError;
class ValidationError extends SurakshitError {
    constructor(message, field, details) {
        super(message, { field, ...details });
        this.code = 'VALIDATION_ERROR';
        this.statusCode = 400;
    }
}
exports.ValidationError = ValidationError;
class ProcessingError extends SurakshitError {
    constructor(message, stage, details) {
        super(message, { stage, ...details });
        this.code = 'PROCESSING_ERROR';
        this.statusCode = 500;
    }
}
exports.ProcessingError = ProcessingError;
class SecurityError extends SurakshitError {
    constructor(message, action, details) {
        super(message, { action, ...details });
        this.code = 'SECURITY_ERROR';
        this.statusCode = 403;
    }
}
exports.SecurityError = SecurityError;
class AuthenticationError extends SurakshitError {
    constructor(message = 'Authentication required', details) {
        super(message, details);
        this.code = 'AUTHENTICATION_ERROR';
        this.statusCode = 401;
    }
}
exports.AuthenticationError = AuthenticationError;
class AuthorizationError extends SurakshitError {
    constructor(message = 'Insufficient permissions', details) {
        super(message, details);
        this.code = 'AUTHORIZATION_ERROR';
        this.statusCode = 403;
    }
}
exports.AuthorizationError = AuthorizationError;
class NotFoundError extends SurakshitError {
    constructor(resource, id) {
        super(`${resource} not found${id ? `: ${id}` : ''}`, { resource, id });
        this.code = 'NOT_FOUND_ERROR';
        this.statusCode = 404;
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends SurakshitError {
    constructor(message, resource, details) {
        super(message, { resource, ...details });
        this.code = 'CONFLICT_ERROR';
        this.statusCode = 409;
    }
}
exports.ConflictError = ConflictError;
class SystemError extends SurakshitError {
    constructor(message, component, details) {
        super(message, { component, ...details });
        this.code = 'SYSTEM_ERROR';
        this.statusCode = 500;
    }
}
exports.SystemError = SystemError;
class RateLimitError extends SurakshitError {
    constructor(message = 'Rate limit exceeded', details) {
        super(message, details);
        this.code = 'RATE_LIMIT_ERROR';
        this.statusCode = 429;
    }
}
exports.RateLimitError = RateLimitError;
//# sourceMappingURL=index.js.map