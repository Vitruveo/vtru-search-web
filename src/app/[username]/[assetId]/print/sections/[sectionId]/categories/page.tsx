'use client';

import { useEffect, useState } from 'react';
import { Breadcrumb } from '@/app/components/Breadcrumb';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Catalog, Products } from '../../types';
import { CATALOG_BASE_URL, PRODUCTS_BASE_URL } from '@/constants/api';
import { getProductsImages } from '../../utils';

interface CardItemProps {
    title: string;
    count: number;
    img?: string;
}

const CardItem = ({ title, count, img }: CardItemProps) => {
    return (
        <Box mt={4} position="relative">
            <Image
                src={img || 'https://vitruveo-studio-production-general.s3.amazonaws.com/noImage.jpg'}
                alt="No image"
                width={300}
                height={300}
            />
            <Box bgcolor="gray" marginTop={-1} width="100%" p={2} display="flex" justifyContent="space-between">
                <Typography variant="h4" color="#ffffff">
                    {title}
                </Typography>
                <Typography variant="h4" color="#FF0066">
                    {count}
                </Typography>
            </Box>
        </Box>
    );
};

interface BreadCrumbIParams {
    segment: string;
}

const breadcrumbItems = ({ segment = 'Unknown' }: BreadCrumbIParams) => [
    {
        label: 'Home',
        href: '/{username}/{assetId}/print/sections',
    },
    {
        label: segment,
    },
];

interface PrintCategoriesProps {
    params: {
        username: string;
        assetId: string;
        sectionId: string;
    };
}

export default function PrintCategories({ params }: PrintCategoriesProps) {
    const [categories, setCategories] = useState<{ src?: string; categoryId: string; title: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catalogResponse, productsResponse] = await Promise.all([
                    fetch(CATALOG_BASE_URL),
                    fetch(PRODUCTS_BASE_URL),
                ]);

                const catalog: Catalog = await catalogResponse.json();
                const products: Products[] = await productsResponse.json();
                const images = await getProductsImages({ assetId: params.assetId, products, onlyFirst: true });

                const mappedCategories = catalog.categories.map((v) => ({
                    ...v,
                    src: images.find((imgProd) => imgProd.categoryId === v.categoryId)?.images[0],
                }));

                setCategories(mappedCategories);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.assetId]);

    if (loading) return <div>Loading...</div>;

    return (
        <Box
            padding={2}
            sx={{
                overflowY: 'auto',
                height: '100vh',
                paddingBottom: 10,
            }}
        >
            <Box display="flex" justifyContent="center" alignItems="center">
                <Image src={'/images/logos/XIBIT-logo_dark.png'} alt="logo" height={40} width={120} priority />
            </Box>

            <Typography variant="h1" mt={2} fontSize={['1.5rem', '1.75rem', '2rem', '2.5rem']}>
                Print License
            </Typography>

            <Breadcrumb
                items={breadcrumbItems({
                    segment: categories.length ? categories[0].title : 'Loading...',
                })}
                params={params}
            />

            <Typography
                mt={2}
                fontSize={['1rem', '1.25rem', '1.5rem', '2rem']}
                lineHeight={['1.5rem', '1.75rem', '2rem', '2.5rem']}
            >
                Capture attention and tell your brand{"'"}s story through strategic, innovative display solutions that
                transform how audiences perceive and interact with your message.
            </Typography>

            <Box
                display="flex"
                flexWrap="wrap"
                justifyContent={['center', 'flex-start', 'flex-start']}
                gap={2}
                mt={4}
                width="100%"
            >
                {categories.map((item) => (
                    <Link
                        key={item.categoryId}
                        href={`/${params.username}/${params.assetId}/print/sections/${params.sectionId}/categories/${item.categoryId}/products`}
                    >
                        <CardItem img={item.src} title={item.title} count={3} />
                    </Link>
                ))}
            </Box>
        </Box>
    );
}
