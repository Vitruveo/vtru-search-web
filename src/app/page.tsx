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
    const router = useRouter();

    const sort = searchParams.get('sort');
    const order = searchParams.get('order');
    const sold = searchParams.get('sold');
    const ai = searchParams.get('ai'); // default = true
    const nudity = searchParams.get('nudity'); // default = false

    if (!sort && !order && !sold && !ai && !nudity) {
        // redirect to home with default ?sort=latest&order=asc&sold=false&ai=true&nudity=false
        const params = new URLSearchParams(window.location.search);
        params.set('sort', 'latest');
        // params.set('order', 'asc');
        params.set('sold', 'false');
        params.set('ai', 'true');
        params.set('nudity', 'false');

        window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
        window.location.reload();
    }

    useEffect(() => {
        dispatch(
            actions.change({
                key: 'taxonomy',
                value: {
                    nudity: nudity === 'false' ? ['no'] : nudity === 'true' ? ['yes'] : [],
                    aiGeneration: ai === 'true' ? ['full'] : ai === 'false' ? ['none'] : [],
                },
            })
        );
        dispatch(
            actionsAssets.setSort({
                order: 'latest',
                isIncludeSold: false,
            })
        );
    }, []);

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
