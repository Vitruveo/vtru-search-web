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
    // console.log(queryParams);

    // get assets
    const { data: assets } = await axios.get(`${API_BASE_URL}/assets/public/search`, {
        params: queryParams,
    });

    // get recently sold
    const { data: recentlySold } = await axios.get(`${API_BASE_URL}/assets/public/lastSold`);

    // get spotlight
    const { data: spotlight } = await axios.get(`${API_BASE_URL}/assets/public/spotlight?nudity=no`);

    const data = {
        recentlySold: recentlySold.data,
        spotlight: spotlight.data,
        assets: {
            page: assets.data.page,
            limit: assets.data.limit,
            total: assets.data.total,
            pages: assets.data.totalPage,
            data: assets.data.data,
        },
    };

    return NextResponse.json(data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
