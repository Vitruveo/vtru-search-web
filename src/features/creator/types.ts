export interface InitialState {
    username: string;
    token: string;
    email: string;
    code: string;
    wasSended: boolean;
    loading: boolean;
    id: string;
    avatar: string | null;
    preSignedURL: string | null;
    shareAvailable: boolean;
}

export interface OptConfirmResponse {
    token: string;
    creator: {
        username: string;
        _id: string;
        profile: {
            avatar: string;
        };
    };
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
