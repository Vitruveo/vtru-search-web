'use client';
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Theme } from '@mui/material/styles';

import { useDispatch } from '@/store/hooks';
import AssetsSidebar from './components/Assets/assetsGrid/AssetsSidebar';
import AssetsList from './components/Assets/assetsGrid/AssetsList';
import PageContainer from './components/Container/PageContainer';
import AppCard from './components/Shared/AppCard';
import Header from './components/Header';
import { actions, initialState } from '@/features/filters/slice';
import { actions as actionsAssets } from '@/features/assets/slice';
import { extractObjects } from '@/utils/extractObjects';
import StyleElements from './components/Assets/components/StyleElements';

const params = Object.keys(extractObjects(initialState));
const initialParams: Record<string, string> = {};

const Search = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const lgUp = useMediaQuery((mediaQuery: Theme) => mediaQuery.breakpoints.up('lg'));
    const smUp = useMediaQuery((mediaQuery: Theme) => mediaQuery.breakpoints.up('sm'));

    const searchParams = useSearchParams();
    const grid = searchParams.get('grid');
    const video = searchParams.get('video');
    const slideshow = searchParams.get('slideshow');
    const groupByCreator = searchParams.get('groupByCreator');
    const sort_sold = searchParams.get('sort_sold');
    const sort_order = searchParams.get('sort_order');
    const creatorId = searchParams.get('creatorId');

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

    const isInIframe = window.self !== window.top;

    return (
        <div>
            <Header />
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
