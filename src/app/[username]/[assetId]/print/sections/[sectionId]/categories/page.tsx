'use client';

import { useEffect, useState } from 'react';
import { Breadcrumb } from '@/app/components/Breadcrumb';
import { Box, CircularProgress, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Catalog, ProductItem, Products, Sections } from '../../types';
import { CATALOG_ASSETS_BASE_URL, CATALOG_BASE_URL, PRODUCTS_BASE_URL } from '@/constants/api';
import { getProductsImages, getProductsPlaceholders } from '../../utils';

interface CardItemProps {
    title: string;
    count: number;
    img?: string;
}

const CardItem = ({ title, count, img }: CardItemProps) => {
    return (
        <Box position="relative">
            <Image
                src={img || 'https://vitruveo-studio-production-general.s3.amazonaws.com/noImage.jpg'}
                alt="No image"
                width={300}
                height={300}
            />
            <Box
                sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                bgcolor="gray"
                marginTop={-1}
                width="100%"
                p={2}
                display="flex"
                justifyContent="space-between"
            >
                <Typography variant="h5" color="#ffffff" maxWidth={270}>
                    {title}
                </Typography>
                {/* <Typography variant="h4" color="#FF0066">
                    {count}
                </Typography> */}
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
    const [section, setSection] = useState<Sections | null>(null);

    const handleSetCategories = ({ catalog, products }: { catalog: Catalog; products: ProductItem[] }) => {
        const catalogSection = catalog.sections.find((item) => item.sectionId === params.sectionId)!;
        const mappedCategoriesPlaceholders = catalog.categories
            .filter((c) => catalogSection?.categories.includes(c.categoryId))
            .map((v) => ({
                ...v,
                src:
                    products.find((imgProd) => imgProd.categoryId === v.categoryId)?.images[0] || v.images.preview
                        ? `${CATALOG_ASSETS_BASE_URL}/${v.images.preview}`
                        : '',
            }));

        setCategories(mappedCategoriesPlaceholders);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catalogResponse, productsResponse] = await Promise.all([
                    fetch(CATALOG_BASE_URL),
                    fetch(PRODUCTS_BASE_URL),
                ]);

                const catalog: Catalog = await catalogResponse.json();
                const products: Products = await productsResponse.json();

                const catalogSection = catalog.sections.find((item) => item.sectionId === params.sectionId)!;
                setSection(catalogSection);

                const imagesPlaceholders = getProductsPlaceholders({ products: products.vertical });
                handleSetCategories({ catalog, products: imagesPlaceholders });

                const images = await getProductsImages({
                    assetId: params.assetId,
                    products: products.vertical,
                    onlyFirst: true,
                });

                handleSetCategories({ catalog, products: images });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [params.assetId]);

    return (
        <Box
            padding={4}
            sx={{
                overflowY: 'auto',
                height: '100vh',
                paddingBottom: 10,

                display: 'flex',
                flexDirection: 'column',
                gap: 4,
            }}
        >
            <Box display="flex" justifyContent="start">
                <Image src={'/images/logos/XIBIT-logo_dark.png'} alt="logo" height={40} width={120} priority />
            </Box>

            <Typography variant="h4" fontSize={['1.5rem', '1.75rem', '2rem', '2.5rem']}>
                Print License
            </Typography>

            <Breadcrumb
                items={breadcrumbItems({
                    segment: section ? section.title : '',
                })}
                params={params}
            />

            <Box display="flex" flexWrap="wrap" justifyContent="center" gap={4} width="100%">
                {categories.length ? (
                    categories.map((item) => (
                        <Link
                            key={item.categoryId}
                            href={`/${params.username}/${params.assetId}/print/sections/${params.sectionId}/categories/${item.categoryId}/products`}
                        >
                            <CardItem img={item.src} title={item.title} count={3} />
                        </Link>
                    ))
                ) : (
                    <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
                        <CircularProgress />
                    </Box>
                )}
            </Box>
        </Box>
    );
}
