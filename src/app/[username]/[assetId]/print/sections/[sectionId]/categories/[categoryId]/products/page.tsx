'use client';

import { useEffect, useState } from 'react';
import { Breadcrumb } from '@/app/components/Breadcrumb';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Catalog, Products } from '../../../../types';
import { CATALOG_BASE_URL, PRODUCTS_BASE_URL } from '@/constants/api';
import { formatPrice } from '@/utils/assets';
import { getProductsImages } from '../../../../utils';

interface CardItemProps {
    title: string;
    price: number;
    img?: string;
}

const CardItem = ({ title, price, img }: CardItemProps) => (
    <Box mt={4} position="relative">
        <Image
            src={img || 'https://vitruveo-studio-production-general.s3.amazonaws.com/noImage.jpg'}
            alt="No image"
            width={300}
            height={300}
        />
        <Box bgcolor="gray" marginTop={-1} width="100%" p={2}>
            <Typography variant="h4" color="#ffffff">
                {title}
            </Typography>
            <Typography variant="h5" color="#FF0066">
                {formatPrice({ price: price || 0, withUS: true, decimals: true })}
            </Typography>
        </Box>
    </Box>
);

const breadcrumbItems = ({ segment = 'Unknown', category = 'Unknown' }) => [
    { label: 'Home', href: '/{username}/{assetId}/print/sections' },
    { label: segment, href: '/{username}/{assetId}/print/sections/{sectionId}/categories' },
    { label: category },
];

interface PrintProductsProps {
    params: {
        username: string;
        assetId: string;
        sectionId: string;
        categoryId: string;
    };
}

export default function PrintProducts({ params }: PrintProductsProps) {
    const [catalog, setCatalog] = useState<Catalog | null>(null);
    const [productsImgs, setProductsImgs] = useState<Products[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const [catalogResponse, productsResponse] = await Promise.all([
                fetch(CATALOG_BASE_URL),
                fetch(PRODUCTS_BASE_URL),
            ]);

            const catalogData: Catalog = await catalogResponse.json();
            const products: Products[] = (await productsResponse.json()).filter(
                (item: Products) => item.categoryId === params.categoryId
            );

            const images = await getProductsImages({ assetId: params.assetId, products, onlyFirst: true });

            setCatalog(catalogData);
            setProductsImgs(images);
            setLoading(false);
        };

        fetchData();
    }, [params]);

    return (
        <Box padding={2} sx={{ overflowY: 'auto', height: '100vh', paddingBottom: 10 }}>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Image src={'/images/logos/XIBIT-logo_dark.png'} alt="logo" height={40} width={120} priority />
            </Box>

            <Typography variant="h1" mt={2} fontSize={['1.5rem', '1.75rem', '2rem', '2.5rem']}>
                Print License
            </Typography>

            <Breadcrumb
                items={breadcrumbItems({
                    segment: catalog?.sections.find((item) => item.sectionId === params.sectionId)?.title ?? 'Unknown',
                    category:
                        catalog?.categories.find((item) => item.categoryId === params.categoryId)?.title ?? 'Unknown',
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
                {productsImgs.map((item) => (
                    <Link
                        key={item.productId}
                        href={`/${params.username}/${params.assetId}/print/sections/${params.sectionId}/categories/${params.categoryId}/products/${item.productId}`}
                    >
                        <CardItem img={item.images[0]} title={item.title} price={item.price} />
                    </Link>
                ))}
            </Box>
        </Box>
    );
}
