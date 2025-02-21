'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Theme } from '@mui/material/styles';

import { useDispatch, useSelector } from '@/store/hooks';
import AssetsSidebar from './components/Assets/assetsGrid/AssetsSidebar';
import AssetsList from './components/Assets/assetsGrid/AssetsList';
import PageContainer from './components/Container/PageContainer';
import AppCard from './components/Shared/AppCard';
import Header from './components/Header';
import { actions, initialState } from '@/features/filters/slice';
import { actions as actionsAssets } from '@/features/assets/slice';
import { extractObjects } from '@/utils/extractObjects';
import StyleElements from './components/Assets/components/StyleElements';
import { STORES_STORAGE_URL } from '@/constants/aws';
import { useDomainContext } from './context/domain';
import { WatherMark } from './components/WatherMark';

const params = Object.keys(extractObjects(initialState));
const initialParams: Record<string, string> = {};
const initialFilters: Record<string, any> = {};

const fixedShortcuts = new Map([
    ['animation', { key: 'taxonomy_category', value: ['video'] }],
    ['photography', { key: 'taxonomy_category', value: ['photography'] }],
    ['digitalArt', { key: 'taxonomy_objectType', value: ['digitalart'] }],
    ['physicalArt', { key: 'taxonomy_objectType', value: ['physicalart'] }],
    ['hasBTS', { key: 'hasBts', value: ['yes'] }],
    ['hideAI', { key: 'taxonomy_aiGeneration', value: ['partial', 'none'] }],
    ['hideNudity', { key: 'taxonomy_nudity', value: ['no'] }],
    ['includeSold', { key: 'sort_sold', value: ['yes'] }],
]);

