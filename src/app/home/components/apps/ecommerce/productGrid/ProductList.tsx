import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
    Avatar,
    Pagination,
    Box,
    Button,
    CardContent,
    Fab,
    Grid,
    Rating,
    Skeleton,
    Typography,
    Stack,
    useMediaQuery,
    Drawer,
    Switch,
    Checkbox,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { IconCopy, IconMenu2, IconTrash } from '@tabler/icons-react';

import { fetchProducts, filterReset } from '@/features/ecommerce/slice';
import { list } from '@/services/apiEventSource';
import { ecoCard } from '@/mock/assets';
import { useDispatch } from '@/store/hooks';
import emptyCart from 'public/images/products/empty-shopping-cart.svg';
import BlankCard from '../../../shared/BlankCard';
import AlertCart from '../productCart/AlertCart';
import { Asset } from './types';

interface Props {
    onClick: (event: React.SyntheticEvent | Event) => void;
}

type AssetList = { [key: string]: Asset };

const ProductList = ({ onClick }: Props) => {
    const [assets, setAssets] = useState<AssetList>({});
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [assetView, setAssetView] = useState<any>();
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [drawerSelectedOpen, setDrawerSelectedOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<string[]>([]);
    const [isCurated, setIsCurated] = useState<boolean>(false);

    const dispatch = useDispatch();
    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        // scrol to top behavior
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }, [currentPage]);

    const [cartalert, setCartalert] = React.useState(false);
    const [isLoading, setLoading] = React.useState(true);

    const handleClick = () => {
        setCartalert(true);
    };

    const handleClickImage = (asset: any) => {
        setAssetView(asset);
        setDrawerOpen(true);
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

    const perPage = 24;
    const assetsList = ecoCard.slice((currentPage - 1) * perPage, currentPage * perPage);

    return (
        <Box>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => {
                    setDrawerOpen(false);
                    setAssetView(undefined);
                }}
            >
                <Box p={4}>
                    {assetView ? (
                        <Image
                            src={`${assetView.formats.preview.path}`}
                            width={400}
                            height={300}
                            style={{
                                borderRadius: 10,
                                objectFit: 'cover',
                            }}
                            alt="Art preview"
                        />
                    ) : (
                        <Skeleton variant="rectangular" width={300} height={300} />
                    )}

                    <Typography variant="h4" mt={2}>
                        {assetView?.title}
                    </Typography>
                    <Box mt={3} mb={3} display="flex" alignItems="center" gap={1}>
                        <Avatar />
                        <Typography>@Loas Zarg</Typography>
                    </Box>
                    <Box mb={3}>
                        <Typography variant="h6">Description</Typography>
                        <Typography maxWidth={400}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit accusamus nesciunt vel
                            natus. Ipsam amet consectetur, qui animi sed optio! Ducimus dignissimos odio deleniti velit
                            eos cum molestias ad aperiam.
                        </Typography>
                    </Box>
                    <Button fullWidth variant="contained">
                        View
                    </Button>
                </Box>
            </Drawer>

            <Drawer
                anchor="right"
                open={drawerSelectedOpen}
                onClose={() => {
                    setDrawerSelectedOpen(false);
                }}
            >
                <Box width={400} p={4}>
                    <Button fullWidth variant="contained" disabled={selected.length === 0}>
                        Publish Stack
                    </Button>

                    <Box mt={2} display="flex" gap={2} flexWrap="wrap">
                        {selected.length === 0 && <Typography>No selected assets</Typography>}
                        {selected.map((asset) => (
                            <Box position="relative" key={asset._id}>
                                <Image src={`${asset.formats.preview.path}`} alt="img" width={160} height={160} />
                                <Box sx={{ position: 'absolute', bottom: 0, right: 0, zIndex: 1 }}>
                                    <IconTrash
                                        cursor="pointer"
                                        color="red"
                                        width={20}
                                        onClick={() => {
                                            setSelected(selected.filter((item) => item._id !== asset._id));
                                        }}
                                    />
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Drawer>
            {/* ------------------------------------------- */}
            {/* Header Detail page */}
            {/* ------------------------------------------- */}
            <Stack direction="row" justifyContent="space-between" pb={3}>
                {lgUp ? (
                    <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <Switch onChange={() => setIsCurated(!isCurated)} />
                            <Typography variant="h4">Curate Stack</Typography>
                        </Box>
                        {isCurated && (
                            <Box
                                sx={{ cursor: 'pointer' }}
                                display="flex"
                                alignItems="center"
                                gap={1}
                                onClick={() => setDrawerSelectedOpen(true)}
                            >
                                <Typography variant="h4">{selected.length} selected</Typography>

                                <IconCopy width={20} />
                            </Box>
                        )}
                    </Box>
                ) : (
                    <Fab onClick={onClick} color="primary" size="small">
                        <IconMenu2 width="16" />
                    </Fab>
                )}
            </Stack>

            {/* ------------------------------------------- */}
            {/* Page Listing product */}
            {/* ------------------------------------------- */}
            <Grid
                container
                spacing={3}
                paddingBlock={4}
                sx={{
                    overflow: 'auto',
                    maxHeight: '85vh',
                }}
            >
                {assetsList.length > 0 ? (
                    <>
                        {assetsList.map((asset) => (
                            <Grid item xs={12} lg={3} md={6} sm={6} display="flex" alignItems="stretch" key={asset._id}>
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
                                    <Box
                                        sx={{
                                            border: assetView === asset ? '1px solid #3c8084' : '',
                                        }}
                                    >
                                        <BlankCard className="hoverCard">
                                            {isCurated && (
                                                <Box sx={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
                                                    <Checkbox
                                                        checked={selected.some((item) => item._id === asset._id)}
                                                        onChange={(e) => {
                                                            setSelected(
                                                                e.target.checked
                                                                    ? [...selected, asset]
                                                                    : selected.filter((item) => item._id !== asset._id)
                                                            );
                                                        }}
                                                    />
                                                </Box>
                                            )}
                                            <Typography
                                                onClick={() => {
                                                    if (isCurated) {
                                                        setSelected(
                                                            selected.some((item) => item._id === asset._id)
                                                                ? selected.filter((item) => item._id !== asset._id)
                                                                : [...selected, asset]
                                                        );
                                                        return;
                                                    }
                                                    handleClickImage(asset);
                                                }}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <Image
                                                    src={`${asset.formats.preview.path}`}
                                                    alt="img"
                                                    width={250}
                                                    height={250}
                                                    style={{ width: '100%' }}
                                                />
                                            </Typography>

                                            <CardContent sx={{ p: 3, pt: 2 }}>
                                                <Typography
                                                    variant="h6"
                                                    onClick={() => handleClickImage(asset)}
                                                    sx={{ cursor: 'pointer' }}
                                                >
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
                                                    </Stack>
                                                    <Rating name="read-only" size="small" value={5} readOnly />
                                                </Stack>
                                            </CardContent>
                                        </BlankCard>
                                    </Box>
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

                <Box mt={3} display="flex" justifyContent="center" width="100%">
                    <Pagination
                        count={
                            ecoCard.length % perPage === 0
                                ? Math.floor(ecoCard.length / perPage)
                                : Math.floor(ecoCard.length / perPage) + 1
                        }
                        onChange={(event, value) => setCurrentPage(value)}
                        color="primary"
                        size="large"
                        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
                    />
                </Box>
            </Grid>
        </Box>
    );
};

export default ProductList;
