'use client';

import { Box, Button, Chip, CircularProgress, Grid, Typography } from '@mui/material';
import Image from 'next/image';

// components
import ProductCarousel from '@/app/components/Store/components/PanelMint/PrintLicense/ecommerce/productDetail/ProductCarousel';
import { Breadcrumb } from '@/app/components/Breadcrumb';
import { Catalog, Products } from '../../../../../types';
import { useEffect, useState } from 'react';
import { CATALOG_BASE_URL, PRODUCTS_BASE_URL } from '@/constants/api';
import { formatPrice } from '@/utils/assets';

interface BreadCrumbIParams {
    segment: string;
    category: string;
    product: string;
}

const breadcrumbItems = ({ segment, category, product }: BreadCrumbIParams) => [
    {
        label: 'Home',
        href: '/{username}/{assetId}/print/sections',
    },
    {
        label: segment,
        href: '/{username}/{assetId}/print/sections/{sectionId}/categories',
    },
    {
        label: category,
        href: '/{username}/{assetId}/print/sections/{sectionId}/categories/{categoryId}/products',
    },
    {
        label: product,
    },
];

interface PrintProductProps {
    params: {
        username: string;
        assetId: string;
        sectionId: string;
        categoryId: string;
        productId: string;
    };
}

export default function PrintProductDetails({ params }: PrintProductProps) {
    const [product, setProduct] = useState<Products | null>(null);
    const [catalog, setCatalog] = useState<Catalog | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            const productsRequest = await fetch(PRODUCTS_BASE_URL);
            const products = await productsRequest.json();

            const data = products.find((item: Products) => item.productId === params.productId);
            setProduct(data);
        };

        const fetchCatalog = async () => {
            const catalogRequest = await fetch(CATALOG_BASE_URL);
            const data: Catalog = await catalogRequest.json();

            setCatalog(data);
        };

        Promise.all([fetchProduct(), fetchCatalog()]).then(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Breadcrumb
                items={breadcrumbItems({
                    segment: catalog?.sections.find((item) => item.sectionId === params.sectionId)!.title || '',
                    category: catalog?.categories.find((item) => item.categoryId === params.categoryId)!.title || '',
                    product: product?.title || '',
                })}
                params={params}
            />

            <Box mt={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} lg={6}>
                        <ProductCarousel />
                    </Grid>

                    <Grid item xs={12} sm={12} lg={6}>
                        <Box display="flex" alignItems="center" mt={2}>
                            <Chip label="In Stock" color="success" size="small" />
                            <Typography color="textSecondary" variant="caption" ml={1} textTransform="capitalize">
                                {product?.categoryId}
                            </Typography>
                        </Box>

                        <Typography fontWeight="600" variant="h4" mt={2}>
                            {product?.title}
                        </Typography>
                        <Typography variant="subtitle2" mt={1}>
                            {product?.description}
                        </Typography>

                        <Typography mt={2} variant="h3" fontWeight={600}>
                            {formatPrice({ price: product?.price || 0, withUS: true, decimals: true })}
                        </Typography>

                        <Grid container spacing={2} mt={3}>
                            <Grid item xs={12} lg={4} md={6}>
                                <Button color="primary" size="large" fullWidth variant="contained">
                                    Buy Now
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
