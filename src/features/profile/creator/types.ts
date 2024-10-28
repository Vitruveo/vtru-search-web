export interface ProfileCreatorSliceState {
    loading: boolean;
    error: string | null;
    data: ProfileCreator;
}

export interface ProfileCreator {
    id: string;
    avatar: string;
    artsQuantity: number;
}
