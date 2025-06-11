import { ASSET_STORAGE_URL, GENERAL_STORAGE_URL } from '@/constants/aws';

export const buildAssetURL = (path: string) => {
    return `${ASSET_STORAGE_URL}/${path}`;
};

export const buildGeneralURL = (path: string) => {
    return `${GENERAL_STORAGE_URL}/${path}`;
};

export const getHasStack = () => {
    const url = new URL(window.location.href);
    const hasStack = url.searchParams.get('stack');

    if (hasStack) {
        return hasStack;
    }

    return '';
};

export const getSlideshowId = () => {
    const url = new URL(window.location.href);
    const slideshowId = url.searchParams.get('slideshow');

    if (slideshowId) {
        return slideshowId;
    }

    return '';
};
