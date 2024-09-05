import React, { useEffect, useMemo, useRef, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { useSelector } from '@/store/hooks';
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
import { actions as actionsFilters } from '@/features/filters/slice';
import { actions as layoutActions } from '@/features/layout';
import * as actionsCustomizer from '@/features/customizer/slice';
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
import { useTheme } from '@mui/material/styles';
import generateQueryParam from '@/utils/generate.queryParam';

const AssetsList = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const params = new URLSearchParams(window.location.search);

    const grid = params.get('grid');
    const video = params.get('video');
    const creatorId = params.get('creatorId');
    const portfolioWallets = params.get('portfolio_wallets');

    const hasCurated = grid || video;

    const { language } = useI18n();
    const [assetView, setAssetView] = useState<any>();
    const [selected, setSelected] = useState<Asset[]>([]);
    const [totalFiltersApplied, setTotalFiltersApplied] = useState<number>();
    const [sortOrder, setSortOrder] = useState<string>('latest');
    const [isIncludeSold, setIsIncludeSold] = useState<boolean>(false);
    const [isIncludeGroupByCreator, setIsIncludeGroupByCreator] = useState<boolean>(true);
    const topRef = useRef<HTMLDivElement>(null);

    const assetDrawer = useToggle();
    const curateStack = useToggle();
    const drawerStack = useToggle();

    const lgUp = useMediaQuery((mediaQuery: Theme) => mediaQuery.breakpoints.up('lg'));
    const smUp = useMediaQuery((mediaQuery: Theme) => mediaQuery.breakpoints.up('sm'));
    const { data: assets, totalPage, page: currentPage } = useSelector((state) => state.assets.data);
    const { sort, maxPrice } = useSelector((state) => state.assets);
    const isLoading = useSelector((state) => state.assets.loading);
    const hasIncludesGroup = useSelector((state) => state.assets.groupByCreator);
    const showAdditionalAssets = useSelector((state) => state.filters.showAdditionalAssets);
    const values = useSelector((state) => state.filters);
    const gridTitle = useSelector((state) => state.filters.grid.title);
    const videoTitle = useSelector((state) => state.filters.video.title);
    const isHidden = useSelector((state) => state.customizer.hidden);

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
        if (grid || video) setIsIncludeGroupByCreator(false);
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

    useEffect(() => {
        if (grid || video) return;

        setIsIncludeGroupByCreator(hasIncludesGroup.active);
    }, [hasIncludesGroup.active]);

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

    const returnToPageOne = () => {
        params.forEach((_, key) => params.delete(key));

        params.set('sort_order', 'latest');
        params.set('sort_sold', 'no');
        params.set('taxonomy_aiGeneration', 'partial,none');
        params.set('taxonomy_nudity', 'no');
        params.set('groupByCreator', 'yes');
        params.delete('creatorId');

        window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);

        dispatch(actions.resetGroupByCreator());
        dispatch(actionsFilters.reset({ maxPrice }));
        dispatch(actionsCustomizer.reset());
    };

    const handleChangeSelectSortOrder = (
        e: SingleValue<{
            value: string;
            label: string;
        }>
    ) => {
        setSortOrder(e?.value || '');
        generateQueryParam('sort_order', e?.value || '');
        dispatch(actions.setSort({ order: e?.value || '', sold: isIncludeSold ? 'yes' : 'no' }));
    };
    const handleChangeIsIncludeSold = () => {
        setIsIncludeSold(!isIncludeSold);
        generateQueryParam('sort_sold', isIncludeSold ? 'no' : 'yes');
        dispatch(actions.setSort({ order: sortOrder, sold: isIncludeSold ? 'no' : 'yes' }));
    };

    const handleChangeIsIncludeGroupByCreator = () => {
        setIsIncludeGroupByCreator(!isIncludeGroupByCreator);
        generateQueryParam('groupByCreator', isIncludeGroupByCreator ? 'no' : 'yes');

        if (!isIncludeGroupByCreator) {
            generateQueryParam('creatorId', '');
            generateQueryParam('grid', '');
            generateQueryParam('video', '');

            dispatch(actions.setInitialPage());
            dispatch(actionsFilters.resetCreatorId());

            dispatch(actionsFilters.clearGrid());
            dispatch(actionsFilters.clearVideo());
        }

        dispatch(
            actions.setGroupByCreator({
                active: !isIncludeGroupByCreator,
                name: '',
            })
        );

        if (isIncludeGroupByCreator) dispatch(actions.loadAssets({ page: 1 }));
    };

    const iconColor = selected.length > 0 ? '#763EBD' : 'currentColor';

    const onAssetDrawerClose = () => {
        assetDrawer.deactivate();
        setAssetView(undefined);
    };

    const activeAssets = assets.filter((asset) => asset?.consignArtwork?.status === 'active');
    const blockedAssets = assets.filter((asset) => asset?.consignArtwork?.status === 'blocked');

    const isLastPage = currentPage === totalPage;
    const hasActiveAssets = activeAssets.length > 0;
    const hasBlockedAssets = blockedAssets.length > 0;
    const isInIframe = window.self !== window.top;

    return (
        <Box position="fixed">
            <DrawerAsset assetView={assetView} drawerOpen={assetDrawer.isActive} onClose={onAssetDrawerClose} />

            <DrawerStack
                selected={selected}
                drawerStackOpen={drawerStack.isActive}
                onClose={drawerStack.deactivate}
                setSelected={setSelected}
            />

            {!isHidden?.order && (
                <Stack
                    width="100%"
                    direction="row"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={1}
                    p={3}
                >
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
                                    minWidth: lgUp ? '240px' : '100px',
                                    maxWidth: lgUp ? '' : '150px',
                                    borderColor: state.isFocused ? theme.palette.primary.main : theme.palette.grey[200],
                                    backgroundColor: theme.palette.background.paper,
                                    boxShadow: '#00d6f4',
                                    '&:hover': { borderColor: '#00d6f4' },
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
                        <FormControlLabel
                            control={<Checkbox checked={isIncludeSold} onChange={handleChangeIsIncludeSold} />}
                            label="Include Sold"
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isIncludeGroupByCreator}
                                    onChange={handleChangeIsIncludeGroupByCreator}
                                />
                            }
                            label="Group by creator"
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
                                            {selected.length}{' '}
                                            {language['search.assetList.curateStack.selected'] as string}
                                        </Typography>
                                        <IconCopy width={20} />
                                    </Box>
                                )}

                                {!lgUp && (
                                    <Badge badgeContent={selected.length} color="primary" style={{ marginLeft: 2 }}>
                                        <IconCopy width={20} color={iconColor} />
                                    </Badge>
                                )}
                            </Box>
                        )}

                        <Box display="flex" alignItems="center">
                            <Switch onChange={curateStack.toggle} checked={curateStack.isActive} />
                            <Box display={'flex'} gap={1}>
                                <Typography variant={lgUp ? 'h5' : 'inherit'} noWrap>
                                    {language['search.assetList.curateStack'] as string}
                                </Typography>
                                {!lgUp && <NumberOfFilters value={totalFiltersApplied} onClick={openSideBar} />}
                            </Box>
                        </Box>
                    </Box>
                </Stack>
            )}

            <Grid
                container
                spacing={3}
                padding={3}
                pr={0}
                sx={{
                    overflow: 'auto',
                    maxHeight:
                        isHidden?.order && isHidden?.header
                            ? '105vh'
                            : isHidden?.order || isHidden?.header
                              ? '95vh'
                              : '85vh',
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
                    {currentPage === 1 &&
                        !grid &&
                        !video &&
                        !creatorId &&
                        !portfolioWallets &&
                        !isHidden?.recentlySold && <Slider />}
                </Grid>

                <Grid item xs={12} mr={4} mb={4}>
                    <Box width="100%" display="flex" alignItems="flex-end" justifyContent={'space-between'}>
                        {hasCurated || !hasIncludesGroup.active ? (
                            <Box display="flex" alignItems="flex-end" gap={2}>
                                {hasCurated && (
                                    <Typography variant="h4">{gridTitle || videoTitle || 'Curated arts'}</Typography>
                                )}
                                {hasIncludesGroup.name && <Typography variant="h4">{hasIncludesGroup.name}</Typography>}
                                {(hasCurated || hasIncludesGroup.name) && (
                                    <button
                                        style={{
                                            border: 'none',
                                            background: 'none',
                                            cursor: 'pointer',
                                        }}
                                        onClick={returnToPageOne}
                                    >
                                        <Typography
                                            variant="h6"
                                            color="primary"
                                            sx={{
                                                textDecoration: 'underline',
                                                cursor: 'pointer',
                                                fontSize: 14,
                                            }}
                                        >
                                            Reset search
                                        </Typography>
                                    </button>
                                )}
                            </Box>
                        ) : (
                            <Box />
                        )}
                        <Box display={'flex'} gap={1}>
                            {!isHidden?.pageNavigation && (
                                <Select
                                    placeholder="Select Page"
                                    options={optionsForSelect}
                                    value={currentPage > 1 ? { value: currentPage, label: currentPage } : null}
                                    onChange={(e) => dispatch(actions.setCurrentPage(e?.value || 1))}
                                    styles={{
                                        control: (base, state) => ({
                                            ...base,
                                            minWidth: '250px',
                                            borderColor: state.isFocused
                                                ? theme.palette.primary.main
                                                : theme.palette.grey[200],
                                            backgroundColor: theme.palette.background.paper,
                                            boxShadow: '#00d6f4',
                                            '&:hover': { borderColor: '#00d6f4' },
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
                                            backgroundColor: state.isFocused
                                                ? theme.palette.action.hover
                                                : 'transparent',
                                            '&:hover': { backgroundColor: theme.palette.action.hover },
                                        }),
                                        input: (base) => ({
                                            ...base,
                                            color: theme.palette.text.primary,
                                        }),
                                    }}
                                />
                            )}
                        </Box>
                    </Box>
                </Grid>

                <Grid container display={'flex'} ml={4} rowGap={3} overflow={'hidden'}>
                    {isLoading ? (
                        [...Array(4)].map((_, index) => (
                            <AssetCardContainer key={index}>
                                <Skeleton variant="rectangular" width={250} height={250} />
                            </AssetCardContainer>
                        ))
                    ) : assets.length > 0 ? (
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
                                            if (hasIncludesGroup.active) {
                                                if (asset?.framework?.createdBy) {
                                                    dispatch(actions.setInitialPage());
                                                    dispatch(actionsFilters.changeCreatorId(asset.framework.createdBy));
                                                    generateQueryParam('creatorId', asset.framework.createdBy);
                                                    dispatch(actions.setGroupByCreator({ active: false, name: '' }));

                                                    if (Array.isArray(asset.assetMetadata?.creators.formData)) {
                                                        dispatch(
                                                            actions.changeGroupByCreatorName(
                                                                asset.assetMetadata?.creators.formData[0].name
                                                            )
                                                        );
                                                    } else {
                                                        dispatch(actions.changeGroupByCreatorName('Unknown'));
                                                    }

                                                    handleScrollToTop();
                                                }

                                                return;
                                            }

                                            handleAssetImageClick(asset);
                                        }}
                                        price={getAssetPrice(asset)}
                                        countByCreator={asset.countByCreator}
                                    />
                                </AssetCardContainer>
                            ))}

                            {((isLastPage && hasActiveAssets) || (hasActiveAssets && hasBlockedAssets)) &&
                                !isInIframe && (
                                    <AssetCardContainer key={1}>
                                        <Box width={'100%'} height={'100%'} mr={4}>
                                            <AdditionalAssetsFilterCard />
                                        </Box>
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
                                                if (hasIncludesGroup.active) {
                                                    if (asset?.framework?.createdBy) {
                                                        dispatch(
                                                            actionsFilters.changeCreatorId(asset.framework.createdBy)
                                                        );
                                                        generateQueryParam('creatorId', asset.framework.createdBy);
                                                        dispatch(actions.resetGroupByCreator());
                                                        if (Array.isArray(asset.assetMetadata?.creators.formData)) {
                                                            dispatch(
                                                                actions.changeGroupByCreatorName(
                                                                    asset.assetMetadata?.creators.formData[0].name
                                                                )
                                                            );
                                                        } else {
                                                            dispatch(actions.changeGroupByCreatorName('Unknown'));
                                                        }

                                                        handleScrollToTop();
                                                    }

                                                    return;
                                                }

                                                handleAssetImageClick(asset);
                                            }}
                                            price={getAssetPrice(asset)}
                                        />
                                    </AssetCardContainer>
                                ))}
                        </>
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
                {!isHidden?.pageNavigation ? (
                    <>
                        <Box
                            mt={4}
                            mb={2}
                            display={totalPage === 0 ? 'none' : 'flex'}
                            justifyContent="center"
                            width="100%"
                            alignItems="center"
                        >
                            {!isLoading && (
                                <Pagination
                                    count={totalPage}
                                    page={currentPage}
                                    onChange={(_event, value) => dispatch(actions.setCurrentPage(value))}
                                    color="primary"
                                    size={lgUp ? 'large' : 'medium'}
                                />
                            )}
                        </Box>
                        <Box
                            display={totalPage === 0 ? 'none' : 'flex'}
                            justifyContent="flex-end"
                            width="100%"
                            mr={4}
                            mb={lgUp ? 4 : 8}
                        >
                            <Button onClick={handleScrollToTop}>Scroll to top</Button>
                        </Box>
                    </>
                ) : (
                    <Box mb={4} />
                )}
            </Grid>
        </Box>
    );
};

export default AssetsList;
