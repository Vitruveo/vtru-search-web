'use client';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';

// components
import ProductCarousel from '@/app/components/Store/components/PanelMint/PrintLicense/ecommerce/productDetail/ProductCarousel';
import { Breadcrumb } from '@/app/components/Breadcrumb';
import { Catalog, Config, ProductItem, Products } from '../../../../../types';
import { API_BASE_URL, CATALOG_ASSETS_BASE_URL, CATALOG_BASE_URL } from '@/constants/api';
import { formatPrice } from '@/utils/assets';
import { Asset } from '@/features/assets/types';
import { getProductsImages, getProductsPlaceholders } from '../../../../../utils';
import * as actionsAssets from '@/features/assets/slice';
import { useSelector } from '@/store/hooks';
import { useDomainContext } from '@/app/context/domain';

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
    strikethrough?: boolean;
}

const PriceInfo = ({ title, price, mb = 1, strikethrough = false }: PriceInfoProps) => (
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={mb}>
        <Typography
            variant="h4"
            fontWeight={600}
            style={strikethrough ? { fontSize: 22, textDecoration: 'line-through' } : { fontSize: 22 }}
        >
            {title}
        </Typography>
        <Typography
            variant="h4"
            fontWeight={600}
            style={strikethrough ? { fontSize: 22, textDecoration: 'line-through' } : { fontSize: 22 }}
        >
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
    definition: keyof Products;
    stackId?: string;
    stackFees?: number;
}

export default function PrintProductDetails({ params, definition, stackId, stackFees }: PrintProductProps) {
    const dispatch = useDispatch();
    const { subdomain, isValidSubdomain } = useDomainContext();
    const { _id: folioId, organization } = useSelector((state) => state.stores.currentDomain);

    const [product, setProduct] = useState<ProductItem | null>(null);
    const [catalog, setCatalog] = useState<Catalog | null>(null);
    const [config, setConfig] = useState<Config | null>(null);
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
            const catalogResponse = await fetch(CATALOG_BASE_URL);
            const catalogData: Catalog = await catalogResponse.json();
            setCatalog(catalogData);
            setConfig(catalogData.config);

            const products = catalogData.products[definition] || {};

            const imagesPlaceholders = getProductsPlaceholders({ products: products });

            handleSetProduct(imagesPlaceholders);
            setLoadingProduct(false);

            const imgProducts = await getProductsImages({ assetId: params.assetId, products });

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

        const folioMarkup = subdomain && isValidSubdomain ? organization?.markup / 100 || 0 : 0;
        const stackMarkup = stackFees ? stackFees / 100 : 0;
        const comission = 1 + (folioMarkup + stackMarkup);

        if (params.categoryId === 'mugs') {
            return asset.licenses.print.merchandisePrice * comission;
        }

        if (params.categoryId === 'frames' || params.categoryId === 'posters') {
            return (
                ((product.area * asset.licenses.print.merchandisePrice * (asset.licenses.print.multiplier * 100)) /
                    10_000) *
                comission
            );
        }

        return 0;
    }, [asset, catalog, isValidSubdomain, organization?.markup, params.categoryId, product, subdomain, stackFees]);

    const platformFee = useMemo(() => artworkLicense * 0.02, [artworkLicense]);
    const merchandise = useMemo(
        () => (!product ? 0 : (product.price / 100) * (1 + (config?.markup || 0) / 10_000)),
        [product]
    );
    const merchandiseWithDiscount = useMemo(() => {
        if (!product) return 0;

        const productPrice = product.price / 100;
        const discounted = productPrice * ((10_000 - (config?.discount || 0)) / 10_000);

        return discounted * 1.2;
    }, [product, config?.discount]);
    const shipping = useMemo(() => (!product ? 0 : (config?.shipping || 0) / 100), [product]);

    const handleSubmitPayment = () => {
        if (!product) return;

        dispatch(
            actionsAssets.actions.payment({
                assetId: params.assetId,
                productId: product.productId,
                folioId: !!isValidSubdomain && !!subdomain ? folioId : null,
                stackId,
            })
        );
    };

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
                        <Typography fontWeight="600" variant="h2">
                            {product.title}
                        </Typography>
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            alignItems={'center'}
                            width="100%"
                            maxWidth={700}
                        >
                            <Box bgcolor="rgba(0,0,0,0.6)" width="100%" p={3} mt={4}>
                                <PriceInfo title="Artwork License:" price={artworkLicense} />
                                <PriceInfo
                                    title="Merchandise Fee:"
                                    price={merchandise}
                                    strikethrough={config?.discount ? config.discount > 0 : false}
                                />
                                {config?.discount && config.discount > 0 && (
                                    <PriceInfo
                                        title={`Discounted Price (${config.discount / 100}%):`}
                                        price={merchandiseWithDiscount}
                                    />
                                )}
                                <PriceInfo title="Platform Fee:" price={platformFee} />
                                <PriceInfo title="Shipping:" price={shipping} mb={4} />
                                <PriceInfo
                                    title="Total:"
                                    price={
                                        artworkLicense +
                                        platformFee +
                                        shipping +
                                        (config?.discount && config.discount > 0
                                            ? merchandiseWithDiscount
                                            : merchandise)
                                    }
                                    mb={4}
                                />
                                <Typography variant="h4">*Store credit will be applied at checkout.</Typography>
                            </Box>

                            <Box width="50%" mt={4} mb={2}>
                                <Button
                                    color="primary"
                                    size="large"
                                    fullWidth
                                    variant="contained"
                                    onClick={handleSubmitPayment}
                                    style={{ fontSize: 32 }}
                                >
                                    Buy Now
                                </Button>
                            </Box>
                        </Box>

                        <HTMLRenderer html={description || ''} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
