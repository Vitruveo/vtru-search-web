export interface ProfileCreatorSliceState {
    loading: boolean;
    error: string | null;
    data: ProfileCreator;
}

export interface Social {
    x: {
        name: string | null;
        avatar: string | null;
    };
    facebook: {
        name: string | null;
        avatar: string | null;
    };
    google: {
        name: string | null;
        avatar: string | null;
    };
}

export interface ProfileCreator {
    id: string;
    username: string;
    avatar: string;
    socials: Social;
    artsQuantity: number;
}
