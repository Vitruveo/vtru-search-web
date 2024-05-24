'use client';
import React from 'react';
import { Box } from '@mui/material';
import AssetsSidebar from './components/Assets/assetsGrid/AssetsSidebar';
import AssetsList from './components/Assets/assetsGrid/AssetsList';
import PageContainer from './components/Container/PageContainer';
import AppCard from './components/Shared/AppCard';
import Header from './components/Header';

const Search = () => {
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
