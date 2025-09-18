export interface Config {
    server: {
        port: number;
        host: string;
        environment: string;
    };
    database: {
        host: string;
        port: number;
        name: string;
        username: string;
        password: string;
        ssl: boolean;
    };
    redis: {
        host: string;
        port: number;
        password?: string;
    };
    security: {
        jwtSecret: string;
        jwtExpiresIn: string;
        apiKeyHeader: string;
        bcryptRounds: number;
    };
    session: {
        defaultExpirationHours: number;
        maxConcurrentSessions: number;
    };
    rateLimit: {
        windowMs: number;
        maxRequests: number;
    };
    logging: {
        level: string;
        format: string;
    };
}
declare const config: Config;
export default config;
//# sourceMappingURL=index.d.ts.map