import React, { useEffect, useState } from 'react';
import { useSelector } from '@/store/hooks';
import Image from 'next/image';
import { Pagination, Box, Grid, Skeleton, Typography, Stack, useMediaQuery, Switch, Badge } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { IconCopy } from '@tabler/icons-react';
import { useI18n } from '@/app/hooks/useI18n';
import { useDispatch } from '@/store/hooks';
import { actions } from '@/features/assets';
import { actions as layoutActions } from '@/features/layout';
import { Asset } from '@/features/assets/types';
import { DrawerAsset } from '../components/DrawerAsset';
import { DrawerStack } from '../components/DrawerStack/DrawerStack';
import AssetItem, { AssetCardContainer } from './AssetItem';
import { useToggle } from '@/app/hooks/useToggle';
import { getAssetsIdsFromURL } from '@/utils/url-assets';
import { getAssetPrice, isAssetAvailable } from '@/utils/assets';
import { AdditionalAssetsFilterCard } from './AdditionalAssetsFilterCard';
import emptyCart from 'public/images/products/empty-shopping-cart.svg';
import './AssetScroll.css';
import NumberOfFilters from '../components/numberOfFilters';

const AssetsList = () => {
    const dispatch = useDispatch();
    const { language } = useI18n();
    const [assetView, setAssetView] = useState<any>();
    const [selected, setSelected] = useState<Asset[]>([]);
    const [totalFiltersApplied, setTotalFiltersApplied] = useState<number>();

    const assetDrawer = useToggle();
    const curateStack = useToggle();
    const drawerStack = useToggle();

    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
    const { data: assets, totalPage, page: currentPage } = useSelector((state) => state.assets.data);
    const isLoading = useSelector((state) => state.assets.loading);

    const showAdditionalAssets = useSelector((state) => state.filters.showAdditionalAssets);
    const values = useSelector((state) => state.filters);

    const getTotalFiltersApplied = () => {
        const fields = {
            ...values.context,
            ...values.taxonomy,
            ...values.creators,
        };
        return Object.entries(fields).reduce((acc, [_key, arrayfield]) => {
            return Array.isArray(arrayfield) ? acc + arrayfield.length : acc;
        }, 0);
    };

    useEffect(() => {
        const updateTotalFiltersApplied = () => {
            const total = getTotalFiltersApplied();
            setTotalFiltersApplied(total);
        };
        updateTotalFiltersApplied();
    }, [values]);

    useEffect(() => {
        const idsFromURL = getAssetsIdsFromURL();

        if (idsFromURL?.length && idsFromURL[0] == '') {
            return;
        }

        if (idsFromURL) {
            curateStack.activate();
            setSelected(assets.filter((asset) => idsFromURL.includes(asset._id)));
        }
    }, []);

    const openAssetDrawer = (asset: Asset) => {
        setAssetView(asset);
        assetDrawer.activate();
    };

    const openSideBar = () => {
        dispatch(layoutActions.toggleSidebar());
    };

    const handleAssetImageClick = (asset: Asset) => {
        if (curateStack.isActive) return;

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

    const onAssetDrawerClose = () => {
        assetDrawer.deactivate();
        setAssetView(undefined);
    };

    const activeAssets = assets.filter((asset) => asset.consignArtwork.status === 'active');
    const blockedAssets = assets.filter((asset) => asset.consignArtwork.status === 'blocked');

    const isLastPage = currentPage === totalPage;
    const hasActiveAssets = activeAssets.length > 0;
    const hasBlockedAssets = blockedAssets.length > 0;

    return (
        <Box>
            <DrawerAsset assetView={assetView} drawerOpen={assetDrawer.isActive} onClose={onAssetDrawerClose} />

            <DrawerStack
                selected={selected}
                drawerStackOpen={drawerStack.isActive}
                onRemove={(asset) => setSelected(selected.filter((item) => item._id !== asset._id))}
                onClose={drawerStack.deactivate}
            />

            <Stack direction="row" justifyContent="space-between" alignItems="center" p={3}>
                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                        <Switch onChange={curateStack.toggle} checked={curateStack.isActive} />
                        <Box display={'flex'} gap={1}>
                            <Typography variant={lgUp ? 'h4' : 'h5'}>
                                {language['search.assetList.curateStack'] as string}
                            </Typography>
                            {!lgUp && <NumberOfFilters value={totalFiltersApplied} onClick={openSideBar} />}
                        </Box>
                    </Box>
                    {curateStack.isActive && (
                        <Box
                            sx={{ cursor: 'pointer' }}
                            display="flex"
                            alignItems="center"
                            gap={1}
                            onClick={drawerStack.activate}
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
                        {activeAssets.map((asset) => (
                            <AssetCardContainer key={asset._id}>
                                <AssetItem
                                    isAvailable={isAssetAvailable(asset)}
                                    assetView={assetView}
                                    asset={asset}
                                    isCurated={curateStack.isActive}
                                    checkedCurate={selected.some((item) => item._id === asset._id)}
                                    handleChangeCurate={() => {
                                        handleCheckCurate(asset);
                                    }}
                                    handleClickImage={() => {
                                        handleAssetImageClick(asset);
                                    }}
                                    price={getAssetPrice(asset)}
                                />
                            </AssetCardContainer>
                        ))}

                        {((isLastPage && hasActiveAssets) || (hasActiveAssets && hasBlockedAssets)) && (
                            <AssetCardContainer key={1}>
                                <AdditionalAssetsFilterCard />
                            </AssetCardContainer>
                        )}

                        {showAdditionalAssets.value &&
                            blockedAssets.map((asset) => (
                                <AssetCardContainer key={asset._id}>
                                    <AssetItem
                                        variant="blocked"
                                        isAvailable={isAssetAvailable(asset)}
                                        assetView={assetView}
                                        asset={asset}
                                        isCurated={curateStack.isActive}
                                        checkedCurate={selected.some((item) => item._id === asset._id)}
                                        handleChangeCurate={() => {
                                            handleCheckCurate(asset);
                                        }}
                                        handleClickImage={() => {
                                            handleAssetImageClick(asset);
                                        }}
                                        price={getAssetPrice(asset)}
                                    />
                                </AssetCardContainer>
                            ))}
                    </>
                ) : isLoading ? (
                    [...Array(3)].map((_, index) => (
                        <AssetCardContainer key={index}>
                            <Skeleton variant="rectangular" width={250} height={250} />
                        </AssetCardContainer>
                    ))
                ) : (
                    <>
                        <Grid item xs={12} lg={12} md={12} sm={12}>
                            <Box textAlign="center" mt={6}>
                                <Image src={emptyCart} alt="cart" width={200} />
                                <Typography variant="h2">Maintenance</Typography>
                                <Typography variant="h6" mb={3}>
                                    The Asset you are searching for is currently no longer available.
                                </Typography>
                            </Box>
                        </Grid>
                    </>
                )}

                <Box mt={3} mb={4} display="flex" justifyContent="center" width="100%">
                    <Pagination
                        count={totalPage}
                        page={currentPage}
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
