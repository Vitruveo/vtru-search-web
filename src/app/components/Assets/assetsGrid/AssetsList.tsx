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
import { useToggle } from '@/app/hooks/useToggle';
import { getAssetsIdsFromURL } from '@/utils/url-assets';

interface Props {
    onClick: (event: React.SyntheticEvent | Event) => void;
}

const isAssetAvailable = (asset: Asset) => {
    const { nft } = asset.licenses;

    switch (nft.editionOption) {
        case 'elastic':
            return nft.elastic.numberOfEditions > 0
        case 'single':
            return true;
        case 'unlimited':
            return true;
        default:
            return false;
    }
}

const getAssetPrice = (asset: Asset) => {
    const { nft } = asset.licenses;

    switch (nft.editionOption) {
        case 'elastic':
            return '$' + nft.elastic.editionPrice;
        case 'single':
            return '$' + nft.single.editionPrice;
        case 'unlimited':
            return '$' + nft.unlimited.editionPrice;
        default:
            return 'N/A';
    }
}

const AssetsList = ({ onClick }: Props) => {
    const dispatch = useDispatch();
    const { language } = useI18n();
    const [assetView, setAssetView] = useState<any>();
    const [selected, setSelected] = useState<Asset[]>([]);

    const { isActive: isDrawerOpen, activate: openDrawer, deactivate: closeDrawer } = useToggle();
    const { isActive: isCurateChecked, activate: checkCurateStack, toggle: toggleCurateStack } = useToggle();
    const { isActive: isDrawerStackOpen, activate: openDrawerStack, deactivate: closeDrawerStack } = useToggle();

    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
    const totalPage = useSelector((state: AppState) => state.assets.data.totalPage);
    const assets = useSelector((state: AppState) => state.assets.data.data);
    const isLoading = useSelector((state: AppState) => state.assets.loading);

    useEffect(() => {
        const idsFromURL = getAssetsIdsFromURL();
        
        if (idsFromURL?.length && idsFromURL[0] == '') {
            return;
        }

        if (idsFromURL) {
            checkCurateStack();
            setSelected(assets.filter((asset) => idsFromURL.includes(asset._id)));
        }
    }, []);

    const openAssetDrawer = (asset: Asset) => {
        setAssetView(asset);
        openDrawer();
    };

    const handleAssetImageClick = (asset: Asset) => {
        if (isCurateChecked) {
            handleCheckCurate(asset);
            return;
        }

        openAssetDrawer(asset);
        dispatch(actions.loadCreator({ assetId: asset._id }));
    };

    const handleChangePage = ({ page }: { page: number }) => {
        dispatch(actions.loadAssets({ page }));
    };

    const handleCheckCurate = (asset: Asset) => {
        const isSelected = selected.some((item) => item._id === asset._id);

        if (isSelected) {
            setSelected((prevSelected) => {
                const updatedSelection = prevSelected.filter((item) => item._id !== asset._id);
                return updatedSelection;
            });
        } else {
            setSelected((prevSelected) => {
                const updatedSelection = [...prevSelected, asset];
                return updatedSelection;
            });
        }
    };

    const iconColor = selected.length > 0 ? '#763EBD' : 'currentColor';

    return (
        <Box>
            <DrawerAsset
                assetView={assetView}
                drawerOpen={isDrawerOpen}
                onClose={() => {
                    closeDrawer();
                    setAssetView(undefined);
                }}
            />

            <DrawerStack
                selected={selected}
                drawerStackOpen={isDrawerStackOpen}
                onRemove={(asset) => setSelected(selected.filter((item) => item._id !== asset._id))}
                onClose={closeDrawerStack}
            />

            <Stack direction="row" justifyContent="space-between" alignItems="center" p={3}>
                {!lgUp && (
                    <Fab onClick={onClick} color="primary" size="small">
                        <IconMenu2 width="16" />
                    </Fab>
                )}
                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                        <Switch onChange={toggleCurateStack} checked={isCurateChecked} />
                        <Typography variant={lgUp ? 'h4' : 'h5'}>
                            {language['search.assetList.curateStack'] as string}
                        </Typography>
                    </Box>
                    {isCurateChecked && (
                        <Box
                            sx={{ cursor: 'pointer' }}
                            display="flex"
                            alignItems="center"
                            gap={1}
                            onClick={openDrawerStack}
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
                                <AssetItem
                                    isAvailable={isAssetAvailable(asset)}
                                    assetView={assetView}
                                    asset={asset}
                                    isCurated={isCurateChecked}
                                    checkedCurate={selected.some((item) => item._id === asset._id)}
                                    handleChangeCurate={() => {
                                        handleCheckCurate(asset);
                                    }}
                                    handleClickImage={() => {
                                        handleAssetImageClick(asset);
                                    }}
                                    price={getAssetPrice(asset)}
                                />
                            </Grid>
                        ))}
                    </>
                ) : isLoading ? (
                    [...Array(3)].map((_, index) => (
                        <Grid
                            key={index}
                            item
                            xl={3}
                            lg={4}
                            md={4}
                            sm={6}
                            xs={12}
                            display="flex"
                            alignItems="stretch"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Skeleton variant="rectangular" width={250} height={250} />
                        </Grid>
                    ))
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
