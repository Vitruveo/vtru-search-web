export interface ProfileCreatorSliceState {
    loading: boolean;
    error: string | null;
    data: ProfileCreator;
}

export interface ProfileCreator {
    id: string;
    username: string;
    avatar: string;
    artsQuantity: number;
}
