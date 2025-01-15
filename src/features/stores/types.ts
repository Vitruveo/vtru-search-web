export interface Media {
    name: string;
    path: string;
}

export interface StoresFormats {
    logo: {
        horizontal?: Media;
        square?: Media;
    };
    banner?: Media;
}

export interface Organization {
    url?: string;
    name: string;
    description?: string;
    markup: number;
    formats: StoresFormats;
}

export interface StoresFramework {
    createdAt: string;
    updatedAt: string;
    createdBy?: string;
    updatedBy?: string;
}

export interface Stores {
    _id: string;
    organization: Organization;
    hash: string;
    framework: StoresFramework;
    artworks: {
        general: any;
        context: any;
        taxonomy: any;
        artists: any;
    };
    status: 'draft' | 'active' | 'inactive';
    actions?: {
        countClone: number;
    };
}

export interface StoresState {
    loading: boolean;
    error: string | null;
    data: Stores;
}
