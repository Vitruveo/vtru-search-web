module.exports = {
    siteUrl: 'https://search.vitruveo.xyz',
    generateRobotsTxt: true,
    changefreq: 'daily',
    sitemapSize: 5000,
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://search.vitruveo.xyz/my-custom-sitemap-1.xml',
            'https://search.vitruveo.xyz/my-custom-sitemap-2.xml',
        ],
    },
};
