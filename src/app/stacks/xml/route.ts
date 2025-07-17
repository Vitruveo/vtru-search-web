import axios from 'axios';
import { NextResponse } from 'next/server';

import { API_BASE_URL, SLIDESHOW_BASE_URL } from '@/constants/api';
import { GENERAL_STORAGE_URL } from '@/constants/aws';
import { XMLBuilder } from 'fast-xml-parser';
import { BASE_URL_VITRUVEO } from '@/constants/vitruveo';

export async function GET() {
    try {
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
                    link: BASE_URL_VITRUVEO,
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
