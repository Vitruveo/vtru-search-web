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
import { actions as actionsStores } from '@/features/stores/slice';
import { extractObjects } from '@/utils/extractObjects';
import StyleElements from './components/Assets/components/StyleElements';
import { useToastr } from './hooks/useToastr';
import { GENERAL_STORAGE_URL } from '@/constants/aws';

const params = Object.keys(extractObjects(initialState));
const initialParams: Record<string, string> = {};
const initialFilters: Record<string, any> = {};

interface Props {
    data: {
        hasSubdomain: boolean;
        hasSubdomainError: boolean;
        subdomain: string;
    };
}

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

const Search = (props: Props) => {
    const { subdomain, hasSubdomainError, hasSubdomain } = props.data;

    const theme = useTheme();
    const dispatch = useDispatch();
    const toast = useToastr();
    const lgUp = useMediaQuery((mediaQuery: Theme) => mediaQuery.breakpoints.up('lg'));
    const smUp = useMediaQuery((mediaQuery: Theme) => mediaQuery.breakpoints.up('sm'));
    const { artworks: storeFilters, organization } = useSelector((state) => state.stores.data);
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
        console.log('colocar esse trecho dentro do if');
        dispatch(actionsStores.getStoresRequest({ subdomain: 'testing-id' }));
    }, []);

    useEffect(() => {
        if (hasSubdomain && subdomain) {
            toast.display({ message: `Welcome to ${subdomain}!`, type: 'success' });
        }

        if (hasSubdomainError) {
            toast.display({ message: 'Invalid subdomain!', type: 'error' });
        }
    }, []);

    useEffect(() => {
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

        dispatch(actions.initialParams(initialParams));
        dispatch(actionsAssets.initialSort({ order: sort_order || 'latest', sold: sort_sold || 'no' }));

        if (creatorId) {
            dispatch(actionsAssets.startNormal());
        } else if (groupByCreator && (groupByCreator === 'no' || !['noSales', 'all'].includes(groupByCreator)))
            dispatch(actionsAssets.startNormal());
        else if (groupByCreator && groupByCreator === 'noSales') dispatch(actionsAssets.startGrouped('noSales'));
        else dispatch(actionsAssets.startGrouped('all'));
    }, [searchParams]);

    useEffect(() => {
        if (!hasFilter) return;

        Object.entries(storeFilters?.general?.shortcuts || {}).forEach(([key, _value]) => {
            const { key: filterKey, value: filterValue } = fixedShortcuts.get(key)!;
            if (initialFilters[filterKey])
                initialFilters[filterKey] = `${initialFilters[filterKey]},${filterValue.join(',')}`;
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
            if (Array.isArray(value)) initialFilters[`taxonomy_${key}`] = value.join(',');
        });

        Object.entries(storeFilters?.artists || {}).forEach(([key, value]) => {
            if (Array.isArray(value)) initialFilters[`creators_${key}`] = value.join(',');
        });

        dispatch(actions.initialParams(initialFilters));
        dispatch(actionsAssets.initialSort({ order: 'latest', sold: initialFilters.sort_sold || 'no' }));
        dispatch(actionsAssets.startGrouped('all'));
    }, [storeFilters]);

    useEffect(() => {
        if (organization?.formats?.logo?.square?.path) {
            const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
            const logoPath = organization.formats.logo.square.path;
            favicon.rel = 'icon';
            favicon.type = 'image/png';
            favicon.href = `${GENERAL_STORAGE_URL}/${logoPath}`;
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
            />
            <PageContainer title="Search" description="this is Search">
                <AppCard>
                    <AssetsSidebar />
                    <Box flexGrow={1}>
                        <AssetsList />
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
                <StyleElements />
            </Box>
        </div>
    );
};

export default Search;
