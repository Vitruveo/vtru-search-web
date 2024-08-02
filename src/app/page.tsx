'use client';
import React, { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Box } from '@mui/material';

import { useDispatch } from '@/store/hooks';
import AssetsSidebar from './components/Assets/assetsGrid/AssetsSidebar';
import AssetsList from './components/Assets/assetsGrid/AssetsList';
import PageContainer from './components/Container/PageContainer';
import AppCard from './components/Shared/AppCard';
import Header from './components/Header';
import { actions } from '@/features/filters/slice';
import { actions as actionsAssets } from '@/features/assets/slice';

const Search = () => {
    const dispatch = useDispatch();
    const searchParams = useSearchParams();

    const sort = searchParams.get('sort');
    const sold = searchParams.get('sold');
    const ai = searchParams.get('ai'); // default = true
    const nudity = searchParams.get('nudity'); // default = false
    const search = searchParams.get('search');
    const grid = searchParams.get('grid');

    useEffect(() => {
        dispatch(
            actions.change({
                key: 'taxonomy',
                value: {
                    nudity: nudity === 'true' ? ['yes'] : ['no'],
                    aiGeneration: ai === 'false' ? ['none'] : ['full'],
                },
            })
        );
        if (grid) dispatch(actionsAssets.setGridId(grid));
        if (search) dispatch(actions.changeName({ name: search }));

        dispatch(actionsAssets.setSort({ order: sort || 'latest', isIncludeSold: sold === 'true' }));
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
