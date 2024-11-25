import { headers } from 'next/headers';

import Component from './component';

export default function Home() {
    const headersList = headers();
    const hasSubdomain = headersList.has('x-subdomain');
    const hasSubdomainError = headersList.has('x-subdomain-error');
    const subdomain = headersList.get('x-subdomain');

    return (
        <Component
            data={{
                hasSubdomain,
                hasSubdomainError,
                subdomain: subdomain || '',
            }}
        />
    );
}
