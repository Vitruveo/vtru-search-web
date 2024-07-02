import { NextResponse } from 'next/server';

export function middleware(_request: any) {
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    return response;
}