const Search = () => {
    const { subdomain, isValidSubdomain } = useDomainContext();

    const theme = useTheme();
    const dispatch = useDispatch();

    const lgUp = useMediaQuery((mediaQuery: Theme) => mediaQuery.breakpoints.up('lg'));
    const smUp = useMediaQuery((mediaQuery: Theme) => mediaQuery.breakpoints.up('sm'));
    const {
        artworks: storeFilters,
        organization,
        appearanceContent,
        status,
    } = useSelector((state) => state.stores.currentDomain || {});
    const hasFilter = Object.entries(storeFilters || {}).some(([_key, value]) => Object.keys(value).length !== 0);

    const searchParams = useSearchParams();
    const grid = searchParams.get('grid');
    const video = searchParams.get('video');
    const slideshow = searchParams.get('slideshow');
    const groupByCreator = searchParams.get('groupByCreator');
    const sort_sold = searchParams.get('sort_sold');
    const sort_order = searchParams.get('sort_order');
    const creatorId = searchParams.get('creatorId');

    useEffect(() => {
        if (isValidSubdomain && subdomain) return;

        params.forEach((param) => {
            if (searchParams.has(param)) initialParams[param] = searchParams.get(param)!;
        });

        if (grid) {
            dispatch(actionsAssets.setGridId(grid));
            return;
        }

        if (video) {
            dispatch(actionsAssets.setVideoId(video));
            return;
        }

        if (slideshow) {
            dispatch(actionsAssets.setSlideshowId(slideshow));
            return;
        }

        if (Object.keys(initialParams).length === 0) {
            initialParams.taxonomy_aiGeneration = 'partial,none';
            initialParams.taxonomy_nudity = 'no';
        }

        dispatch(actions.initialParams({ initialParams }));
        dispatch(actionsAssets.initialSort({ sort: { order: sort_order || 'latest', sold: sort_sold || 'no' } }));

        if (creatorId) {
            dispatch(actionsAssets.startNormal());
        } else if (groupByCreator && (groupByCreator === 'no' || !['noSales', 'all'].includes(groupByCreator)))
            dispatch(actionsAssets.startNormal());
        else if (groupByCreator && groupByCreator === 'noSales') dispatch(actionsAssets.startGrouped('noSales'));
        else dispatch(actionsAssets.startGrouped('all'));
    }, [searchParams]);

    useEffect(() => {
        if (!hasFilter) {
            initialFilters.taxonomy_aiGeneration = 'partial,none';
            initialFilters.taxonomy_nudity = 'no';
            dispatch(actions.initialParams({ initialParams: initialFilters }));
            dispatch(
                actionsAssets.initialSort({
                    sort: { order: 'latest', sold: initialFilters.sort_sold || 'no' },
                    persistStoresSort: true,
                })
            );
            if (subdomain && isValidSubdomain) dispatch(actionsAssets.startGrouped('no'));
            else dispatch(actionsAssets.startGrouped('all'));
            return;
        }

        Object.entries(storeFilters?.general?.shortcuts || {}).forEach(([key, _value]) => {
            const { key: filterKey, value: filterValue } = fixedShortcuts.get(key)!;
            if (initialFilters[filterKey]) initialFilters[filterKey] = `${filterValue.join(',')}`;
            else initialFilters[filterKey] = filterValue.join(',');
        });

        if (storeFilters?.general?.licenses?.enabled) {
            initialFilters.price_min = storeFilters?.general?.licenses?.minPrice.toString();
            initialFilters.price_max = storeFilters?.general?.licenses?.maxPrice.toString();
        }

        Object.entries(storeFilters?.context || {}).forEach(([key, value]) => {
            if (Array.isArray(value)) initialFilters[`context_${key}`] = value.join(',');
            if (key === 'precision' && typeof value === 'number')
                initialFilters.colorPrecision_value = value.toString();
        });

        Object.entries(storeFilters?.taxonomy || {}).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                if (key === 'arEnabled') initialFilters[`taxonomy_arenabled`] = value.join(',');
                initialFilters[`taxonomy_${key}`] = value.join(',');
            }
        });

        Object.entries(storeFilters?.artists || {}).forEach(([key, value]) => {
            if (Array.isArray(value)) initialFilters[`creators_${key}`] = value.join(',');
        });

        initialFilters.taxonomy_aiGeneration = 'partial,none';
        initialFilters.taxonomy_nudity = 'no';

        dispatch(actions.initialParams({ initialParams: initialFilters, persistStoresFilters: true }));
        dispatch(
            actionsAssets.initialSort({
                sort: { order: 'latest', sold: initialFilters.sort_sold || 'no' },
                persistStoresSort: true,
            })
        );
        if (subdomain && isValidSubdomain) dispatch(actionsAssets.startGrouped('no'));
        else dispatch(actionsAssets.startGrouped('all'));
    }, [storeFilters]);

    useEffect(() => {
        if (organization?.formats?.logo?.square?.path) {
            const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
            const logoPath = organization.formats.logo.square.path;
            favicon.rel = 'icon';
            favicon.type = 'image/png';
            favicon.href = `${STORES_STORAGE_URL}/${logoPath}`;
            document.head.appendChild(favicon);
        }
    }, [organization]);

    const isInIframe = window.self !== window.top;

    return (
        <div>
            <Header
                rssOptions={[
                    { flagname: 'JSON', value: 'json' },
                    { flagname: 'XML', value: 'xml' },
                ]}
                isPersonalizedStore={!!isValidSubdomain && !!subdomain}
                showProjects={!isValidSubdomain && !subdomain}
            />
            <PageContainer title="Search" description="this is Search">
                <AppCard>
                    <AssetsSidebar />
                    <Box flexGrow={1}>
                        <AssetsList isBlockLoader={!!isValidSubdomain && !!subdomain} />
                    </Box>
                </AppCard>
            </PageContainer>
            <Box
                display={isInIframe ? 'none' : 'inherit'}
                position={'fixed'}
                top={lgUp ? 21 : smUp ? 17 : 13}
                right={-5}
                bgcolor={theme.palette.grey[100]}
                width={lgUp || smUp ? 85 : 77}
                zIndex={9999}
            >
                <StyleElements
                    initialHidden={appearanceContent?.hideElements}
                    isPersonalizedStore={!!isValidSubdomain && !!subdomain}
                />
            </Box>

            {isValidSubdomain && subdomain && status === 'pending' && <WatherMark />}
        </div>
    );
};

export default Search;
