export interface SystemStatusType {
    [key: string]: {
        warn: CommonType['warn'];
        error: CommonType['error'];
        maintenance: CommonType['maintenance'];
    };
}

export interface CommonType {
    warn: {
        message: string;
    }[];
    error: {
        message: string;
    }[];
    maintenance: {
        message: string;
    }[];
}

export interface SystemStatusState {
    data: SystemStatusType;
    loading: boolean;
    error: string | null;
}
