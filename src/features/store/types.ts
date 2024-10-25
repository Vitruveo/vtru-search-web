import { Asset } from '../assets/types';

export interface AssetState {
    loading: boolean;
    asset: Asset;
    creatorAvatar: string;
    error: string | null;
}
