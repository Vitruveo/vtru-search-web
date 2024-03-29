'use client';

import React from 'react';
import Box from '@mui/material/Box';
import PageContainer from '@/app/home/components/container/PageContainer';
import ProductList from '@/app/home/components/apps/ecommerce/productGrid/ProductList';
import ProductSidebar from '@/app/home/components/apps/ecommerce/productGrid/ProductSidebar';
import AppCard from '@/app/home/components/shared/AppCard';
import { Container } from '@mui/material';
import { useSelector } from '@/store/hooks';

const Ecommerce = () => {
    const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(true);

    const customizer = useSelector((state) => state.customizer);

    return (
        <Container
            sx={{
                maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100dvw!important',
                width: 'fit-content',
            }}
        >
            <PageContainer title="Shop" description="this is Shop">
                <AppCard>
                    {/* ------------------------------------------- */}
                    {/* Left part */}
                    {/* ------------------------------------------- */}
                    <ProductSidebar
                        isMobileSidebarOpen={isMobileSidebarOpen}
                        onSidebarClose={() => setMobileSidebarOpen(false)}
                    />
                    {/* ------------------------------------------- */}
                    {/* Right part */}
                    {/* ------------------------------------------- */}
                    <Box p={3} flexGrow={1} sx={{ width: 'fit-content' }}>
                        <ProductList onClick={() => setMobileSidebarOpen(!isMobileSidebarOpen)} />
                    </Box>
                </AppCard>
            </PageContainer>
        </Container>
    );
};

export default Ecommerce;
