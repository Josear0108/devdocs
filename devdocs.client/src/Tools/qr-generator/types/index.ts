export interface VCardData {
    firstName: string;
    lastName: string;
    mobile: string;
    landline: string;
    email: string;
    company: string;
    address: string;
    city: string;
    country: string;
    website: string;
}

export interface RequiredVCardFields {
    firstName: boolean;
    lastName: boolean;
    mobile: boolean;
    email: boolean;
    // Añade otros si es necesario
}

export type FileExtension = 'svg' | 'png' | 'jpeg' | 'webp';