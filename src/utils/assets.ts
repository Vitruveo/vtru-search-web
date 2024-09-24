import { Asset, LastSoldAsset, SpotlightAsset } from '@/features/assets/types';

export const isAssetAvailable = (asset: Asset) => asset.licenses.nft.availableLicenses > 0;

export const getAssetPrice = (asset: Asset | LastSoldAsset | SpotlightAsset) => {
    // eslint-disable-next-line
    // @ts-ignore
    const license = asset?.licenses?.nft ? asset.licenses.nft : asset.licenses;

    switch (license.editionOption) {
        case 'elastic':
            return formatPrice(license.elastic.editionPrice);
        case 'single':
            return formatPrice(license.single.editionPrice);
        case 'unlimited':
            return formatPrice(license.unlimited.editionPrice);
        default:
            return 'N/A';
    }
};

export const formatPrice = (price = 0) => {
    let language = 'en-US';
    if (typeof navigator !== 'undefined' && navigator.language) {
        language = navigator.language;
    }
    const formatedPrice = price.toLocaleString(language, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    return formatedPrice.replace('US', '');
};
