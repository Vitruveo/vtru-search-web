'use client';
import { Box, IconButton, Stack } from '@mui/material';
import { IconArrowLeft } from '@tabler/icons-react';
import PageContainer from '@/app/components/Container/PageContainer';
import ChildCard from '@/app/components/Shared/ChildCard';
import ProductCheckout from './ecommerce/productCheckout/ProductCheckout';
import { useDispatch } from '@/store/hooks';
import { setCheckoutProgress } from '@/features/ecommerce/slice';

const EcommerceCheckout = () => {
    const dispatch = useDispatch();

    const handleExitCheckout = () => {
        dispatch(setCheckoutProgress(false));
    };

    return (
        <ChildCard noBorder>
            <IconButton size="small" aria-label="close" onClick={handleExitCheckout} sx={{ color: 'text' }}>
                <IconArrowLeft size={'1.7rem'} />
            </IconButton>

            <Box sx={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }} flexGrow={1}>
                <ProductCheckout />
            </Box>
        </ChildCard>
    );
};

export default EcommerceCheckout;
