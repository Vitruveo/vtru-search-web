import { Asset, LastSoldAsset, SpotlightAsset } from '@/features/assets/types';
import { Organization } from '@/features/stores/types';

export const isAssetAvailableLicenses = (asset: Asset) => asset.licenses.nft.availableLicenses > 0;

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

export const getAssetPrice = (asset: Asset | LastSoldAsset | SpotlightAsset, organization?: Organization) => {
    // eslint-disable-next-line
    // @ts-ignore
    const license = asset?.licenses?.nft ? asset.licenses.nft : asset.licenses;
    const priceMarkup = organization?.markup;

    switch (license.editionOption) {
        case 'elastic': {
            const price = license.elastic.editionPrice;
            return formatPrice({ price: priceMarkup ? price * (1 + priceMarkup / 100) : price });
        }
        case 'single': {
            const price = license.single.editionPrice;
            return formatPrice({ price: priceMarkup ? price * (1 + priceMarkup / 100) : price });
        }
        case 'unlimited': {
            const price = license.unlimited.editionPrice;
            return formatPrice({ price: priceMarkup ? price * (1 + priceMarkup / 100) : price });
        }
        default:
            return 'N/A';
    }
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
