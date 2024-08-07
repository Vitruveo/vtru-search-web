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
import { AssetsSliceState } from '@/features/assets/types';

const params = Object.keys(extractObjects(initialState));
const initialParams: Record<string, string> = {};
const paramsSortAsset = Object.keys(extractObjects(initialStateAsset.sort));
const initialParamsSortAsset: Record<string, string> = {
    order: 'latest',
    sold: 'no',
};

const Search = () => {
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const grid = searchParams.get('grid');
    const video = searchParams.get('video');

    useEffect(() => {
        params.forEach((param) => {
            if (searchParams.has(param)) initialParams[param] = searchParams.get(param)!;
        });
        paramsSortAsset.forEach((param) => {
            if (searchParams.has(param)) initialParamsSortAsset[param] = searchParams.get(param)!;
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
            initialParams.taxonomy_aiGeneration = 'full';
            initialParams.taxonomy_nudity = 'no';
        }

        dispatch(actions.initialParams(initialParams));
        dispatch(actionsAssets.setSort(initialParamsSortAsset as unknown as AssetsSliceState['sort']));
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
