export interface InitialState {
    grid: {
        path: string;
        url: string;
        loading: boolean;
        error: null | string;
    };
}

export interface FinishedGridPayload {
    notification: {
        path: string;
        url: string;
    };
}

export interface UploadPayload {
    preSignedURL: string;
    screenShot: string;
}

export interface GridUploadParams {
    assetsId: string[];
    assets: string[];
    fees: number;
    size: number;
    title: string;
    description: string;
}
