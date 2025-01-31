import { API_BASE_URL, LOCAL_STORES } from '@/constants/api';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function generateHash(value: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(value);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

export async function middleware(request: NextRequest) {
    const host = request.headers.get('host') || '';
    const parts = host.split('.');
    const isLocalhost = host.includes('localhost');
    const isXibitLive = host.includes('xibit.live');

    const headers = new Headers(request.headers);

    const notVerifySubdomain = ['www'];
    const subdomain = parts[0];
    if (notVerifySubdomain.includes(subdomain)) {
        return NextResponse.next({
            headers,
        });
    }

    if (isLocalhost) {
        headers.set('x-subdomain', LOCAL_STORES);
    }

    if (isLocalhost ? parts.length > 1 : isXibitLive ? parts.length > 2 : parts.length > 3) {
        console.log('has subdomain', subdomain);

        const hash = await generateHash(subdomain);
        console.log('generated hash', hash);

        try {
            const response = await fetch(`${API_BASE_URL}/stores/public/validate/${hash}`);
            if (response.ok) {
                console.log('subdomain is valid');
                headers.set('x-subdomain', subdomain);
            } else {
                console.log('subdomain is invalid');

                headers.set('x-subdomain', '');
                headers.set('x-subdomain-error', 'Invalid subdomain');
            }
        } catch (error) {
            console.log('error validating subdomain', error);

            headers.set('x-subdomain', '');
            headers.set('x-subdomain-error', 'Error validating subdomain');
        }
    }

    return NextResponse.next({
        headers,
    });
}

export const config = {
    matcher: '/',
};
