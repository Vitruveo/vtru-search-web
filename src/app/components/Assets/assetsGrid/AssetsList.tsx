import React, { useEffect, useMemo, useRef, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { useSelector } from '@/store/hooks';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import {
    Pagination,
    Box,
    Grid,
    Skeleton,
    Typography,
    Stack,
    useMediaQuery,
    Switch,
    Badge,
    Button,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { IconCopy } from '@tabler/icons-react';
import { useI18n } from '@/app/hooks/useI18n';
import { useDispatch } from '@/store/hooks';
import { actions } from '@/features/assets';
import { actions as layoutActions } from '@/features/layout';
import { Asset } from '@/features/assets/types';
import { DrawerAsset } from '../components/DrawerAsset';
import DrawerStack from '../components/DrawerStack/DrawerStack';
import AssetItem, { AssetCardContainer } from './AssetItem';
import { useToggle } from '@/app/hooks/useToggle';
import { getAssetsIdsFromURL } from '@/utils/url-assets';
import { getAssetPrice, isAssetAvailable } from '@/utils/assets';
import { AdditionalAssetsFilterCard } from './AdditionalAssetsFilterCard';
import emptyCart from 'public/images/products/empty-shopping-cart.svg';
import './AssetScroll.css';
import NumberOfFilters from '../components/numberOfFilters';
import Slider from '../../../components/Slider';

const AssetsList = () => {
    const searchParamsHook = useSearchParams();
    const dispatch = useDispatch();

    const grid = searchParamsHook.get('grid');
    const video = searchParamsHook.get('video');

    const { language } = useI18n();
    const [assetView, setAssetView] = useState<any>();
    const [selected, setSelected] = useState<Asset[]>([]);
    const [totalFiltersApplied, setTotalFiltersApplied] = useState<number>();
    const [sortOrder, setSortOrder] = useState<string>('latest');
    const [isIncludeSold, setIsIncludeSold] = useState<boolean>(false);
    const topRef = useRef<HTMLDivElement>(null);

    const assetDrawer = useToggle();
    const curateStack = useToggle();
    const drawerStack = useToggle();

    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
    const { data: assets, totalPage, page: currentPage } = useSelector((state) => state.assets.data);
    const { sort } = useSelector((state) => state.assets);
    const isLoading = useSelector((state) => state.assets.loading);

    const showAdditionalAssets = useSelector((state) => state.filters.showAdditionalAssets);
    const values = useSelector((state) => state.filters);

    const optionsForSelect = useMemo(() => {
        const options: { value: number; label: number }[] = [];
        for (let i = 1; i <= totalPage; i++) {
            options.push({ value: i, label: i });
        }
        return options;
    }, [totalPage]);

    const optionsForSelectSort = [
        { value: 'latest', label: 'Latest' },
        { value: 'priceHighToLow', label: 'Price – High to Low' },
        { value: 'priceLowToHigh', label: 'Price – Low to High' },
        { value: 'creatorAZ', label: 'Creator – A-Z' },
        { value: 'creatorZA', label: 'Creator – Z-A' },
        { value: 'consignNewToOld', label: 'Consign Date – New to Old' },
        { value: 'consignOldToNew', label: 'Consign Date – Old to New' },
    ];

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

    useEffect(() => {
        handleScrollToTop();
    }, [currentPage]);

    useEffect(() => {
        if (grid || video) return;

        if (currentPage > totalPage) dispatch(actions.setCurrentPage(totalPage));
    }, [totalPage]);

    useEffect(() => {
        if (grid || video) return;

        setSortOrder(sort.order);
        setIsIncludeSold(sort.sold === 'yes' ? true : false);
    }, [sort]);

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

    const handleScrollToTop = () => {
        if (topRef.current) {
            topRef.current.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    const generateQueryParam = (key: string, value: string) => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set(key, value);
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
    };

    const handleChangeSelectSortOrder = (
        e: SingleValue<{
            value: string;
            label: string;
        }>
    ) => {
        setSortOrder(e?.value || '');
        generateQueryParam('sort', e?.value || '');
        dispatch(actions.setSort({ order: e?.value || '', sold: isIncludeSold ? 'yes' : 'no' }));
    };
    const handleChangeIsIncludeSold = () => {
        setIsIncludeSold(!isIncludeSold);
        generateQueryParam('sold', isIncludeSold ? 'no' : 'yes');
        dispatch(actions.setSort({ order: sortOrder, sold: isIncludeSold ? 'no' : 'yes' }));
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
        <Box position="fixed">
            <DrawerAsset assetView={assetView} drawerOpen={assetDrawer.isActive} onClose={onAssetDrawerClose} />

            <DrawerStack
                selected={selected}
                drawerStackOpen={drawerStack.isActive}
                onRemove={(asset) => setSelected(selected.filter((item) => item._id !== asset._id))}
                onClose={drawerStack.deactivate}
            />

            <Stack width="100%" direction="row" display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <Grid
                    item
                    xs={12}
                    sm={'auto'}
                    display={'flex'}
                    gap={lgUp ? 4 : 0}
                    flexDirection={lgUp ? 'row' : 'column'}
                >
                    <Select
                        placeholder="Sort"
                        options={optionsForSelectSort}
                        value={optionsForSelectSort.find((option) => option.value === sortOrder)}
                        onChange={(e) => handleChangeSelectSortOrder(e)}
                        styles={{
                            control: (base, state) => ({
                                ...base,
                                minWidth: '240px',
                                borderColor: state.isFocused ? '#00d6f4' : '#E0E0E0',
                                boxShadow: '#00d6f4',
                                '&:hover': {
                                    borderColor: '#00d6f4',
                                },
                            }),
                            menu: (base) => ({
                                ...base,
                                zIndex: 1000,
                            }),
                        }}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={isIncludeSold} onChange={handleChangeIsIncludeSold} />}
                        label="Include Sold"
                    />
                </Grid>
                <Box display={'flex'}>
                    {curateStack.isActive && (
                        <Box
                            sx={{ cursor: 'pointer' }}
                            display="flex"
                            alignItems="center"
                            gap={1}
                            onClick={drawerStack.activate}
                        >
                            {lgUp && (
                                <Box display="flex" alignItems="center" gap={2}>
                                    <Typography variant="h4">
                                        {selected.length} {language['search.assetList.curateStack.selected'] as string}
                                    </Typography>
                                    <IconCopy width={20} />
                                </Box>
                            )}

                            {!lgUp && (
                                <Badge badgeContent={selected.length} color="primary">
                                    <IconCopy width={20} color={iconColor} />
                                </Badge>
                            )}
                        </Box>
                    )}

                    <Box display="flex" alignItems="center">
                        <Switch onChange={curateStack.toggle} checked={curateStack.isActive} />
                        <Box display={'flex'} gap={1}>
                            <Typography variant={lgUp ? 'h4' : 'h5'}>
                                {language['search.assetList.curateStack'] as string}
                            </Typography>
                            {!lgUp && <NumberOfFilters value={totalFiltersApplied} onClick={openSideBar} />}
                        </Box>
                    </Box>
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
                    justifyContent: 'flex-end',
                }}
                ref={topRef}
            >
                <Grid
                    item
                    xs={12}
                    style={{
                        paddingTop: 0,
                    }}
                >
                    {currentPage === 1 && <Slider />}
                </Grid>

                <Grid item xs={12} sm={'auto'} mr={4} mb={4} minWidth={'16%'}>
                    <Select
                        placeholder="Select Page"
                        options={optionsForSelect}
                        value={currentPage > 1 ? { value: currentPage, label: currentPage } : null}
                        onChange={(e) => dispatch(actions.setCurrentPage(e?.value || 1))}
                        styles={{
                            control: (base, state) => ({
                                ...base,
                                borderColor: state.isFocused ? '#00d6f4' : '#E0E0E0',
                                boxShadow: '#00d6f4',
                                '&:hover': {
                                    borderColor: '#00d6f4',
                                },
                                display: totalPage === 0 ? 'none' : 'flex',
                            }),
                        }}
                    />
                </Grid>

                <Grid container display={'flex'} ml={4} rowGap={3}>
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
                        <Grid
                            item
                            xl={12}
                            lg={12}
                            md={12}
                            sm={12}
                            xs={12}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: 'calc(100vw - 320px)',
                            }}
                        >
                            <Box textAlign="center" mt={6} width="100%">
                                <Image src={emptyCart} alt="cart" width={200} />
                                <Typography variant="h2">No Asset found</Typography>
                                <Typography variant="h6" mb={3}>
                                    The Asset you are searching for could not be found.
                                </Typography>
                            </Box>
                        </Grid>
                    )}
                </Grid>
                <Box
                    mt={4}
                    display={totalPage === 0 ? 'none' : 'flex'}
                    justifyContent="center"
                    width="100%"
                    alignItems="center"
                >
                    <Pagination
                        count={totalPage}
                        page={currentPage}
                        onChange={(_event, value) => dispatch(actions.setCurrentPage(value))}
                        color="primary"
                        size="large"
                    />
                </Box>
                <Box display={totalPage === 0 ? 'none' : 'flex'} justifyContent="flex-end" width="100%" mr={4} mb={4}>
                    <Button onClick={handleScrollToTop}>Scroll to top</Button>
                </Box>
            </Grid>
        </Box>
    );
};

export default AssetsList;
