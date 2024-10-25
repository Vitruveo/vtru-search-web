import { Asset } from '../assets/types';

export interface AssetState {
    loading: boolean;
    creatorLoading: boolean;
    asset: Asset;
    creatorAvatar: string;
    error: string | null;
}
