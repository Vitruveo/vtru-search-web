import { Asset } from '@/features/assets/types';

export const isAssetAvailable = (asset: Asset) => {
    const { nft } = asset.licenses;

    switch (nft.editionOption) {
        case 'elastic':
            return nft.elastic.numberOfEditions > 0;
        case 'single':
            return true;
        case 'unlimited':
            return true;
        default:
            return false;
    }
};

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

export const sortAssetsByAvailability = (a: Asset, b: Asset) => {
    if (isAssetAvailable(a) && !isAssetAvailable(b)) {
        return -1;
    }
    if (!isAssetAvailable(a) && isAssetAvailable(b)) {
        return 1;
    }
    return 0;
};

export const formatPrice = (price = 0) =>
    price
        .toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            currencyDisplay: 'symbol',
            currencySign: 'accounting',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
        .replace(/\$/, 'US$ ');
