import React, { useEffect, useState } from 'react';
import { filter, orderBy } from 'lodash';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Theme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';
import { useSelector, useDispatch } from '@/store/hooks';
import { fetchProducts, addToCart, filterReset } from '@/features/ecommerce/slice';
import ProductSearch from './ProductSearch';
import { IconBasket, IconMenu2 } from '@tabler/icons-react';
import AlertCart from '../productCart/AlertCart';
import emptyCart from 'public/images/products/empty-shopping-cart.svg';
import BlankCard from '../../../shared/BlankCard';
import { ProductType } from '../../../../types/apps/eCommerce';
import Image from 'next/image';
import { list } from '@/services/apiEventSource';
import { Application } from '@/features/applications/types';
import { Asset } from './types';
import { ASSET_STORAGE_URL } from '@/constants/asset';
import { ecoCard } from '@/mock/assets';

interface Props {
    onClick: (event: React.SyntheticEvent | Event) => void;
}

type AssetList = { [key: string]: Asset };

const ProductList = ({ onClick }: Props) => {
    const [assets, setAssets] = useState<AssetList>({});

    const dispatch = useDispatch();
    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const [cartalert, setCartalert] = React.useState(false);
    const [isLoading, setLoading] = React.useState(true);

    const handleClick = () => {
        setCartalert(true);
    };

    const handleClose = (reason: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setCartalert(false);
    };

    const handleGetAssets = async () => {
        await list<Asset>({
            path: 'assets',
            callback: (asset) => {
                if (asset && asset.formats.preview)
                    setAssets((persistAssets) => ({ ...persistAssets, [asset._id]: asset }));
            },
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        handleGetAssets();
    }, []);

    const assetsList = Object.values(assets);

    console.log(assetsList);

    return (
        <Box>
            {/* ------------------------------------------- */}
            {/* Header Detail page */}
            {/* ------------------------------------------- */}
            <Stack direction="row" justifyContent="space-between" pb={3}>
                {lgUp ? (
                    <Typography variant="h5">Assets</Typography>
                ) : (
                    <Fab onClick={onClick} color="primary" size="small">
                        <IconMenu2 width="16" />
                    </Fab>
                )}
                <Box>
                    <ProductSearch />
                </Box>
            </Stack>

            {/* ------------------------------------------- */}
            {/* Page Listing product */}
            {/* ------------------------------------------- */}
            <Grid container spacing={3}>
                {ecoCard.length > 0 ? (
                    <>
                        {ecoCard.map((asset) => (
                            <Grid item xs={12} lg={2} md={6} sm={6} display="flex" alignItems="stretch" key={asset._id}>
                                {/* ------------------------------------------- */}
                                {/* Product Card */}
                                {/* ------------------------------------------- */}
                                {isLoading ? (
                                    <>
                                        <Skeleton
                                            variant="rectangular"
                                            width={270}
                                            height={300}
                                            sx={{
                                                borderRadius: (theme) => theme.shape.borderRadius / 5,
                                            }}
                                        ></Skeleton>
                                    </>
                                ) : (
                                    <BlankCard className="hoverCard">
                                        <Typography component={Link} href={`/home/shop/detail/${asset._id}`}>
                                            <Image
                                                src={`${asset.formats.preview.path}`}
                                                alt="img"
                                                width={250}
                                                height={250}
                                                style={{ width: '100%' }}
                                            />
                                        </Typography>
                                        {/* <Tooltip title="Add To Cart">
                                            <Fab
                                                size="small"
                                                color="primary"
                                                onClick={() => dispatch(addToCart(product)) && handleClick()}
                                                sx={{
                                                    bottom: '75px',
                                                    right: '15px',
                                                    position: 'absolute',
                                                }}
                                            >
                                                <IconBasket size="16" />
                                            </Fab>
                                        </Tooltip> */}
                                        <CardContent sx={{ p: 3, pt: 2 }}>
                                            <Typography variant="h6">
                                                {asset.assetMetadata.context.formData.title}
                                            </Typography>
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                mt={1}
                                            >
                                                <Stack direction="row" alignItems="center">
                                                    <Typography variant="h6">
                                                        {asset.licenses.nft.single.editionPrice}
                                                    </Typography>
                                                    {/* <Typography
                                                        color="textSecondary"
                                                        ml={1}
                                                        sx={{ textDecoration: 'line-through' }}
                                                    >
                                                        ${product.salesPrice}
                                                    </Typography> */}
                                                </Stack>
                                                <Rating name="read-only" size="small" value={5} readOnly />
                                            </Stack>
                                        </CardContent>
                                    </BlankCard>
                                )}
                                <AlertCart handleClose={handleClose} openCartAlert={cartalert} />
                                {/* ------------------------------------------- */}
                                {/* Product Card */}
                                {/* ------------------------------------------- */}
                            </Grid>
                        ))}
                    </>
                ) : (
                    <>
                        <Grid item xs={12} lg={12} md={12} sm={12}>
                            <Box textAlign="center" mt={6}>
                                <Image src={emptyCart} alt="cart" width={200} />
                                <Typography variant="h2">There is no Product</Typography>
                                <Typography variant="h6" mb={3}>
                                    The Product you are searching is no longer available.
                                </Typography>
                                <Button variant="contained" onClick={() => dispatch(filterReset())}>
                                    Try Again
                                </Button>
                            </Box>
                        </Grid>
                    </>
                )}
            </Grid>
        </Box>
    );
};

export default ProductList;
