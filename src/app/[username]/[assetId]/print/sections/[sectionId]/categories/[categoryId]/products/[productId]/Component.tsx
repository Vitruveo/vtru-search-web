'use client';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Select from 'react-select';
import axios from 'axios';

// components
import ProductCarousel from '@/app/components/Store/components/PanelMint/PrintLicense/ecommerce/productDetail/ProductCarousel';
import { Breadcrumb } from '@/app/components/Breadcrumb';
import { Catalog, ProductItem, Products } from '../../../../../types';
import { API_BASE_URL, CATALOG_ASSETS_BASE_URL, CATALOG_BASE_URL } from '@/constants/api';
import { formatPrice } from '@/utils/assets';
import { Asset } from '@/features/assets/types';
import { getProductsImages, getProductsPlaceholders } from '../../../../../utils';
import * as actionsAssets from '@/features/assets/slice';
import { useSelector } from '@/store/hooks';
import { useDomainContext } from '@/app/context/domain';
import { NO_IMAGE_ASSET } from '@/constants/asset';

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

interface VariantSelectProps {
    title: string;
    variants: { label: { label: string; image: string }; value: string }[];
    mb?: number;
    onChange: (selectedOption: string) => void;
}

const VariantSelect = ({ title, variants, onChange, mb = 1 }: VariantSelectProps) => {
    const theme = useTheme();
    const [imageValidity, setImageValidity] = useState<{ [key: string]: boolean }>({});

    const options = variants.map((variant) => ({
        value: variant.value,
        label: (
            <Box display="flex" alignItems="center">
                <Image
                    src={imageValidity[variant.value] ? variant.label.image : NO_IMAGE_ASSET}
                    alt={variant.label.label}
                    width={28}
                    height={28}
                    style={{ marginRight: 10 }}
                    onLoad={() => setImageValidity((prev) => ({ ...prev, [variant.value]: false }))}
                    onError={() => setImageValidity((prev) => ({ ...prev, [variant.value]: false }))}
                />
                <Typography>{variant.label.label}</Typography>
            </Box>
        ),
    }));

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={mb}>
            <Typography variant="h4" fontWeight={600} fontSize={22}>
                {title}:
            </Typography>
            <Select
                options={options}
                defaultValue={options[0]}
                onChange={(selectedOption) => onChange(selectedOption!.value)}
                isSearchable={false}
                styles={{
                    control: (base, state) => ({
                        ...base,
                        borderColor: state.isFocused ? theme.palette.primary.main : theme.palette.grey[200],
                        backgroundColor: theme.palette.background.paper,
                        boxShadow: '#FF0066',
                        '&:hover': { borderColor: '#FF0066' },
                    }),
                    menu: (base) => ({
                        ...base,
                        zIndex: 1000,
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.background.paper,
                    }),
                    singleValue: (base) => ({
                        ...base,
                        color: theme.palette.text.primary,
                    }),
                    option: (base, state) => ({
                        ...base,
                        color: theme.palette.text.primary,
                        backgroundColor: state.isFocused ? theme.palette.action.hover : 'transparent',
                        '&:hover': { backgroundColor: theme.palette.action.hover },
                    }),
                    input: (base) => ({
                        ...base,
                        color: theme.palette.text.primary,
                    }),
                }}
            />
        </Box>
    );
};

interface PrintProductProps {
    params: {
        username: string;
        assetId: string;
        sectionId: string;
        categoryId: string;
        productId: string;
    };
    definition: keyof Omit<Products, 'any'>;
    stackId?: string;
}

interface PrintPrice {
    comission: number;
    artworkLicense: number;
    platfromFee: number;
    merchandiseFee: number;
    merchandiseWithDiscount: number;
    shipping: number;
    total: number;
    discountBasisPoints: number;
}

