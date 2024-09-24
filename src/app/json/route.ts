import { NextResponse } from 'next/server';
import axios from 'axios';

import { API_BASE_URL, STORE_BASE_URL } from '@/constants/api';
import { AWS_BASE_URL_S3, GENERAL_STORAGE_URL } from '@/constants/aws';

function parseQueryParams(searchParams: URLSearchParams) {
    const params: any = {};

    const entries = searchParams.entries() as unknown as [string, string][];

    for (const item of entries) {
        const [key, value] = item;

        const keys = key.replace(/\[/g, '.').replace(/\]/g, '').split('.');

        keys.reduce((acc, part, index) => {
            if (index === keys.length - 1) {
                acc[part] = value;
            } else {
                acc[part] = acc[part] || {};
            }
            return acc[part];
        }, params);
    }

    return params;
}

function buildQueryParams(params: any) {
    const assetMetadataProps = ['context', 'taxonomy', 'creators'];
    const modifiedParams: any = {};

    Object.entries(params).forEach((item) => {
        const [key, value] = item as [string, string];
        const boolValue = value === 'yes' ? true : value === 'no' ? false : value;
        const keys = key.split('_');
        if (assetMetadataProps.includes(keys[0])) {
            const newKey = `query[assetMetadata.${keys[0]}.formData.${keys[1]}][$in]`;
            const values = value.split(',');
            values.forEach((v, index) => {
                modifiedParams[`${newKey}[${index}]`] = v;
            });
        }
        if (keys[0] === 'sort') {
            modifiedParams[`sort[${keys[1] === 'sold' ? 'isIncludeSold' : keys[1]}]`] = boolValue;
        }
        if (keys[0] === 'portfolio') {
            const values = value.split(',');
            values.forEach((v, index) => {
                modifiedParams[`query[mintExplorer.adress][$in][${index}]`] = v;
            });
        }
        if (keys[0] === 'price') {
            keys[1] === 'min' ? (modifiedParams['minPrice'] = value) : (modifiedParams['maxPrice'] = value);
        }
        if (keys[0] === 'precision') {
            modifiedParams['precision'] = value;
        }
        if (keys[0] === 'showAdditionalAssets') {
            modifiedParams['showAdditionalAssets'] = boolValue;
        }
    });
    return modifiedParams;
}

function multiplyPriceBy100(data: any) {
    if (data && data.price) {
        data.price *= 100;
    }
    return data;
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const queryParams = parseQueryParams(searchParams);
    const buildedQueryParams = buildQueryParams(queryParams);

    const [assets, recentlySold, spotlight] = await Promise.all([
        axios.get(`${API_BASE_URL}/assets/public/search`, {
            params: buildedQueryParams,
        }),
        axios.get(`${API_BASE_URL}/assets/public/lastSold`),
        axios.get(`${API_BASE_URL}/assets/public/spotlight?nudity=no`),
    ]);

    const data = {
        recentlySold: recentlySold.data.data.map(multiplyPriceBy100),
        spotlight: spotlight.data.data.map(multiplyPriceBy100),
        assets: {
            page: assets.data.data.page,
            limit: assets.data.data.limit,
            total: assets.data.data.total,
            pages: assets.data.data.totalPage,
            data: assets.data.data.data.map((item: any) => ({
                _id: item._id,
                title: item.assetMetadata.context.formData.title,
                description: item.assetMetadata.context.formData.description,
                preview: item.formats.preview.path,
                thumbnail: item.formats.preview.path.replace(/\.(\w+)$/, '_thumb.jpg'),
                price: item.licenses.nft.single.editionPrice * 100,
                username: item.username,
                nudity: item.assetMetadata.taxonomy.formData.nudity,
            })),
        },
        config: {
            baseUrl: {
                assets: `${AWS_BASE_URL_S3}/`,
                general: `${GENERAL_STORAGE_URL}/`,
                store: `${STORE_BASE_URL}/`,
            },
            currency: 'USD',
        },
    };

    return NextResponse.json(data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
