export interface InitialState {
    username: string;
    token: string;
    email: string;
    code: string;

    wasSended: boolean;
    loading: boolean;
}

export interface OptConfirmResponse {
    token: string;
    creator: {
        username: string;
    };
}
