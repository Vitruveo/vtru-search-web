import { useI18n } from '@/app/hooks/useI18n';
import { useToggle } from '@/app/hooks/useToggle';
import { STORE_BASE_URL } from '@/constants/api';
import { actions } from '@/features/assets';
import { Asset } from '@/features/assets/types';
import { actions as actionsFilters } from '@/features/filters/slice';
import { actions as layoutActions } from '@/features/layout';
import { useDispatch, useSelector } from '@/store/hooks';
import { getAssetPrice, isAssetAvailableLicenses } from '@/utils/assets';
import generateQueryParam from '@/utils/generateQueryParam';
import { hasAssetsInURL } from '@/utils/url-assets';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import cookie from 'cookiejs';
import {
    Badge,
    Box,
    Button,
    Grid,
    IconButton,
    Pagination,
    Skeleton,
    Switch,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import { IconArrowBarToLeft, IconArrowBarToRight, IconCopy, IconFilter } from '@tabler/icons-react';
import Image from 'next/image';
import emptyCart from 'public/images/products/empty-shopping-cart.svg';
import Select, { SingleValue } from 'react-select';
import TabSliders from '../../Sliders/TabSliders';
import { DrawerAsset } from '../components/DrawerAsset';
import DrawerStack from '../components/DrawerStack/DrawerStack';
import NumberOfFilters from '../components/numberOfFilters';
import { AdditionalAssetsFilterCard } from './AdditionalAssetsFilterCard';
import { AssetItem } from './AssetItem';
import './AssetScroll.css';
import Banner from '../../Banner';
import CreatorSection from '../components/CreatorSection';

interface Props {
    isBlockLoader: boolean;
}

const AssetsList = ({ isBlockLoader }: Props) => {
    const { language } = useI18n();
    const optionsForSelectSort = [
        { value: 'latest', label: language['search.select.sort.option.latest'] as string },
        { value: 'priceHighToLow', label: language['search.select.sort.option.priceHighToLow'] as string },
        { value: 'priceLowToHigh', label: language['search.select.sort.option.priceLowToHigh'] as string },
        { value: 'creatorAZ', label: language['search.select.sort.option.creatorAZ'] as string },
        { value: 'creatorZA', label: language['search.select.sort.option.creatorZA'] as string },
        { value: 'consignNewToOld', label: language['search.select.sort.option.consignDateNewToOld'] as string },
        { value: 'consignOldToNew', label: language['search.select.sort.option.consignDateOldToNew'] as string },
    ];

    const optionsForSelectGrouped = [
        { value: 'no', label: language['search.select.grouped.option.ungrouped'] as string },
        { value: 'all', label: language['search.select.grouped.option.grouped'] as string },
        { value: 'noSales', label: language['search.select.grouped.option.groupedNoSales'] as string },
    ];

    const dispatch = useDispatch();
    const theme = useTheme();
    const params = new URLSearchParams(window.location.search);

    const grid = params.get('grid');
    const slideshow = params.get('slideshow');
    const video = params.get('video');
    const creatorId = params.get('creatorId');
    const portfolioWallets = params.get('portfolio_wallets');

    const hasCurated = grid || video || slideshow;

    const [assetView, setAssetView] = useState<any>();
    const [totalFiltersApplied, setTotalFiltersApplied] = useState<number>();
    const [sortOrder, setSortOrder] = useState<string>('latest');
    const [groupByCreator, setGroupByCreator] = useState<string>('no');
    const topRef = useRef<HTMLDivElement>(null);

    const assetDrawer = useToggle();
    const curateStack = useToggle();
    const drawerStack = useToggle();

    const lgUp = useMediaQuery((mediaQuery: Theme) => mediaQuery.breakpoints.up('lg'));
    const smUp = useMediaQuery((mediaQuery: Theme) => mediaQuery.breakpoints.up('sm'));

    const { data: assets, totalPage, page: currentPage, limit } = useSelector((state) => state.assets.data);
    const { organization } = useSelector((state) => state.stores.currentDomain || {});
    const { sort, maxPrice, curateStacks } = useSelector((state) => state.assets);
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
    const isHiddenFilter = useSelector((state) => state.customizer.hidden?.filter);

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

    const getTabTitle = () => {
        if (!hasCurated) return 'Search';
        const title = gridTitle || videoTitle || slideshowTitle;
        return `Stacks - ${title}`;
    };

    useEffect(() => {
        const title = getTabTitle();
        document.title = title;
    }, [hasCurated, gridTitle, videoTitle, slideshowTitle]);

    useEffect(() => {
        const updateTotalFiltersApplied = () => {
            const total = getTotalFiltersApplied();
            setTotalFiltersApplied(total);
        };
        updateTotalFiltersApplied();
    }, [values]);

    useEffect(() => {
        const hasAsset = hasAssetsInURL();

        if (hasAsset) {
            curateStack.activate();
        }
    }, []);

    useEffect(() => {
        if (!grid && !video && !slideshow) {
            // clear cookies
            const domain = window.location.hostname.replace('search.', '');
            cookie.remove('grid');
            document.cookie = 'grid=; path=/; domain=' + domain + '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            cookie.remove('video');
            document.cookie = 'video=; path=/; domain=' + domain + '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

            dispatch(actionsFilters.clearGrid());
            dispatch(actionsFilters.clearVideo());
            dispatch(actionsFilters.clearSlideshow());
        }
    }, [grid, video, slideshow]);

    useEffect(() => {
        if (grid || video || slideshow) setGroupByCreator('no');
    }, []);

    useEffect(() => {
        handleScrollToTop();
    }, [currentPage]);

    useEffect(() => {
        if (grid || video || slideshow) return;
        if (isBlockLoader) return;

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
        const isSelected = curateStacks.some((item) => item._id === asset._id);

        if (isSelected) dispatch(actions.setCurateStacks(curateStacks.filter((item) => item._id !== asset._id)));
        else dispatch(actions.setCurateStacks([...curateStacks, asset]));
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
            generateQueryParam('creatorId', '');
            generateQueryParam('groupByCreator', value);

            dispatch(actions.loadAssets({ page: 1 }));
        }
    };

    const handleChangeCurateStack = () => {
        curateStack.toggle();
        if (!curateStack.isActive) handleChangeSelectGroupByCreator({ value: 'no', label: 'Ungrouped – All' });
    };

    const handleSelectAll = () => dispatch(actions.setCurateStacks(assets));
    const handleUnselectAll = () => dispatch(actions.setCurateStacks([]));

    const onMenuClick = () => dispatch(layoutActions.toggleSidebar());

    const iconColor = curateStacks.length > 0 ? '#763EBD' : 'currentColor';

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
            {!isHiddenFilter && (
                <Box>
                    <IconButton
                        size="small"
                        sx={{ padding: 0, color: theme.palette.grey[300], paddingLeft: '18.5px' }}
                        aria-label="menu"
                        onClick={onMenuClick}
                    >
                        {isSidebarOpen ? <IconArrowBarToLeft /> : <IconArrowBarToRight />}
                    </IconButton>
                </Box>
            )}

            <DrawerAsset assetView={assetView} drawerOpen={assetDrawer.isActive} onClose={onAssetDrawerClose} />

            <DrawerStack drawerStackOpen={drawerStack.isActive} onClose={drawerStack.deactivate} />

            {!isHidden?.order && (
                <Box
                    display={'flex'}
                    flexDirection={smUp ? 'row' : 'column'}
                    alignItems={smUp ? 'center' : 'flex-end'}
                    justifyContent={'space-between'}
                    mb={3}
                    mt={2}
                    paddingInline={3}
                >
                    {!isBlockLoader && (
                        <CreatorSection
                            hasCurated={hasCurated}
                            creatorId={creatorId}
                            returnToPageOne={returnToPageOne}
                        />
                    )}
                    <Box
                        display={'flex'}
                        alignItems={smUp ? 'center' : 'flex-end'}
                        flexDirection={!smUp ? 'column-reverse' : 'row'}
                        gap={smUp ? 'unset' : 2}
                    >
                        {curateStack.isActive && (
                            <Box display="flex" alignItems="center" gap={1}>
                                <Button variant="contained" onClick={handleUnselectAll}>
                                    {language['search.assetList.curateStack.deselectAll'] as string}
                                </Button>
                                <Button variant="contained" onClick={handleSelectAll}>
                                    {language['search.assetList.curateStack.selectAll'] as string}
                                </Button>
                                <Box sx={{ cursor: 'pointer' }} onClick={drawerStack.activate}>
                                    {lgUp && (
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Button variant="contained" fullWidth>
                                                {curateStacks.length}{' '}
                                                {language['search.assetList.curateStack.selected'] as string}
                                            </Button>
                                        </Box>
                                    )}
                                    {!lgUp && (
                                        <Badge
                                            badgeContent={curateStacks.length}
                                            color="primary"
                                            style={{ marginLeft: 2 }}
                                        >
                                            <IconCopy width={20} color={iconColor} />
                                        </Badge>
                                    )}
                                </Box>
                            </Box>
                        )}

                        <Box display="flex" alignItems="center">
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
                            {!lgUp && <NumberOfFilters value={totalFiltersApplied} onClick={openSideBar} />}
                            {!isBlockLoader && (
                                <>
                                    <Switch onChange={handleChangeCurateStack} checked={curateStack.isActive} />
                                    <Box display={'flex'} gap={1}>
                                        <Typography variant={lgUp ? 'h5' : 'inherit'} noWrap>
                                            {language['search.assetList.curateStack'] as string}
                                        </Typography>
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Box>
                </Box>
            )}

            <Grid
                container
                spacing={3}
                padding={3}
                pt={2}
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
            >
                {isBlockLoader && (
                    <Grid item xs={12}>
                        <Banner
                            data={{
                                path: organization?.formats?.banner?.path,
                                description: organization?.description,
                                name: organization?.name,
                            }}
                        />
                    </Grid>
                )}
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

                <Grid item xs={12} paddingInline={3}>
                    {!isHidden?.pageNavigation && (
                        <Box
                            display={'flex'}
                            gap={1}
                            flexDirection={lgUp ? 'row' : 'column'}
                            justifyContent={'space-between'}
                            flexWrap={'wrap'}
                        >
                            {!isHidden?.order ? (
                                <Box
                                    display={'flex'}
                                    justifyContent={'flex-end'}
                                    alignItems={'center'}
                                    flexWrap={'wrap'}
                                    gap={lgUp ? 4 : 2}
                                >
                                    <Box maxWidth={350} display="flex" flexDirection="row" alignItems="center" gap={1}>
                                        <Typography variant="h5">{language['search.order.sort'] as string}:</Typography>
                                        <Select
                                            placeholder="Sort"
                                            options={optionsForSelectSort}
                                            value={optionsForSelectSort.find((option) => option.value === sortOrder)}
                                            onChange={(e) => handleChangeSelectSortOrder(e)}
                                            styles={{
                                                control: (base, state) => ({
                                                    ...base,
                                                    width: '230px',
                                                    borderColor: state.isFocused
                                                        ? theme.palette.primary.main
                                                        : theme.palette.grey[200],
                                                    backgroundColor: theme.palette.background.paper,
                                                    boxShadow: theme.palette.primary.main,
                                                    '&:hover': { borderColor: theme.palette.primary.main },
                                                }),
                                                menu: (base) => ({
                                                    ...base,
                                                    zIndex: 1000,
                                                    color: theme.palette.text.primary,
                                                    backgroundColor: theme.palette.background.paper,
                                                }),
                                                menuList: (base) => ({
                                                    ...base,
                                                    '::-webkit-scrollbar-thumb': {
                                                        backgroundColor: theme.palette.primary.main,
                                                        borderRadius: '4px',
                                                    },
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
                                    <Box display="flex" flexDirection="row" maxWidth={350} alignItems="center" gap={1}>
                                        <Typography variant="h5">
                                            {language['search.order.artists'] as string}:
                                        </Typography>
                                        <Select
                                            placeholder="Artists"
                                            options={optionsForSelectGrouped}
                                            value={optionsForSelectGrouped.find(
                                                (option) => option.value === groupByCreator
                                            )}
                                            onChange={(e) => handleChangeSelectGroupByCreator(e)}
                                            styles={{
                                                control: (base, state) => ({
                                                    ...base,
                                                    width: '180px',
                                                    borderColor: state.isFocused
                                                        ? theme.palette.primary.main
                                                        : theme.palette.grey[200],
                                                    backgroundColor: theme.palette.background.paper,
                                                    boxShadow: theme.palette.primary.main,
                                                    '&:hover': { borderColor: theme.palette.primary.main },
                                                }),
                                                menu: (base) => ({
                                                    ...base,
                                                    zIndex: 1000,
                                                    color: theme.palette.text.primary,
                                                    backgroundColor: theme.palette.background.paper,
                                                }),
                                                menuList: (base) => ({
                                                    ...base,
                                                    '::-webkit-scrollbar-thumb': {
                                                        backgroundColor: theme.palette.primary.main,
                                                        borderRadius: '4px',
                                                    },
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
                                </Box>
                            ) : (
                                <Box />
                            )}

                            <Box
                                display={smUp ? 'flex' : 'none'}
                                alignItems={'center'}
                                justifyContent={'flex-end'}
                                flexWrap={'wrap'}
                                gap={1}
                            >
                                <Typography variant="h5">{language['search.pagination'] as string}:</Typography>
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
                                            minWidth: '100px',
                                            borderColor: state.isFocused
                                                ? theme.palette.primary.main
                                                : theme.palette.grey[200],
                                            backgroundColor: theme.palette.background.paper,
                                            boxShadow: theme.palette.primary.main,
                                            '&:hover': { borderColor: theme.palette.primary.main },
                                        }),
                                        menu: (base) => ({
                                            ...base,
                                            zIndex: 1000,
                                            color: theme.palette.text.primary,
                                            backgroundColor: theme.palette.background.paper,
                                        }),
                                        menuList: (base) => ({
                                            ...base,
                                            '::-webkit-scrollbar-thumb': {
                                                backgroundColor: theme.palette.primary.main,
                                                borderRadius: '4px',
                                            },
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
                                    placeholder="Select"
                                    options={optionsForSelect}
                                    value={currentPage > 1 ? { value: currentPage, label: currentPage } : null}
                                    onChange={(e) => dispatch(actions.setCurrentPage(e?.value || 1))}
                                    styles={{
                                        control: (base, state) => ({
                                            ...base,
                                            minWidth: '100px',
                                            borderColor: state.isFocused
                                                ? theme.palette.primary.main
                                                : theme.palette.grey[200],
                                            backgroundColor: theme.palette.background.paper,
                                            boxShadow: theme.palette.primary.main,
                                            '&:hover': { borderColor: theme.palette.primary.main },
                                        }),
                                        menu: (base) => ({
                                            ...base,
                                            zIndex: 1000,
                                            color: theme.palette.text.primary,
                                            backgroundColor: theme.palette.background.paper,
                                        }),
                                        menuList: (base) => ({
                                            ...base,
                                            '::-webkit-scrollbar-thumb': {
                                                backgroundColor: theme.palette.primary.main,
                                                borderRadius: '4px',
                                            },
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
                        </Box>
                    )}
                </Grid>

                {isBlockLoader && (
                    <Box display={'flex'} width={'100%'} justifyContent={'start'} paddingInline={3} paddingBlock={2}>
                        <CreatorSection
                            hasCurated={hasCurated}
                            creatorId={creatorId}
                            returnToPageOne={returnToPageOne}
                        />
                    </Box>
                )}

                {!isBlockLoader && <Grid item xs={12} mr={4} mb={4}></Grid>}

                {!isHidden?.assets && (
                    <Grid
                        container
                        rowGap={hasIncludesGroupActive ? 2 : 2.85}
                        columnGap={hasIncludesGroupActive ? 6 : 3}
                        overflow={'hidden'}
                        display={'flex'}
                        justifyContent={'center'}
                        margin={'0 1.5%'}
                    >
                        {isLoading ? (
                            <div
                                style={{
                                    width: '100%',
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                    gap: '25px 20px',
                                    paddingTop: '0',
                                }}
                            >
                                {[...Array(20)].map((_, index) => (
                                    <Skeleton
                                        key={index}
                                        variant="rectangular"
                                        width={250}
                                        sx={{
                                            margin: '0 auto',
                                        }}
                                        height={250}
                                    />
                                ))}
                            </div>
                        ) : assets.length > 0 ? (
                            <div
                                ref={topRef}
                                style={{
                                    width: 'auto',
                                    minWidth: smUp ? '79%' : 'unset',
                                    margin: '0 auto',
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                    gap: hasIncludesGroupActive ? '90px' : 30,
                                    paddingTop: hasIncludesGroupActive ? '24px' : '0',
                                    paddingBottom: 40,
                                }}
                            >
                                {activeAssets.map((asset) => (
                                    <AssetItem
                                        key={asset._id}
                                        isAvailable={isAssetAvailableLicenses(asset)}
                                        assetView={assetView}
                                        asset={asset}
                                        isCurated={curateStack.isActive}
                                        checkedCurate={curateStacks?.some((item) => item._id === asset._id)}
                                        handleChangeCurate={() => {
                                            handleCheckCurate(asset);
                                        }}
                                        handleClickImage={() => {
                                            if (isInIframe) {
                                                window.open(
                                                    `${STORE_BASE_URL}/${asset.creator?.username}/${asset._id}`
                                                );

                                                return;
                                            }

                                            if (hasIncludesGroupActive) {
                                                if (asset?.framework?.createdBy) {
                                                    dispatch(actions.setInitialPage());
                                                    dispatch(actionsFilters.changeCreatorId(asset.framework.createdBy));
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
                                        price={getAssetPrice(asset, organization)}
                                        countByCreator={asset.countByCreator}
                                    />
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
                                        <Box display={'flex'} justifyContent={'center'}>
                                            <AdditionalAssetsFilterCard />
                                        </Box>
                                    )}

                                {showAdditionalAssets.value &&
                                    blockedAssets.map((asset) => (
                                        <AssetItem
                                            key={asset._id}
                                            variant="blocked"
                                            isAvailable={isAssetAvailableLicenses(asset)}
                                            assetView={assetView}
                                            asset={asset}
                                            isCurated={curateStack.isActive}
                                            checkedCurate={curateStacks.some((item) => item._id === asset._id)}
                                            handleChangeCurate={() => {
                                                handleCheckCurate(asset);
                                            }}
                                            handleClickImage={() => {
                                                if (isInIframe) {
                                                    window.open(
                                                        `${STORE_BASE_URL}/${asset.creator?.username}/${asset._id}`
                                                    );

                                                    return;
                                                }

                                                if (hasIncludesGroupActive) {
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
                                            price={getAssetPrice(asset, organization)}
                                        />
                                    ))}
                            </div>
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
                                    sx={{
                                        '& .MuiPaginationItem-root': {
                                            '&.Mui-selected': {
                                                backgroundColor: theme.palette.primary.main,
                                            },
                                            '&:focus': {
                                                backgroundColor: theme.palette.primary.main,
                                            },
                                            '&:hover': {
                                                backgroundColor: theme.palette.primary.main,
                                            },
                                        },
                                    }}
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
                            <Button
                                variant="contained"
                                onClick={handleScrollToTop}
                                sx={{
                                    background: theme.palette.primary.main,
                                    '&:hover': {
                                        background: theme.palette.primary.main,
                                    },
                                }}
                            >
                                {language['search.assetList.scrollToTop'] as string}
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
