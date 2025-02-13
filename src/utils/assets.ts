import { Asset, LastSoldAsset, SpotlightAsset } from '@/features/assets/types';
import { Organization, Stores } from '@/features/stores/types';

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

export const getAssetPrice = (asset: Asset | LastSoldAsset | SpotlightAsset, stores?: Stores) => {
    // eslint-disable-next-line
    // @ts-ignore
    const license = asset?.licenses?.nft ? asset.licenses.nft : asset.licenses;

    switch (license.editionOption) {
        case 'elastic': {
            const price = license.elastic.editionPrice;
            return formatPrice({
                price: getPriceWithMarkup({ stores, assetPrice: price, assetCreatedBy: asset?.framework?.createdBy }),
            });
        }
        case 'single': {
            const price = license.single.editionPrice;
            return formatPrice({
                price: getPriceWithMarkup({ stores, assetPrice: price, assetCreatedBy: asset?.framework?.createdBy }),
            });
        }
        case 'unlimited': {
            const price = license.unlimited.editionPrice;
            return formatPrice({
                price: getPriceWithMarkup({ stores, assetPrice: price, assetCreatedBy: asset?.framework?.createdBy }),
            });
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

export function getPriceWithMarkup({
    assetCreatedBy,
    assetPrice,
    stores,
}: {
    assetCreatedBy: string | null;
    assetPrice: number;
    stores?: Stores;
}) {
    console.log({
        assetCreatedBy,
        storeCreatedBy: stores?.framework?.createdBy,
        valid: assetCreatedBy === stores?.framework?.createdBy,
    });
    return stores?.organization?.markup && assetCreatedBy !== stores.framework.createdBy
        ? assetPrice * (1 + stores.organization.markup / 100)
        : assetPrice;
}

export function overwriteWithInitialFilters<T>({
    target,
    initialFilters,
}: {
    target: Record<string, any>;
    initialFilters?: Record<string, any>;
}): T {
    const result = { ...target };
    const initial = initialFilters || {};

    Object.keys(initial).forEach((key) => {
        const initialValue = initial[key];
        const targetValue = result[key];

        if (Array.isArray(initialValue)) {
            result[key] = Array.isArray(targetValue)
                ? Array.from(new Set([...targetValue, ...initialValue]))
                : [...initialValue];
        } else if (typeof initialValue === 'object' && initialValue !== null) {
            result[key] =
                !targetValue || typeof targetValue !== 'object' || Array.isArray(targetValue)
                    ? {}
                    : overwriteWithInitialFilters({
                          target: targetValue,
                          initialFilters: initialValue,
                      });
        } else if (initialValue !== undefined) {
            result[key] = initialValue;
        }
    });

    return result as T;
}
