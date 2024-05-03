export interface InitialState {
    username: string;
    token: string;
    email: string;
    code: string;
    wasSended: boolean;
    loading: boolean;
    id: string;
}

export interface OptConfirmResponse {
    token: string;
    creator: {
        username: string;
        _id: string;
    };
}
