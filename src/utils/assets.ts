import { Asset } from '@/features/assets/types';

export const isAssetAvailable = (asset: Asset) => asset.licenses.nft.availableLicenses > 0;

export const getAssetPrice = (asset: Asset) => {
    const { nft } = asset.licenses;

    switch (nft.editionOption) {
        case 'elastic':
            return formatPrice(nft.elastic.editionPrice);
        case 'single':
            return formatPrice(nft.single.editionPrice);
        case 'unlimited':
            return formatPrice(nft.unlimited.editionPrice);
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
