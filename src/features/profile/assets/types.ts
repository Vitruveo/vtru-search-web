import { Asset } from '@/features/assets/types';

export interface GetProfileAssetsParams {
    page: number;
    limit: number;
    sort: string;
}

export interface ProfileAssetsSliceState {
    loading: boolean;
    error: string | null;
    data: ProfileAssetsData;
    sort: string;
}

export interface ProfileAssetsData {
    data: Asset[];
    limit: number;
    page: number;
    total: number;
    totalPage: number;
}
