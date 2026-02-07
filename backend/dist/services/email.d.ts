interface EmailOptions {
    to: string;
    subject: string;
    template: string;
    data: Record<string, any>;
}
export declare const sendEmail: (options: EmailOptions) => Promise<void>;
export declare const sendSMS: (phone: string, message: string) => Promise<void>;
export {};
//# sourceMappingURL=email.d.ts.map