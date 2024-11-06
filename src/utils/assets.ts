import { Asset, LastSoldAsset, SpotlightAsset } from '@/features/assets/types';

export const isAssetAvailable = (asset: Asset) => asset.licenses.nft.availableLicenses > 0;

export const getAssetPrice = (asset: Asset | LastSoldAsset | SpotlightAsset) => {
    // eslint-disable-next-line
    // @ts-ignore
    const license = asset?.licenses?.nft ? asset.licenses.nft : asset.licenses;

    switch (license.editionOption) {
        case 'elastic':
            return formatPrice({ price: license.elastic.editionPrice });
        case 'single':
            return formatPrice({ price: license.single.editionPrice });
        case 'unlimited':
            return formatPrice({ price: license.unlimited.editionPrice });
        default:
            return 'N/A';
    }
};

interface FormatPriceProps {
    price: number;
    withUS?: boolean;
    decimals?: boolean;
}

export const formatPrice = ({ price = 0, withUS = false, decimals = false }: FormatPriceProps) => {
    let language = 'en-US';
    if (typeof navigator !== 'undefined' && navigator.language) {
        language = navigator.language;
    }
    const formatedPrice = price.toLocaleString(language, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: decimals ? 2 : 0,
        maximumFractionDigits: decimals ? 2 : 0,
    });
    return !withUS ? formatedPrice.replace('US', '') : formatedPrice;
};

export const formatPriceVUSD = ({ price = 0, withUS = false, decimals = false }: FormatPriceProps) => {
    let language = 'en-US';
    if (typeof navigator !== 'undefined' && navigator.language) {
        language = navigator.language;
    }
    const formatedPrice = price.toLocaleString(language, {
        // style: 'currency',
        // currency: 'USD',
        minimumFractionDigits: decimals ? 2 : 0,
        maximumFractionDigits: decimals ? 2 : 0,
    });
    return !withUS ? formatedPrice.replace('US', '') : formatedPrice;
};

export interface formatDateProps {
    year: number;
    month: number;
    day: number;
}

export function formatDate({ day, month, year }: formatDateProps) {
    const language = navigator.language || 'en-US';
    const rowDate = new Date(Date.UTC(year, month, day));
    const formattedDate = rowDate.toLocaleDateString(language, {
        timeZone: 'UTC',
    });
    return formattedDate;
}
