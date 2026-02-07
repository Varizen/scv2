export declare const config: {
    env: string;
    port: number;
    database: {
        host: string;
        port: number;
        name: string;
        user: string;
        password: string;
        ssl: boolean;
        maxConnections: number;
    };
    redis: {
        host: string;
        port: number;
        password: string;
        db: number;
    };
    jwt: {
        secret: string;
        refreshSecret: string;
        expiresIn: string;
        refreshExpiresIn: string;
    };
    cors: {
        origin: string[];
        credentials: boolean;
    };
    smtp: {
        enabled: boolean;
        host: string;
        port: number;
        user: string;
        password: string;
        from: string;
    };
    stripe: {
        enabled: boolean;
        secretKey: string;
        publishableKey: string;
        webhookSecret: string;
    };
    aws: {
        accessKeyId: string;
        secretAccessKey: string;
        region: string;
        s3Bucket: string;
    };
    migrationCosts: {
        registration: number;
        jobMatching: number;
        documentation: number;
        visaProcessing: number;
        preDeparture: number;
        postArrival: number;
        employerServices: number;
    };
    fileUpload: {
        maxSize: number;
        allowedTypes: string[];
    };
};
//# sourceMappingURL=config.d.ts.map