import { ASSET_STORAGE_URL } from '@/constants/aws';
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

export function getThumbnailFromPath(path: string): Promise<string> {
    if (!path) return Promise.resolve('');
    const thumbPath = path.replace(/\.[^.]+$/, '_thumb.jpg');
    return new Promise((resolve) => {
        const img = new window.Image();
        img.onload = () => resolve(thumbPath);
        img.onerror = () => resolve(path);
        img.src = thumbPath;
    });
}
