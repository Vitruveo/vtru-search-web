import { NextResponse } from 'next/server';
import axios from 'axios';

import { API_BASE_URL } from '@/constants/api';

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

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const queryParams = parseQueryParams(searchParams);
    console.log(queryParams);

    const [assets, recentlySold, spotlight] = await Promise.all([
        axios.get(`${API_BASE_URL}/assets/public/search`, {
            params: queryParams,
        }),
        axios.get(`${API_BASE_URL}/assets/public/lastSold`),
        axios.get(`${API_BASE_URL}/assets/public/spotlight?nudity=no`),
    ]);

    const data = {
        recentlySold: recentlySold.data.data,
        spotlight: spotlight.data.data,
        assets: {
            page: assets.data.data.page,
            limit: assets.data.data.limit,
            total: assets.data.data.total,
            pages: assets.data.data.totalPage,
            data: assets.data.data.data,
        },
    };

    return NextResponse.json(data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
