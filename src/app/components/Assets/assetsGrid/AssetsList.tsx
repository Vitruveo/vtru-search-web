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
    IconButton,
    Container,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { IconArrowBarToLeft, IconCopy, IconArrowBarToRight, IconFilter } from '@tabler/icons-react';
import { useI18n } from '@/app/hooks/useI18n';
import { useDispatch } from '@/store/hooks';
import { actions } from '@/features/assets';
import { actions as actionsFilters } from '@/features/filters/slice';
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
import { useTheme } from '@mui/material/styles';
import generateQueryParam from '@/utils/generateQueryParam';
import { STORE_BASE_URL } from '@/constants/api';
import TabSliders from '../../Sliders/TabSliders';

const optionsForSelectSort = [
    { value: 'latest', label: 'Latest' },
    { value: 'priceHighToLow', label: 'Price – High to Low' },
    { value: 'priceLowToHigh', label: 'Price – Low to High' },
    { value: 'creatorAZ', label: 'Creator – A-Z' },
    { value: 'creatorZA', label: 'Creator – Z-A' },
    { value: 'consignNewToOld', label: 'Consign Date – New to Old' },
    { value: 'consignOldToNew', label: 'Consign Date – Old to New' },
];

const optionsForSelectGrouped = [
    { value: 'no', label: 'Ungrouped – All' },
    { value: 'all', label: 'Grouped – All' },
    { value: 'noSales', label: 'Grouped – No Sales' },
];

