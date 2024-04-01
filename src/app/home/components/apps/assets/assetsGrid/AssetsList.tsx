import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import {
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
    Switch,
    Checkbox,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { IconCopy } from '@tabler/icons-react';

import emptyCart from 'public/images/products/empty-shopping-cart.svg';
import { filterReset } from '@/features/ecommerce/slice';
import { useDispatch } from '@/store/hooks';
import { RootState } from '@/store/rootReducer';
import { actions } from '@/features/assets';
import { Asset } from '@/features/assets/types';
import BlankCard from '@/app/home/components/shared/BlankCard';
import { DrawerAsset } from '../components/DrawerAsset';
import { DrawerStack } from '../components/DrawerStack';

interface Props {
    onClick: (event: React.SyntheticEvent | Event) => void;
}

const AssetsList = ({ onClick }: Props) => {
    const dispatch = useDispatch();

    const [assetView, setAssetView] = useState<any>();
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [drawerStackOpen, setDrawerStackOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<Asset[]>([]);
    const [isCurated, setIsCurated] = useState<boolean>(false);
    const [isLoading, setLoading] = React.useState(true);

    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
    const totalPage = useSelector((state: RootState) => state.assets.data.totalPage);
    const assets = useSelector((state: RootState) => state.assets.data.data);

    const iconColor = selected.length > 0 ? '#763EBD' : 'currentColor';

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleClickImage = (asset: any) => {
        setAssetView(asset);
        setDrawerOpen(true);
    };

    const handleChangePage = ({ page }: { page: number }) => {
        dispatch(actions.loadAssets({ page }));
    };

    return (
        <Box>
            <DrawerAsset
                assetView={assetView}
                drawerOpen={drawerOpen}
                onClose={() => {
                    setDrawerOpen(false);
                    setAssetView(undefined);
                }}
            />

            <DrawerStack
                selected={selected}
                drawerStackOpen={drawerStackOpen}
                onRemove={(asset) => setSelected(selected.filter((item) => item._id !== asset._id))}
                onClose={() => setDrawerStackOpen(false)}
            />

            <Stack direction="row" justifyContent="space-between" p={3}>
                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                        <Switch onChange={() => setIsCurated(!isCurated)} />
                        <Typography variant={lgUp ? "h4" : "h5"}>Curate Stack</Typography>
                    </Box>
                    {isCurated && (
                        <Box
                            sx={{ cursor: 'pointer' }}
                            display="flex"
                            alignItems="center"
                            gap={1}
                            onClick={() => setDrawerStackOpen(true)}
                        >
                            {lgUp && <Typography variant="h4">{selected.length} selected</Typography>}

                            <IconCopy width={20} color={iconColor} />
                        </Box>
                    )}
                </Box>
            </Stack>

            <Grid
                container
                spacing={3}
                padding={3}
                pr={0}
                sx={{
                    overflow: 'auto',
                    maxHeight: '85vh',
                }}
            >
                {assets.length > 0 ? (
                    <>
                        {assets.map((asset) => (
                            <Grid item xs={12} lg={3} md={6} sm={6} display="flex" alignItems="stretch" key={asset._id}>
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
                                            {isCurated ? (
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
                                            ) : (
                                                <></>
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
                                                    src={`https://vitruveo-studio-qa-assets.s3.amazonaws.com/${asset?.formats?.preview?.path}`}
                                                    alt="img"
                                                    width={250}
                                                    height={250}
                                                />
                                            </Typography>

                                            <CardContent sx={{ p: 3, pt: 2 }}>
                                                <Typography
                                                    variant="h6"
                                                    onClick={() => handleClickImage(asset)}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    {asset?.assetMetadata?.context?.formData?.title}
                                                </Typography>
                                                <Stack
                                                    direction="row"
                                                    alignItems="center"
                                                    justifyContent="space-between"
                                                    mt={1}
                                                >
                                                    <Stack direction="row" alignItems="center">
                                                        <Typography variant="h6">$ 0.00</Typography>
                                                    </Stack>
                                                    <Rating name="read-only" size="small" value={5} readOnly />
                                                </Stack>
                                            </CardContent>
                                        </BlankCard>
                                    </Box>
                                )}
                            </Grid>
                        ))}
                    </>
                ) : (
                    <>
                        <Grid item xs={12} lg={12} md={12} sm={12}>
                            <Box textAlign="center" mt={6}>
                                <Image src={emptyCart} alt="cart" width={200} />
                                <Typography variant="h2">There is no Asset</Typography>
                                <Typography variant="h6" mb={3}>
                                    The Asset you are searching is no longer available.
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
                        count={totalPage}
                        onChange={(event, value) => handleChangePage({ page: value })}
                        color="primary"
                        size="large"
                        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
                    />
                </Box>
            </Grid>
        </Box>
    );
};

export default AssetsList;