export default function PrintProductDetails({ params, definition, stackId }: PrintProductProps) {
    const dispatch = useDispatch();
    const { subdomain, isValidSubdomain } = useDomainContext();
    const { _id: folioId } = useSelector((state) => state.stores.currentDomain);

    const [product, setProduct] = useState<ProductItem | null>(null);
    const [catalog, setCatalog] = useState<Catalog | null>(null);
    const [asset, setAsset] = useState<Asset | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [variants, setVariants] = useState<{ label: { label: string; image: string }; value: string }[]>([]);
    const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
    const [printPrices, setPrintPrices] = useState<PrintPrice>({
        comission: 0,
        artworkLicense: 0,
        platfromFee: 0,
        merchandiseFee: 0,
        merchandiseWithDiscount: 0,
        shipping: 0,
        total: 0,
        discountBasisPoints: 0,
    });

    const [loadingProduct, setLoadingProduct] = useState(true);
    const [loadingProductAsset, setLoadingAsset] = useState(true);

    const handleSetProduct = (products: ProductItem[]) => {
        const newProducts = products.find((item: ProductItem) => item.productId === params.productId);
        setProduct(newProducts || null);
    };

    const handleVariantChange = useCallback((selectedOption: string) => {
        setSelectedVariant(selectedOption);
    }, []);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/assets/public/print/price/${params.assetId}`, {
                    params: {
                        categoryId: params.categoryId,
                        productId: params.productId,
                        ...(isValidSubdomain && subdomain && folioId && { folioId }),
                        ...(stackId && { stackId }),
                    },
                });
                setPrintPrices(response.data.data);
            } catch (error) {
                setPrintPrices({
                    comission: 0,
                    artworkLicense: 0,
                    platfromFee: 0,
                    merchandiseFee: 0,
                    merchandiseWithDiscount: 0,
                    shipping: 0,
                    total: 0,
                    discountBasisPoints: 0,
                });
            }
        };
        fetchPrices();
    }, [params.assetId, params.categoryId, params.productId, stackId, folioId]);

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

            const products = [...catalogData.products[definition], ...catalogData.products.any];

            const productSelected = products.find((item) => item.productId === params.productId);

            if (productSelected?.variants) {
                setVariants(
                    productSelected?.variants.map((item) => ({
                        label: {
                            label: item.title,
                            image: `https://vitruveo-projects.s3.amazonaws.com/Xibit/assets/${item.productId}/${item.image.replace(/^~\//, '')}`,
                        },
                        value: item.vendorProductId,
                    }))
                );
                setSelectedVariant(productSelected?.variants?.[0]?.productId || null);
            }

            const imagesPlaceholders = getProductsPlaceholders({ products, definition });

            handleSetProduct(imagesPlaceholders);
            setLoadingProduct(false);

            const imgProducts = await getProductsImages({ assetId: params.assetId, products, definition });

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

    const handleSubmitPayment = () => {
        if (!product) return;

        dispatch(
            actionsAssets.actions.payment({
                assetId: params.assetId,
                productId: product.productId,
                folioId: !!isValidSubdomain && !!subdomain ? folioId : null,
                stackId,
                variant: selectedVariant,
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
                                <PriceInfo title="Artwork License:" price={printPrices.artworkLicense} />
                                <PriceInfo
                                    title="Merchandise Fee:"
                                    price={printPrices.merchandiseFee}
                                    strikethrough={printPrices.discountBasisPoints > 0}
                                />
                                {printPrices.discountBasisPoints > 0 && (
                                    <PriceInfo
                                        title={`Discounted Price (${printPrices.discountBasisPoints / 100}%):`}
                                        price={printPrices.merchandiseWithDiscount}
                                    />
                                )}
                                {variants && variants.length > 0 && (
                                    <VariantSelect title="Variant" variants={variants} onChange={handleVariantChange} />
                                )}
                                <PriceInfo title="Platform Fee:" price={printPrices.platfromFee} />
                                <PriceInfo title="Shipping:" price={printPrices.shipping} mb={4} />
                                <PriceInfo title="Total:" price={printPrices.total} mb={4} />
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
