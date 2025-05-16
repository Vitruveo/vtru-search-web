'use client';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Chip, CircularProgress, Grid, Typography } from '@mui/material';

// components
import ProductCarousel from '@/app/components/Store/components/PanelMint/PrintLicense/ecommerce/productDetail/ProductCarousel';
import { Breadcrumb } from '@/app/components/Breadcrumb';
import { Catalog, ProductItem, Products } from '../../../../../types';
import { API_BASE_URL, CATALOG_ASSETS_BASE_URL, CATALOG_BASE_URL, PRODUCTS_BASE_URL } from '@/constants/api';
import { formatPrice } from '@/utils/assets';
import { Asset } from '@/features/assets/types';
import { getProductsImages, getProductsPlaceholders } from '../../../../../utils';
import * as actionsAssets from '@/features/assets/slice';

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

interface HTMLRendererProps {
    html: string;
}

const HTMLRenderer = ({ html }: HTMLRendererProps) => {
    return <div dangerouslySetInnerHTML={{ __html: html }} style={{ maxWidth: 700, fontSize: 17, lineHeight: 1.5 }} />;
};

interface PriceInfoProps {
    title: string;
    price: number;
    mb?: number;
}

const PriceInfo = ({ title, price, mb = 1 }: PriceInfoProps) => (
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={mb}>
        <Typography variant="h4" fontWeight={600} style={{ fontSize: 22 }}>
            {title}
        </Typography>
        <Typography variant="h4" fontWeight={600} style={{ fontSize: 22 }}>
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
    const dispatch = useDispatch();

    const [product, setProduct] = useState<ProductItem | null>(null);
    const [catalog, setCatalog] = useState<Catalog | null>(null);
    const [asset, setAsset] = useState<Asset | null>(null);
    const [description, setDescription] = useState<string | null>(null);

    const [loadingProduct, setLoadingProduct] = useState(true);
    const [loadingProductAsset, setLoadingAsset] = useState(true);

    const handleSetProduct = (products: ProductItem[]) => {
        const newProducts = products.find((item: ProductItem) => item.productId === params.productId);
        setProduct(newProducts || null);
    };

    useEffect(() => {
        if (!product) return;

        fetch(`${CATALOG_ASSETS_BASE_URL}/${product.productId}/intro.html`)
            .then((response) => response.text())
            .then((text) => {
                setDescription(text);
            });
    }, [product]);

    useEffect(() => {
        const fetchProduct = async () => {
            const [catalogResponse, productsResponse] = await Promise.all([
                fetch(CATALOG_BASE_URL),
                fetch(PRODUCTS_BASE_URL),
            ]);

            const catalogData: Catalog = await catalogResponse.json();
            const products: Products = await productsResponse.json();

            setCatalog(catalogData);

            const imagesPlaceholders = getProductsPlaceholders({ products: products.vertical });

            handleSetProduct(imagesPlaceholders);
            setLoadingProduct(false);

            const imgProducts = await getProductsImages({ assetId: params.assetId, products: products.vertical });

            handleSetProduct(imgProducts);
        };

        const fetchAsset = async () => {
            const assetRequest = await fetch(`${API_BASE_URL}/assets/store/${params.assetId}`);
            const data: { data: Asset } = await assetRequest.json();
            setLoadingAsset(false);
            setAsset(data.data);
        };
        fetchAsset();
        fetchProduct();
    }, []);

    const artworkLicense = useMemo(() => {
        if (!asset || !product || !catalog) return 0;

        const section = catalog.sections.find((item) => item.sectionId === params.sectionId);
        if (!section) return 0;

        if (params.categoryId === 'mugs') {
            return asset.licenses.nft.single.editionPrice * section.priceMultiplier;
        }

        if (params.categoryId === 'frames' || params.categoryId === 'posters') {
            return asset.licenses.nft.single.editionPrice * section.priceMultiplier * product.area;
        }

        return 0;
    }, [asset, catalog]);

    const handleSubmitPayment = () => {
        if (!product) return;

        dispatch(actionsAssets.actions.payment({ assetId: params.assetId, productId: product.productId }));
    };

    const merchandiseFee = useMemo(() => (!product ? 0 : (product.price / 100) * 1.2), [product]);
    const platformFee = useMemo(() => (!asset ? 0 : asset.licenses.nft.single.editionPrice * 0.02), [asset]);
    const shipping = useMemo(() => (!product ? 0 : product.shipping / 100), [product]);

    if (loadingProduct || loadingProductAsset) {
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
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
            }}
        >
            <Breadcrumb
                items={breadcrumbItems({
                    segment: catalog.sections.find((item) => item.sectionId === params.sectionId)!.title || '',
                    category: catalog.categories.find((item) => item.categoryId === params.categoryId)!.title || '',
                    product: product.title || '',
                })}
                params={params}
            />

            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} lg={6}>
                        <ProductCarousel product={product} />
                    </Grid>

                    <Grid item xs={12} sm={12} lg={6}>
                        <Box display="flex" alignItems="center" mt={2}>
                            {/* <Chip label="In Stock" color="success" size="small" /> */}
                            <Typography
                                color="textSecondary"
                                variant="caption"
                                textTransform="capitalize"
                                style={{ fontSize: 17 }}
                            >
                                {product.categoryId}
                            </Typography>
                        </Box>

                        <Typography fontWeight="600" variant="h4" mt={2} style={{ fontSize: 17 }}>
                            {product.title}
                        </Typography>

                        <Box bgcolor="rgba(0,0,0,0.6)" width="100%" maxWidth={700} p={3} mt={2}>
                            <PriceInfo title="Artwork License:" price={artworkLicense} />
                            <PriceInfo title="Merchandise Fee:" price={merchandiseFee} />
                            <PriceInfo title="Platform Fee:" price={platformFee} />
                            <PriceInfo title="Shipping:" price={shipping} mb={4} />
                            <PriceInfo
                                title="Total:"
                                price={artworkLicense + merchandiseFee + platformFee + shipping}
                            />
                        </Box>

                        <Grid container spacing={2} mt={3}>
                            <Grid item xs={12} lg={4} md={6}>
                                <Button
                                    color="primary"
                                    size="large"
                                    fullWidth
                                    variant="contained"
                                    onClick={handleSubmitPayment}
                                    style={{ fontSize: 17 }}
                                >
                                    Buy Now
                                </Button>
                            </Grid>
                        </Grid>

                        <HTMLRenderer html={description || ''} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
