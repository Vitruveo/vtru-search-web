import { Asset } from '../assets/types';

export interface AssetState {
    loading: boolean;
    creatorLoading: boolean;
    lastAssetsLoading: boolean;
    asset: Asset;
    loadingDigitalCollectibleDownload: boolean;
    creatorAvatar: string;
    lastAssets: LastAssets[];
    error: string | null;
}

export interface LastAssets {
    _id: string;
    path: string;
}
