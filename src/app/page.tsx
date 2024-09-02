'use client';
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box } from '@mui/material';

import { useDispatch } from '@/store/hooks';
import AssetsSidebar from './components/Assets/assetsGrid/AssetsSidebar';
import AssetsList from './components/Assets/assetsGrid/AssetsList';
import PageContainer from './components/Container/PageContainer';
import AppCard from './components/Shared/AppCard';
import Header from './components/Header';
import { actions, initialState } from '@/features/filters/slice';
import { actions as actionsAssets, initialState as initialStateAsset } from '@/features/assets/slice';
import { extractObjects } from '@/utils/extractObjects';

const params = Object.keys(extractObjects(initialState));
const initialParams: Record<string, string> = {};

const Search = () => {
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const grid = searchParams.get('grid');
    const video = searchParams.get('video');
    const groupByCreator = searchParams.get('groupByCreator');
    const sort_sold = searchParams.get('sort_sold');
    const sort_order = searchParams.get('sort_order');

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

        if (Object.keys(initialParams).length === 0) {
            initialParams.taxonomy_aiGeneration = 'partial,none';
            initialParams.taxonomy_nudity = 'no';
        }

        dispatch(actions.initialParams(initialParams));
        dispatch(actionsAssets.initialSort({ order: sort_order || 'latest', sold: sort_sold || 'no' }));

        if (groupByCreator === 'no') dispatch(actionsAssets.startNormal());
        else dispatch(actionsAssets.startGrouped());
    }, [searchParams]);

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
        </div>
    );
};

export default Search;
