import { Asset } from '@/features/assets/types';

export const addAssetsToURL = (assets: Asset[]) => {
    const assetIds = assets.map((asset) => asset._id).join(',');
    const url = new URL(window.location.href);
    url.searchParams.set('assets', assetIds);
    window.history.pushState({}, '', url.toString());
};

export const hasAssetsInURL = () => {
    const url = new URL(window.location.href);
    return url.searchParams.has('assets');
};

export const getAssetsIdsFromURL = () => {
    const url = new URL(window.location.href);
    const assetIds = url.searchParams.get('assets')?.split(',');
    return assetIds;
};

export const createBackLink = (id: string) => {
    return `${window.location.origin}?video=${id}`;
};

export const clearAssetsFromURL = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('assets');
    window.history.pushState({}, '', url.toString());
};
