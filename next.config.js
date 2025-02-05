/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'vitruveo-studio-dev-general.s3.amazonaws.com',
            'vitruveo-studio-dev-stores.s3.amazonaws.com',
            'vitruveo-studio-dev-assets.s3.amazonaws.com',
            'vitruveo-studio-qa-general.s3.amazonaws.com',
            'vitruveo-studio-qa-stores.s3.amazonaws.com',
            'vitruveo-studio-qa-assets.s3.amazonaws.com',
            'vitruveo-studio-production-general.s3.amazonaws.com',
            'vitruveo-studio-production-stores.s3.amazonaws.com',
            'vitruveo-studio-production-assets.s3.amazonaws.com',
            'via.placeholder.com',
            'slideshow.vtru.dev',
        ],
    },
    reactStrictMode: false,
    async redirects() {
        return [
            {
                source: '/home',
                destination: '/',
                permanent: true,
            },
            {
                source: '/login',
                destination: '/',
                permanent: true,
            },
        ];
    },
    async rewrites() {
        return {
            beforeFiles: [
                {
                    source: '/',
                    has: [
                        {
                            type: 'host',
                            value: 'xibit.live',
                        },
                    ],
                    destination: '/stores',
                },
            ],
            afterFiles: [],
            fallback: [],
        };
    },
    modularizeImports: {
        '@mui/icons-material': {
            transform: '@mui/icons-material/{{member}}',
        },
        // TODO: Consider enabling modularizeImports for material when https://github.com/mui/material-ui/issues/36218 is resolved
        // '@mui/material': {
        //   transform: '@mui/material/{{member}}',
        // },
    },
};

module.exports = nextConfig;
