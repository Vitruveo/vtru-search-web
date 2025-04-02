'use client';
import { useEffect, useMemo, useState } from 'react';
import { Box, Button, Chip, CircularProgress, Grid, Typography } from '@mui/material';

// components
import ProductCarousel from '@/app/components/Store/components/PanelMint/PrintLicense/ecommerce/productDetail/ProductCarousel';
import { Breadcrumb } from '@/app/components/Breadcrumb';
import { Catalog, Products } from '../../../../../types';
import { API_BASE_URL, CATALOG_BASE_URL, PRODUCTS_BASE_URL } from '@/constants/api';
import { formatPrice } from '@/utils/assets';
import { Asset } from '@/features/assets/types';

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

interface PriceInfoProps {
    title: string;
    price: number;
    mt?: number;
}

const PriceInfo = ({ title, price, mt = 2 }: PriceInfoProps) => (
    <Box display="flex" alignItems="center" justifyContent="space-between" mt={mt}>
        <Typography variant="h4" fontWeight={600}>
            {title}
        </Typography>
        <Typography variant="h4" fontWeight={600}>
            {formatPrice({
                price: price,
                withUS: true,
                decimals: true,
            })}
        </Typography>
    </Box>
);

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
    const [asset, setAsset] = useState<Asset | null>(null);

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

        const fetchAsset = async () => {
            const assetRequest = await fetch(`${API_BASE_URL}/assets/store/${params.assetId}`);
            const data: { data: Asset } = await assetRequest.json();

            setAsset(data.data);
        };

        Promise.all([fetchProduct(), fetchCatalog(), fetchAsset()]).then(() => setLoading(false));
    }, []);

    const artworkLicense = useMemo(() => {
        if (!asset) return 0;

        if (params.categoryId === 'mugs') {
            return asset.licenses.nft.single.editionPrice * 0.1;
        }

        if (params.categoryId === 'frames') {
            return asset.licenses.nft.single.editionPrice * 0.0008 * 600;
        }

        return 0;
    }, [asset]);

    const merchandiseFee = useMemo(() => (!product ? 0 : (product.price / 100) * 1.2), [product]);
    const platformFee = useMemo(() => (!asset ? 0 : asset.licenses.nft.single.editionPrice * 0.02), [asset]);
    const shipping = useMemo(() => (!product ? 0 : product.shipping / 100), [product]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
                <CircularProgress />
            </Box>
        );
    }

    if (!product || !catalog || !asset) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
                <Typography variant="h4">Product not found</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Breadcrumb
                items={breadcrumbItems({
                    segment: catalog.sections.find((item) => item.sectionId === params.sectionId)!.title || '',
                    category: catalog.categories.find((item) => item.categoryId === params.categoryId)!.title || '',
                    product: product.title || '',
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
                                {product.categoryId}
                            </Typography>
                        </Box>

                        <Typography fontWeight="600" variant="h4" mt={2}>
                            {product.title}
                        </Typography>
                        <Typography variant="subtitle2" mt={1}>
                            {product.description}
                        </Typography>

                        <Box bgcolor="rgba(0,0,0,0.6)" width="100%" maxWidth={700} p={3} mt={2}>
                            <PriceInfo title="Artwork License:" price={artworkLicense} />
                            <PriceInfo title="Merchandise Fee:" price={merchandiseFee} />
                            <PriceInfo title="Platform Fee:" price={platformFee} />
                            <PriceInfo title="Shipping:" price={shipping} />
                            <PriceInfo
                                title="Total:"
                                price={artworkLicense + merchandiseFee + platformFee + shipping}
                                mt={4}
                            />
                        </Box>

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
