export interface SystemStatusType {
    [key: string]: {
        info: CommonType['info'];
        warn: CommonType['warn'];
        error: CommonType['error'];
        maintenance: CommonType['maintenance'];
    };
}

export interface CommonType {
    info: {
        message: string;
    }[];
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
