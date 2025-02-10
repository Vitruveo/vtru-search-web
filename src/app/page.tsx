import { Metadata } from 'next';
import { headers } from 'next/headers';

import Component from './component';
import { API_BASE_URL } from '@/constants/api';
import { STORES_STORAGE_URL } from '@/constants/aws';

const generateHash = async (value: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(value);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
};

export async function generateMetadata(): Promise<Metadata> {
    const headersList = headers();
    const hostname = headersList.get('host') || '';
    const parts = hostname.split('.');
    const subdomainX = Array.isArray(parts) ? parts[0] : '';
    const isLocalhost = hostname.includes('localhost');
    const isXibitLive = hostname.includes('xibit.live');

    let title = '';
    let description = '';
    let image = '';

    if (isLocalhost ? parts.length > 1 : isXibitLive ? parts.length > 2 : parts.length > 3) {
        if (subdomainX && subdomainX !== 'www') {
            const hash = await generateHash(subdomainX);

            const response = await fetch(`${API_BASE_URL}/stores/public/validate/${hash}`);
            const data = await response.json();

            title = data.data.title;
            description = data.data.description;
            image = `${STORES_STORAGE_URL}/${data.data.image}`;
        } else {
            console.log('subdomainX is invalid');
        }
    } else {
        console.log('subdomainX is invalid');
    }

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [image],
        },
    };
}

export default function Home() {
    return <Component />;
}
