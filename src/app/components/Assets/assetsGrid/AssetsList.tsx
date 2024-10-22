import { useI18n } from '@/app/hooks/useI18n';
import { useToggle } from '@/app/hooks/useToggle';
import { STORE_BASE_URL } from '@/constants/api';
import { actions } from '@/features/assets';
import { Asset } from '@/features/assets/types';
import { actions as actionsFilters } from '@/features/filters/slice';
import { actions as layoutActions } from '@/features/layout';
import { useDispatch, useSelector } from '@/store/hooks';
import { getAssetPrice, isAssetAvailable } from '@/utils/assets';
import generateQueryParam from '@/utils/generateQueryParam';
import { hasAssetsInURL } from '@/utils/url-assets';
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
import { useEffect, useMemo, useRef, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import TabSliders from '../../Sliders/TabSliders';
import { DrawerAsset } from '../components/DrawerAsset';
import DrawerStack from '../components/DrawerStack/DrawerStack';
import NumberOfFilters from '../components/numberOfFilters';
import { AdditionalAssetsFilterCard } from './AdditionalAssetsFilterCard';
import { AssetCardContainer, AssetItem } from './AssetItem';
import './AssetScroll.css';

const optionsForSelectSort = [
    { value: 'latest', label: 'Latest' },
    { value: 'priceHighToLow', label: 'Price – High to Low' },
    { value: 'priceLowToHigh', label: 'Price – Low to High' },
    { value: 'creatorAZ', label: 'Creator – a-z' },
    { value: 'creatorZA', label: 'Creator – z-a' },
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
            <DrawerAsset assetView={assetView} drawerOpen={assetDrawer.isActive} onClose={onAssetDrawerClose} />

            <DrawerStack drawerStackOpen={drawerStack.isActive} onClose={drawerStack.deactivate} />

            {!isHidden?.order && (
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    pr={4}
                    mb={4}
                    mt={2}
                    ml={2}
                >
                    <Box display="flex" alignItems={'center'} gap={1}>
                        {lgUp && (
                            <Box ml={1.5}>
                                <IconButton
                                    sx={{ color: theme.palette.grey[300] }}
                                    aria-label="menu"
                                    onClick={onMenuClick}
                                >
                                    {isSidebarOpen ? <IconArrowBarToLeft /> : <IconArrowBarToRight />}
                                </IconButton>
                            </Box>
                        )}
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
                    </Box>
                    <Box display={'flex'} alignItems={'center'} flexDirection={!smUp ? 'column-reverse' : 'row'}>
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

                        <Box display="flex" alignItems="center" mr={8}>
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
                            <Switch onChange={handleChangeCurateStack} checked={curateStack.isActive} />
                            <Box display={'flex'} gap={1}>
                                <Typography variant={lgUp ? 'h5' : 'inherit'} noWrap>
                                    {language['search.assetList.curateStack'] as string}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
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

                <Grid item xs={12}>
                    {!isHidden?.pageNavigation && (
                        <Box
                            display={'flex'}
                            gap={1}
                            flexDirection={lgUp ? 'row' : 'column'}
                            justifyContent={'space-between'}
                            pr={4}
                            flexWrap={'wrap'}
                        >
                            {!isHidden?.order ? (
                                <Box
                                    display={'flex'}
                                    justifyContent={'flex-end'}
                                    alignItems={'center'}
                                    flexWrap={'wrap'}
                                    gap={lgUp ? 4 : 2}
                                    mr={7.5}
                                >
                                    <Box maxWidth={350} display="flex" flexDirection="row" alignItems="center" gap={1}>
                                        <Typography variant="h5">Sort:</Typography>
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
                                    <Box display="flex" flexDirection="row" maxWidth={350} alignItems="center" gap={1}>
                                        <Typography variant="h5">Artists:</Typography>
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
                                mr={7.5}
                            >
                                <Typography variant="h5">Pagination:</Typography>
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
                        </Box>
                    )}
                </Grid>

                <Grid item xs={12} mr={4} mb={4}></Grid>

                {!isHidden?.assets && (
                    <Grid container paddingInline={4} paddingBottom={8} overflow={'hidden'}>
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
                                style={{
                                    width: 'auto',
                                    minWidth: '79%',
                                    margin: '0 auto',
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                    gap: hasIncludesGroupActive ? '90px' : 30,
                                    paddingTop: hasIncludesGroupActive ? '24px' : '0',
                                }}
                            >
                                {activeAssets.map((asset) => (
                                    <AssetItem
                                        key={asset._id}
                                        isAvailable={isAssetAvailable(asset)}
                                        assetView={assetView}
                                        asset={asset}
                                        isCurated={curateStack.isActive}
                                        checkedCurate={curateStacks?.some((item) => item._id === asset._id)}
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
                                        price={getAssetPrice(asset)}
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
                                    tabNavigation.artists?.length <= 0 && <AdditionalAssetsFilterCard />}

                                {showAdditionalAssets.value &&
                                    blockedAssets.map((asset) => (
                                        <AssetCardContainer key={asset._id}>
                                            <AssetItem
                                                variant="blocked"
                                                isAvailable={isAssetAvailable(asset)}
                                                assetView={assetView}
                                                asset={asset}
                                                isCurated={curateStack.isActive}
                                                checkedCurate={curateStacks.some((item) => item._id === asset._id)}
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
