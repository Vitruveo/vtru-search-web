'use client';

import { useEffect, useMemo, useState } from 'react';
import { Breadcrumb } from '@/app/components/Breadcrumb';
import { Box, CircularProgress, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Catalog, ProductItem, Products } from '../../../../types';
import { API_BASE_URL, CATALOG_BASE_URL, PRODUCTS_BASE_URL } from '@/constants/api';
import { formatPrice } from '@/utils/assets';
import { getProductsImages, getProductsPlaceholders } from '../../../../utils';
import { Asset } from '@/features/assets/types';

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
        <Box bgcolor="gray" marginTop={-1} width="100%" p={2}>
            <Typography variant="h4" color="#ffffff" maxWidth={270}>
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
    const [productsImgs, setProductsImgs] = useState<ProductItem[]>([]);
    const [asset, setAsset] = useState<Asset | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const [catalogResponse, productsResponse] = await Promise.all([
                fetch(CATALOG_BASE_URL),
                fetch(PRODUCTS_BASE_URL),
            ]);

            const catalogData: Catalog = await catalogResponse.json();
            const products: ProductItem[] = ((await productsResponse.json()) as Products).vertical.filter(
                (item: ProductItem) => item.categoryId === params.categoryId
            );

            const imagesPlaceholders = getProductsPlaceholders({ products });

            setProductsImgs(imagesPlaceholders);

            const images = await getProductsImages({ assetId: params.assetId, products, onlyFirst: true });

            setCatalog(catalogData);
            setProductsImgs(images);
        };

        const fetchAsset = async () => {
            const assetRequest = await fetch(`${API_BASE_URL}/assets/store/${params.assetId}`);
            const data: { data: Asset } = await assetRequest.json();

            setAsset(data.data);
        };

        fetchData();
        fetchAsset();
    }, [params]);

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
                paddingBottom: 10,

                display: 'flex',
                flexDirection: 'column',
                gap: 4,
            }}
        >
            <Box display="flex" justifyContent="center" alignItems="center">
                <Image src={'/images/logos/XIBIT-logo_dark.png'} alt="logo" height={40} width={120} priority />
            </Box>

            <Typography variant="h1" fontSize={['1.5rem', '1.75rem', '2rem', '2.5rem']}>
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
                    productsImgs.map((item) => {
                        const artworkLicense = () => {
                            if (params.categoryId === 'mugs') {
                                return asset.licenses.nft.single.editionPrice * section.priceMultiplier;
                            }

                            if (params.categoryId === 'frames') {
                                return asset.licenses.nft.single.editionPrice * section.priceMultiplier * item.area;
                            }

                            return 0;
                        };

                        const merchandiseFee = (item.price / 100) * 1.2;
                        const platformFee = asset.licenses.nft.single.editionPrice * 0.02;
                        const shipping = item.shipping / 100;

                        const total = artworkLicense() + merchandiseFee + platformFee + shipping;

                        return (
                            <Link
                                key={item.productId}
                                href={`/${params.username}/${params.assetId}/print/sections/${params.sectionId}/categories/${params.categoryId}/products/${item.productId}`}
                            >
                                <CardItem img={item.images[0]} title={item.title} price={total} />
                            </Link>
                        );
                    })
                ) : (
                    <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
                        <CircularProgress />
                    </Box>
                )}
            </Box>
        </Box>
    );
}
