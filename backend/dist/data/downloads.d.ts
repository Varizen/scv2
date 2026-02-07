export declare const downloadData: {
    categories: {
        id: string;
        name: string;
        description: string;
        icon: string;
        displayOrder: number;
        items: {
            id: string;
            title: string;
            description: string;
            category: string;
            subcategory: string;
            fileName: string;
            filePath: string;
            fileSize: number;
            mimeType: string;
            language: string;
            required: boolean;
            stage: string;
            downloadCount: number;
            version: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }[];
    mobilePaymentRequirements: {
        title: string;
        description: string;
        requirements: string[];
        documents: string[];
        processingTime: string;
        fees: number;
        currency: string;
    };
    documentRequirements: {
        passport: {
            title: string;
            specifications: string[];
            validity: string;
            format: string;
            size: string;
        };
        policeClearance: {
            title: string;
            specifications: string[];
            validity: string;
            format: string;
            size: string;
        };
        photo: {
            title: string;
            specifications: string[];
            validity: string;
            format: string;
            size: string;
        };
        medicalClearance: {
            title: string;
            specifications: string[];
            validity: string;
            format: string;
            size: string;
        };
    };
    calibrationProcess: {
        title: string;
        steps: string[];
        timeline: string;
        requirements: string[];
        whatToExpect: string[];
    };
    appDownload: {
        title: string;
        description: string;
        platforms: {
            name: string;
            url: string;
            icon: string;
            description: string;
        }[];
        features: string[];
    };
};
//# sourceMappingURL=downloads.d.ts.map