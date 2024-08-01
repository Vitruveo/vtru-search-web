export interface InitialState {
    preSignedURL: string | null;
    shareAvailable: boolean;
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
