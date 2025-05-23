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
        portfolio: any;
        wallets: any;
        exclude: any;
        include: any;
        searchOption: string;
    };
    status: 'draft' | 'active' | 'inactive' | 'pending';
    username: string;
    emails: {
        email: string;
        codeHash: string | null;
        checkedAt: string | null;
    }[];
    appearanceContent: {
        highlightColor: string;
        hideElements: {
            filters: boolean;
            order: boolean;
            header: boolean;
            recentlySold: boolean;
            artworkSpotlight: boolean;
            artistSpotlight: boolean;
            pageNavigation: boolean;
            cardDetails: boolean;
            assets: boolean;
        };
    };
}

export interface StoresState {
    loading: boolean;
    error: string | null;
    sort: string;
    search: string;
    currentDomain: Stores;
    spotlight: StoresSpotlight[];
    paginated: {
        list: Stores[];
        limit: number;
        page: number;
        total: number;
        totalPage: number;
    };
}

export interface StoresSpotlight {
    _id: string;
    name: string;
    url: string;
    description: string;
    logo: string;
}

export interface GetStoresParams {
    limit: number;
    page: number;
    sort?: string;
    search?: string;
}

export interface GetStoresResponse {
    data: Stores[];
    limit: number;
    page: number;
    total: number;
    totalPage: number;
}
