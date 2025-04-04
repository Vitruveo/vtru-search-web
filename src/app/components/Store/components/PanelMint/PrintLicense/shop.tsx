'use client';

import React from 'react';
import { Box } from '@mui/material';
import AppCard from '@/app/components/Shared/AppCard';
import { PanelMintProps } from '../component';
import ProductSidebar from './ecommerce/productGrid/ProductSidebar';
import ProductList from './ecommerce/productGrid/ProductList';

interface EcommerceProps extends PanelMintProps {}

const Ecommerce = (props: EcommerceProps) => {
    const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

    return (
        <AppCard>
            <ProductSidebar
                isMobileSidebarOpen={isMobileSidebarOpen}
                onSidebarClose={() => setMobileSidebarOpen(false)}
            />
            <Box sx={{ height: '100vh' }} p={3} flexGrow={1}>
                <ProductList {...props} onClick={() => setMobileSidebarOpen(!isMobileSidebarOpen)} />
            </Box>
        </AppCard>
    );
};

export default Ecommerce;
