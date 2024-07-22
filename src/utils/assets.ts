import { Asset, LastSoldAsset } from '@/features/assets/types';

export const isAssetAvailable = (asset: Asset) => asset.licenses.nft.availableLicenses > 0;

export const getAssetPrice = (asset: Asset | LastSoldAsset) => {
    const license = 'username' in asset ? asset.licenses : asset.licenses.nft;

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
    const language = navigator.language || 'en-US';

    const formatedPrice = price.toLocaleString(language, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    return formatedPrice.replace('US', '');
};
