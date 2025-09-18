export declare abstract class SurakshitError extends Error {
    abstract readonly code: string;
    abstract readonly statusCode: number;
    readonly timestamp: string;
    readonly details?: Record<string, any>;
    constructor(message: string, details?: Record<string, any>);
    toJSON(): {
        error: {
            code: string;
            message: string;
            details: Record<string, any> | undefined;
            timestamp: string;
        };
    };
}
export declare class ValidationError extends SurakshitError {
    readonly code = "VALIDATION_ERROR";
    readonly statusCode = 400;
    constructor(message: string, field?: string, details?: Record<string, any>);
}
export declare class ProcessingError extends SurakshitError {
    readonly code = "PROCESSING_ERROR";
    readonly statusCode = 500;
    constructor(message: string, stage?: string, details?: Record<string, any>);
}
export declare class SecurityError extends SurakshitError {
    readonly code = "SECURITY_ERROR";
    readonly statusCode = 403;
    constructor(message: string, action?: string, details?: Record<string, any>);
}
export declare class AuthenticationError extends SurakshitError {
    readonly code = "AUTHENTICATION_ERROR";
    readonly statusCode = 401;
    constructor(message?: string, details?: Record<string, any>);
}
export declare class AuthorizationError extends SurakshitError {
    readonly code = "AUTHORIZATION_ERROR";
    readonly statusCode = 403;
    constructor(message?: string, details?: Record<string, any>);
}
export declare class NotFoundError extends SurakshitError {
    readonly code = "NOT_FOUND_ERROR";
    readonly statusCode = 404;
    constructor(resource: string, id?: string);
}
export declare class ConflictError extends SurakshitError {
    readonly code = "CONFLICT_ERROR";
    readonly statusCode = 409;
    constructor(message: string, resource?: string, details?: Record<string, any>);
}
export declare class SystemError extends SurakshitError {
    readonly code = "SYSTEM_ERROR";
    readonly statusCode = 500;
    constructor(message: string, component?: string, details?: Record<string, any>);
}
export declare class RateLimitError extends SurakshitError {
    readonly code = "RATE_LIMIT_ERROR";
    readonly statusCode = 429;
    constructor(message?: string, details?: Record<string, any>);
}
//# sourceMappingURL=index.d.ts.map