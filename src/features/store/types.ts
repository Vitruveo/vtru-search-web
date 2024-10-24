import { Asset } from '../assets/types';

export interface AssetState {
    loading: boolean;
    asset: Asset;
    error: string | null;
}
