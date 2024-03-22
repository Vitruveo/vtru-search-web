/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'vitruveo-studio-dev-general.s3.amazonaws.com',
            'vitruveo-studio-qa-assets.s3.amazonaws.com',
            'vitruveo-studio-dev-assets.s3.amazonaws.com',
            'vitruveo-studio-qa-general.s3.amazonaws.com',
            'vitruveo-studio-production-assets.s3.amazonaws.com',
            'vitruveo-studio-production-general.s3.amazonaws.com',
        ],
    },
    reactStrictMode: false,
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true,
            },
        ];
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
    transpilePackages: ['@pqina/pintura', '@pqina/react-pintura'],
};

module.exports = nextConfig;
