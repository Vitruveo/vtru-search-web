'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import { Breadcrumb } from '@/app/components/Breadcrumb';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Catalog, ProductItem, Products } from '../../../../types';
import { API_BASE_URL, CATALOG_BASE_URL } from '@/constants/api';
import { formatPrice } from '@/utils/assets';
import { getProductsImages, getProductsPlaceholders } from '../../../../utils';
import { Asset } from '@/features/assets/types';
import { useDomainContext } from '@/app/context/domain';
import { useSelector } from '@/store/hooks';

interface CardItemProps {
    title: string;
    price: number;
    img?: string;
}

const CardItem = ({ title, price, img }: CardItemProps) => (
    <Box position="relative">
        <Image
            src={img || 'https://vitruveo-studio-production-general.s3.amazonaws.com/noImage.jpg'}
            alt="No image"
            width={300}
            height={300}
        />
        <Box sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }} bgcolor="gray" marginTop={-1} width="100%" p={2}>
            <Typography variant="h5" color="#ffffff" maxWidth={270}>
                {title}
            </Typography>
            <Typography variant="h5" color="#ffffff">
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
    definition: keyof Omit<Products, 'any'>;
    stackId?: string;
}

export default function PrintProducts({ params, definition, stackId }: PrintProductsProps) {
    const { subdomain, isValidSubdomain } = useDomainContext();
    const { _id: folioId } = useSelector((state) => state.stores.currentDomain);
    const [catalog, setCatalog] = useState<Catalog | null>(null);
    const [productsImgs, setProductsImgs] = useState<ProductItem[]>([]);
    const [asset, setAsset] = useState<Asset | null>(null);
    const [prices, setPrices] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const fetchCatalog = async () => {
            const catalogResponse = await axios.get(CATALOG_BASE_URL);
            setCatalog(catalogResponse.data);
        };

        const fetchAsset = async () => {
            const assetRequest = await axios.get(`${API_BASE_URL}/assets/store/${params.assetId}`);
            const data: { data: Asset } = assetRequest.data;
            setAsset(data.data);
        };

        fetchCatalog();
        fetchAsset();
    }, [params]);

    useEffect(() => {
        const fetchPrices = async () => {
            if (productsImgs.length === 0) return;
            const newPrices: { [key: string]: number } = {};
            await Promise.all(
                productsImgs.map(async (item) => {
                    try {
                        const response = await axios.get(
                            `${API_BASE_URL}/assets/public/print/price/${params.assetId}`,
                            {
                                params: {
                                    categoryId: params.categoryId,
                                    productId: item.productId,
                                    ...(isValidSubdomain && subdomain && folioId && { folioId }),
                                    ...(stackId && { stackId }),
                                },
                            }
                        );
                        newPrices[item.productId] = response.data.data.total;
                    } catch (error) {
                        newPrices[item.productId] = 0;
                    }
                })
            );
            setPrices(newPrices);
        };
        fetchPrices();
    }, [productsImgs, params.assetId, params.categoryId, folioId, stackId]);

    useEffect(() => {
        if (!catalog) return;

        const fetchProductImages = async () => {
            const products: ProductItem[] = [...catalog.products[definition], ...catalog.products.any].filter(
                (item: ProductItem) => item.categoryId === params.categoryId
            );

            const imagesPlaceholders = getProductsPlaceholders({ products, definition });
            setProductsImgs(imagesPlaceholders);

            const images = await getProductsImages({
                assetId: params.assetId,
                products,
                onlyFirst: true,
                definition,
            });
            setProductsImgs(images);
        };

        fetchProductImages();
    }, [catalog, definition, params]);

    const section = useMemo(
        () => catalog?.sections.find((item) => item.sectionId === params.sectionId),
        [catalog, params.sectionId]
    );

    return (
        <Box
            padding={4}
            sx={{
                overflowY: 'auto',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
            }}
        >
            <Box display="flex" justifyContent="start">
                <Image src={'/images/logos/XIBIT-logo_dark.png'} alt="logo" height={40} width={120} priority />
            </Box>

            <Typography variant="h4" fontSize={['1.5rem', '1.75rem', '2rem', '2.5rem']} lineHeight={1}>
                Print License
            </Typography>

            <Breadcrumb
                items={breadcrumbItems({
                    segment: catalog?.sections.find((item) => item.sectionId === params.sectionId)?.title ?? '',
                    category: catalog?.categories.find((item) => item.categoryId === params.categoryId)?.title ?? '',
                })}
                params={params}
            />

            <Box display="flex" flexWrap="wrap" justifyContent="center" gap={4} width="100%">
                {productsImgs.length && asset && section ? (
                    productsImgs.map((item) => (
                        <Link
                            key={item.productId}
                            href={`/${params.username}/${params.assetId}/print/sections/${params.sectionId}/categories/${params.categoryId}/products/${item.productId}`}
                        >
                            <CardItem img={item.images[0]} title={item.title} price={prices[item.productId] || 0} />
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
