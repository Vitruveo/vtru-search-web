import axios from 'axios';
import { NextResponse } from 'next/server';

import { API_BASE_URL, NODE_ENV } from '@/constants/api';
import { GENERAL_STORAGE_URL } from '@/constants/aws';
import { XMLBuilder } from 'fast-xml-parser';
import { REDIRECTS_JSON } from '@/constants/vitruveo';

export async function GET() {
    try {
        const stacks = await axios.get(`${API_BASE_URL}/creators/public/stacks`);
        const redirects = await axios.get(REDIRECTS_JSON);
        const VITRUVEO_URL = redirects.data.common.vitruveo.base_url;
        const SLIDESHOW_BASE_URL = redirects.data[NODE_ENV].xibit.slideshow_url;

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
                    link: VITRUVEO_URL,
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
    } catch (error) {
        return NextResponse.json(
            { message: 'Página gerada estaticamente' },
            {
                headers: {
                    'Content-Type': 'application/xml',
                },
            }
        );
    }
}
