import axios from 'axios';
import { NextResponse } from 'next/server';

import { API_BASE_URL, SLIDESHOW_BASE_URL } from '@/constants/api';
import { GENERAL_STORAGE_URL } from '@/constants/aws';

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

        return NextResponse.json(data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return NextResponse.json(
            { message: 'Página gerada estaticamente' },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
}