const AssetsList = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const params = new URLSearchParams(window.location.search);

    const grid = params.get('grid');
    const slideshow = params.get('slideshow');
    const video = params.get('video');
    const creatorId = params.get('creatorId');
    const portfolioWallets = params.get('portfolio_wallets');

    const hasCurated = grid || video || slideshow;

    const { language } = useI18n();
    const [assetView, setAssetView] = useState<any>();
    const [selected, setSelected] = useState<Asset[]>([]);
    const [totalFiltersApplied, setTotalFiltersApplied] = useState<number>();
    const [sortOrder, setSortOrder] = useState<string>('latest');
    const [groupByCreator, setGroupByCreator] = useState<string>('no');
    const topRef = useRef<HTMLDivElement>(null);

    const assetDrawer = useToggle();
    const curateStack = useToggle();
    const drawerStack = useToggle();

    const lgUp = useMediaQuery((mediaQuery: Theme) => mediaQuery.breakpoints.up('lg'));
    const { data: assets, totalPage, page: currentPage, limit } = useSelector((state) => state.assets.data);
    const { sort, maxPrice } = useSelector((state) => state.assets);
    const isLoading = useSelector((state) => state.assets.loading);
    const hasIncludesGroup = useSelector((state) => state.assets.groupByCreator);
    const showAdditionalAssets = useSelector((state) => state.filters.showAdditionalAssets);
    const values = useSelector((state) => state.filters);
    const gridTitle = useSelector((state) => state.filters.grid.title);
    const videoTitle = useSelector((state) => state.filters.video.title);
    const slideshowTitle = useSelector((state) => state.filters.slideshow.title);
    const tabNavigation = useSelector((state) => state.filters.tabNavigation);
    const isHidden = useSelector((state) => state.customizer.hidden);
    const isSidebarOpen = useSelector((state) => state.layout.isSidebarOpen);

    const optionsForSelect = useMemo(() => {
        const options: { value: number; label: number }[] = [];
        for (let i = 1; i <= totalPage; i++) {
            options.push({ value: i, label: i });
        }
        return options;
    }, [totalPage]);

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
        if (grid || video || slideshow) setGroupByCreator('no');
    }, []);

    useEffect(() => {
        handleScrollToTop();
    }, [currentPage]);

    useEffect(() => {
        if (grid || video || slideshow) return;

        if (currentPage > totalPage) dispatch(actions.setCurrentPage(totalPage));
    }, [totalPage]);

    useEffect(() => {
        if (grid || video || slideshow) return;

        setSortOrder(sort.order);
    }, [sort]);

    useEffect(() => {
        if (grid || video || slideshow) return;

        setGroupByCreator(hasIncludesGroup.active);
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
        params.forEach((_, key) => {
            if (!key.includes('_hidden')) params.delete(key);
            else params.set(key, params.get(key) || '');
        });

        params.set('sort_order', 'latest');
        params.set('sort_sold', 'no');
        params.set('taxonomy_aiGeneration', 'partial,none');
        params.set('taxonomy_nudity', 'no');
        params.set('groupByCreator', 'all');
        params.delete('creatorId');

        window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);

        dispatch(actionsFilters.clearTabNavigation());
        dispatch(actions.resetGroupByCreator());
        dispatch(actionsFilters.reset({ maxPrice }));
    };

    const handleChangeSelectSortOrder = (
        e: SingleValue<{
            value: string;
            label: string;
        }>
    ) => {
        setSortOrder(e?.value || '');
        generateQueryParam('sort_order', e?.value || '');
        dispatch(actions.setSort({ order: e?.value || '', sold: sort.sold === 'yes' ? 'yes' : 'no' }));
    };

    const handleChangeSelectGroupByCreator = (
        e: SingleValue<{
            value: string;
            label: string;
        }>
    ) => {
        const value = e?.value || '';

        dispatch(actionsFilters.clearTabNavigation());
        setGroupByCreator(value);
        generateQueryParam('groupByCreator', value);

        if (e?.value !== 'no') {
            generateQueryParam('creatorId', '');
            generateQueryParam('grid', '');
            generateQueryParam('video', '');
            generateQueryParam('slideshow', '');

            dispatch(actions.setInitialPage());
            dispatch(actionsFilters.resetCreatorId());

            dispatch(actionsFilters.clearGrid());
            dispatch(actionsFilters.clearVideo());
            dispatch(actionsFilters.clearSlideshow());
        }

        dispatch(
            actions.setGroupByCreator({
                active: value,
                name: '',
            })
        );

        if (['no'].includes(value)) {
            dispatch(actionsFilters.resetCreatorId());
            params.delete('creatorId');
            window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
            dispatch(actions.loadAssets({ page: 1 }));
        }
    };

    const handleChangeCurateStack = () => {
        curateStack.toggle();
        if (!curateStack.isActive) handleChangeSelectGroupByCreator({ value: 'no', label: 'Ungrouped – All' });
    };

    const handleSelectAll = () => {
        setSelected((prev) => {
            const selectedMap = [...prev, ...assets].reduce((acc, asset) => {
                return {
                    ...acc,
                    [asset._id]: asset,
                };
            }, {});

            return Object.values(selectedMap);
        });
    };
    const handleUnselectAll = () => setSelected([]);

    const onMenuClick = () => dispatch(layoutActions.toggleSidebar());

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
    const hasIncludesGroupActive = hasIncludesGroup.active === 'all' || hasIncludesGroup.active === 'noSales';
    return (
        <Box>
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
                    display={lgUp ? 'flex' : 'block'}
                    justifyContent="space-between"
                    alignItems="center"
                    mt={1}
                    mb={3}
                    p={3}
                    pl={2}
                    style={{
                        marginBottom: lgUp || curateStack.isActive ? '20px' : 0,
                        paddingTop: '7px',
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        sm={'auto'}
                        display={'flex'}
                        gap={lgUp ? 4 : 2}
                        flexDirection={lgUp ? 'row' : 'column'}
                        alignItems="flex-start"
                    >
                        {lgUp && (
                            <IconButton sx={{ color: theme.palette.grey[300] }} aria-label="menu" onClick={onMenuClick}>
                                {isSidebarOpen ? <IconArrowBarToLeft /> : <IconArrowBarToRight />}
                            </IconButton>
                        )}
                        <Box
                            width="100%"
                            maxWidth={350}
                            justifyContent="space-between"
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            gap={1}
                        >
                            <Typography variant="h4">Sort:</Typography>
                            <Select
                                placeholder="Sort"
                                options={optionsForSelectSort}
                                value={optionsForSelectSort.find((option) => option.value === sortOrder)}
                                onChange={(e) => handleChangeSelectSortOrder(e)}
                                styles={{
                                    control: (base, state) => ({
                                        ...base,
                                        minWidth: '240px',
                                        maxWidth: lgUp ? '' : '150px',
                                        borderColor: state.isFocused
                                            ? theme.palette.primary.main
                                            : theme.palette.grey[200],
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

                        <Box
                            width="100%"
                            justifyContent="space-between"
                            display="flex"
                            flexDirection="row"
                            maxWidth={350}
                            alignItems="center"
                            gap={1}
                        >
                            <Typography variant="h4">Artists:</Typography>
                            <Select
                                placeholder="Artists"
                                options={optionsForSelectGrouped}
                                value={optionsForSelectGrouped.find((option) => option.value === groupByCreator)}
                                onChange={(e) => handleChangeSelectGroupByCreator(e)}
                                styles={{
                                    control: (base, state) => ({
                                        ...base,
                                        minWidth: '240px',
                                        maxWidth: lgUp ? '' : '150px',
                                        borderColor: state.isFocused
                                            ? theme.palette.primary.main
                                            : theme.palette.grey[200],
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
                    </Grid>
                    <Box
                        mt={lgUp ? 0 : 2}
                        display={'flex'}
                        flexDirection={!lgUp ? 'column-reverse' : 'row'}
                        flexWrap="wrap"
                        justifyContent={lgUp ? 'unset' : 'flex-start'}
                    >
                        {curateStack.isActive && (
                            <Box display="flex" alignItems="center" gap={1}>
                                <Button variant="contained" onClick={handleUnselectAll}>
                                    Deselect All
                                </Button>
                                <Button variant="contained" onClick={handleSelectAll}>
                                    Select All
                                </Button>
                                <Box sx={{ cursor: 'pointer' }} onClick={drawerStack.activate}>
                                    {lgUp && (
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Button variant="contained" fullWidth>
                                                {selected.length}{' '}
                                                {language['search.assetList.curateStack.selected'] as string}
                                            </Button>
                                        </Box>
                                    )}
                                    {!lgUp && (
                                        <Badge badgeContent={selected.length} color="primary" style={{ marginLeft: 2 }}>
                                            <IconCopy width={20} color={iconColor} />
                                        </Badge>
                                    )}
                                </Box>
                            </Box>
                        )}

                        <Box sx={!lgUp ? { marginBottom: 2 } : {}} display="flex" alignItems="center">
                            {!lgUp && (
                                <IconButton
                                    sx={{ marginLeft: 0, paddingLeft: 0 }}
                                    size="small"
                                    aria-label="menu"
                                    onClick={onMenuClick}
                                >
                                    <IconFilter />
                                </IconButton>
                            )}
                            <Switch onChange={handleChangeCurateStack} checked={curateStack.isActive} />
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
                    {(currentPage === 1 || currentPage === 0) &&
                        !grid &&
                        !video &&
                        !slideshow &&
                        !creatorId &&
                        !portfolioWallets &&
                        tabNavigation.assets?.length <= 0 &&
                        tabNavigation.artists?.length <= 0 && <TabSliders />}
                </Grid>

                <Grid item xs={12} mr={4} mb={4}>
                    <Box
                        width="100%"
                        display="flex"
                        flexDirection={lgUp ? 'row' : 'column'}
                        alignItems={lgUp ? 'flex-end' : 'flex-start'}
                        justifyContent={'space-between'}
                        gap={1}
                    >
                        {hasCurated ||
                        !hasIncludesGroupActive ||
                        tabNavigation.assets?.length > 0 ||
                        tabNavigation.artists?.length > 0 ? (
                            <Box display="flex" alignItems="flex-end" gap={2}>
                                {(hasCurated ||
                                    tabNavigation.assets?.length > 0 ||
                                    tabNavigation.artists?.length > 0) && (
                                    <Typography variant="h4">
                                        {gridTitle ||
                                            videoTitle ||
                                            slideshowTitle ||
                                            tabNavigation.title ||
                                            'Curated arts'}
                                    </Typography>
                                )}
                                {hasIncludesGroup.name && (
                                    <Typography variant="h4" maxWidth={230} sx={{ wordBreak: 'break-word' }}>
                                        {hasIncludesGroup.name}
                                    </Typography>
                                )}
                                {(hasCurated ||
                                    hasIncludesGroup.name ||
                                    creatorId ||
                                    tabNavigation.assets?.length > 0 ||
                                    tabNavigation.artists?.length > 0) && (
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
                        {!isHidden?.pageNavigation && (
                            <Box display={'flex'} gap={1} flexDirection={lgUp ? 'row' : 'column'}>
                                <Select
                                    placeholder="Page Items"
                                    options={[
                                        { value: 25, label: 25 },
                                        { value: 50, label: 50 },
                                        { value: 100, label: 100 },
                                        { value: 150, label: 150 },
                                        { value: 200, label: 200 },
                                    ]}
                                    value={{ value: limit, label: limit }}
                                    onChange={(e) => dispatch(actions.setLimit(e?.value || 25))}
                                    styles={{
                                        control: (base, state) => ({
                                            ...base,
                                            minWidth: '250px',
                                            borderColor: state.isFocused
                                                ? theme.palette.primary.main
                                                : theme.palette.grey[200],
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
                            </Box>
                        )}
                    </Box>
                </Grid>

                {!isHidden?.assets && (
                    <Grid
                        container
                        rowGap={2.85}
                        columnGap={3}
                        overflow={'hidden'}
                        display={'flex'}
                        justifyContent={'center'}
                        ml={4}
                        mr={4}
                    >
                        {isLoading ? (
                            [...Array(15)].map((_, index) => (
                                <Grid item key={index} display={'flex'} justifyContent={'center'}>
                                    <AssetCardContainer>
                                        <Skeleton variant="rectangular" width={250} height={250} />
                                    </AssetCardContainer>
                                </Grid>
                            ))
                        ) : assets.length > 0 ? (
                            <>
                                {activeAssets.map((asset) => (
                                    <Grid item key={asset._id} display={'flex'} justifyContent={'center'}>
                                        <AssetCardContainer>
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
                                                    if (isInIframe) {
                                                        window.open(`${STORE_BASE_URL}/${asset.username}/${asset._id}`);

                                                        return;
                                                    }

                                                    if (hasIncludesGroupActive) {
                                                        if (asset?.framework?.createdBy) {
                                                            dispatch(actions.setInitialPage());
                                                            dispatch(
                                                                actionsFilters.changeCreatorId(
                                                                    asset.framework.createdBy
                                                                )
                                                            );
                                                            generateQueryParam('creatorId', asset.framework.createdBy);
                                                            dispatch(
                                                                actions.setGroupByCreator({
                                                                    active: 'no',
                                                                    name: '',
                                                                })
                                                            );

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
                                    </Grid>
                                ))}

                                {((isLastPage && hasActiveAssets) || (hasActiveAssets && hasBlockedAssets)) &&
                                    !isInIframe &&
                                    !grid &&
                                    !video &&
                                    !slideshow &&
                                    !creatorId &&
                                    !portfolioWallets &&
                                    tabNavigation.assets?.length <= 0 &&
                                    tabNavigation.artists?.length <= 0 && (
                                        <Grid item display={'flex'} justifyContent={'center'}>
                                            <AssetCardContainer key={1}>
                                                <Box width={'100%'} height={'100%'}>
                                                    <AdditionalAssetsFilterCard />
                                                </Box>
                                            </AssetCardContainer>
                                        </Grid>
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
                                                    if (isInIframe) {
                                                        window.open(`${STORE_BASE_URL}/${asset.username}/${asset._id}`);

                                                        return;
                                                    }

                                                    if (hasIncludesGroupActive) {
                                                        if (asset?.framework?.createdBy) {
                                                            dispatch(
                                                                actionsFilters.changeCreatorId(
                                                                    asset.framework.createdBy
                                                                )
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
                )}
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
                            mb={lgUp ? 4 : 12}
                        >
                            <Button variant="contained" onClick={handleScrollToTop}>
                                Scroll to top
                            </Button>
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
