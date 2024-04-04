'use client';
import React from 'react';
import { Box } from '@mui/material';

import RootLayout from './layout';
import AssetsSidebar from './components/Assets/assetsGrid/AssetsSidebar';
import AssetsList from './components/Assets/assetsGrid/AssetsList';
import PageContainer from './components/Container/PageContainer';
import AppCard from './components/Shared/AppCard';
import Header from './components/Header';

const Search = () => {
    const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(true);

    return (
        <RootLayout>
            <Header />
            <PageContainer title="Search" description="this is Search">
                <AppCard>
                    <AssetsSidebar
                        isMobileSidebarOpen={isMobileSidebarOpen}
                        onSidebarClose={() => setMobileSidebarOpen(false)}
                    />

                    <Box flexGrow={1}>
                        <AssetsList onClick={() => setMobileSidebarOpen(!isMobileSidebarOpen)} />
                    </Box>
                </AppCard>
            </PageContainer>
        </RootLayout>
    );
};

export default Search;
