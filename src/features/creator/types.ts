export interface InitialState {
    username: string;
    token: string;
    email: string;
    code: string;
    wasSended: boolean;
    loading: boolean;
    id: string;
    avatar: string | null;
    wallets: { address: string }[];
}

export interface OptConfirmResponse {
    token: string;
    creator: {
        username: string;
        _id: string;
        profile: {
            avatar: string;
        };
        wallets: { address: string }[];
    };
}
