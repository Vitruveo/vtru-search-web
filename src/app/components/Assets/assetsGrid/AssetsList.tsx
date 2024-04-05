import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { Pagination, Box, Fab, Grid, Skeleton, Typography, Stack, useMediaQuery, Switch, Badge } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { IconCopy, IconMenu2 } from '@tabler/icons-react';
import { useI18n } from '@/app/hooks/useI18n';

import './AssetScroll.css';

import emptyCart from 'public/images/products/empty-shopping-cart.svg';
import { AppState } from '@/store';
import { useDispatch } from '@/store/hooks';
import { actions } from '@/features/assets';
import { Asset } from '@/features/assets/types';
import { DrawerAsset } from '../components/DrawerAsset';
import { DrawerStack } from '../components/DrawerStack';
import AssetItem from './AssetItem';

interface Props {
    onClick: (event: React.SyntheticEvent | Event) => void;
}

const AssetsList = ({ onClick }: Props) => {
    const dispatch = useDispatch();
    const { language } = useI18n();

    const [assetView, setAssetView] = useState<any>();
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [drawerStackOpen, setDrawerStackOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<Asset[]>([]);
    const [isCurated, setIsCurated] = useState<boolean>(false);
    const [isLoading, setLoading] = React.useState(true);

    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
    const totalPage = useSelector((state: AppState) => state.assets.data.totalPage);
    const assets = useSelector((state: AppState) => state.assets.data.data);

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
        dispatch(actions.loadCreator({ assetId: asset._id }));
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

            <Stack direction="row" justifyContent="space-between" alignItems="center" p={3}>
                {!lgUp && (
                    <Fab onClick={onClick} color="primary" size="small">
                        <IconMenu2 width="16" />
                    </Fab>
                )}
                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                        <Switch onChange={() => setIsCurated(!isCurated)} />
                        <Typography variant={lgUp ? 'h4' : 'h5'}>
                            {language['search.assetList.curateStack'] as string}
                        </Typography>
                    </Box>
                    {isCurated && (
                        <Box
                            sx={{ cursor: 'pointer' }}
                            display="flex"
                            alignItems="center"
                            gap={1}
                            onClick={() => setDrawerStackOpen(true)}
                        >
                            {lgUp && (
                                <>
                                    <Typography variant="h4">
                                        {selected.length} {language['search.assetList.curateStack.selected'] as string}
                                    </Typography>
                                    <IconCopy width={20} />
                                </>
                            )}

                            {!lgUp && (
                                <Badge badgeContent={selected.length} color="primary">
                                    <IconCopy width={20} color={iconColor} />
                                </Badge>
                            )}
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
                            <Grid
                                item
                                xl={3}
                                lg={4}
                                md={4}
                                sm={6}
                                xs={12}
                                display="flex"
                                alignItems="stretch"
                                key={asset._id}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
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
                                    <AssetItem
                                        assetView={assetView}
                                        asset={asset}
                                        isCurated={isCurated}
                                        checkedCurate={selected.some((item) => item._id === asset._id)}
                                        handleChangeCurate={(e) => {
                                            setSelected(
                                                e.target.checked
                                                    ? [...selected, asset]
                                                    : selected.filter((item) => item._id !== asset._id)
                                            );
                                        }}
                                        handleClickImage={() => {
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
                                    />
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
                            </Box>
                        </Grid>
                    </>
                )}

                <Box mt={3} mb={4} display="flex" justifyContent="center" width="100%">
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
