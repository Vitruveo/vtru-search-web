export interface InitialState {
    preSignedURL: string | null;
    shareAvailable: boolean;
    path: string;
    uploadProgress: number;
}

export interface PreSignedURLPayload {
    preSignedURL: string;
    transactionId: string;
    path: string;
    origin: 'asset' | 'profile';
    method: 'PUT' | 'DELETE';
}

export interface UploadPayload {
    preSignedURL: string;
    screenShot: string;
}

export interface RequestUploadParams {
    assets: string[];
    fees: number;
    title: string;
}
