import axios from 'axios';
import { NextResponse } from 'next/server';

import { API_BASE_URL, SLIDESHOW_BASE_URL } from '@/constants/api';
import { GENERAL_STORAGE_URL } from '@/constants/aws';
import { XMLBuilder } from 'fast-xml-parser';

export async function GET() {
    const stacks = await axios.get(`${API_BASE_URL}/creators/public/stacks`);

    const data = {
        config: {
            baseUrl: {
                general: `${GENERAL_STORAGE_URL}/`,
                slideshow: `${SLIDESHOW_BASE_URL}/`,
            },
        },
        stacks: {
            page: stacks.data.data.page,
            limit: stacks.data.data.limit,
            total: stacks.data.data.total,
            pages: stacks.data.data.totalPage,
            data: stacks.data.data.data,
        },
    };

    const jsonData = {
        rss: {
            channel: {
                title: 'VITRUVEO - Search',
                link: 'https://vitruveo.xyz/',
                description: 'VITRUVEO is a platform for creators to share their work with the world.',
                language: 'en-US',
            },
            data,
        },
    };
    const xmlBuilder = new XMLBuilder({ ignoreAttributes: false, format: true });
    const xmlData = xmlBuilder.build(jsonData);

    return new NextResponse(xmlData, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
