'use client';

import React from 'react';
import Box from '@mui/material/Box';
import PageContainer from '@/app/home/components/container/PageContainer';
import AppCard from '@/app/home/components/shared/AppCard';
import AssetsList from './components/apps/assets/assetsGrid/AssetsList';
import AssetsSidebar from './components/apps/assets/assetsGrid/AssetsSidebar';

const Store = () => {
    const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(true);

    return (
        <PageContainer title="Shop" description="this is Shop">
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
    );
};

export default Store;
