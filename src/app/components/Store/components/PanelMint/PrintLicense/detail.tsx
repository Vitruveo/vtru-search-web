'use client';

import Grid from '@mui/material/Grid';
import { Box, IconButton, Stack } from '@mui/material';
import Cart from './ecommerce/productCart/Cart';
import { IconArrowBack, IconArrowLeft } from '@tabler/icons-react';
import { PanelMintProps } from '../component';
import { useDispatch } from '@/store/hooks';
import ChildCard from '@/app/components/Shared/ChildCard';
import ProductCarousel from './ecommerce/productDetail/ProductCarousel';
import ProductDetail from './ecommerce/productDetail';
import ProductDesc from './ecommerce/productDetail/ProductDesc';
import ProductRelated from './ecommerce/productDetail/ProductRelated';
import { setSelectedProduct } from '@/features/ecommerce/slice';

interface EcommerceDetailProps extends PanelMintProps {}

const EcommerceDetail = ({ data, actions }: EcommerceDetailProps) => {
    const dispatch = useDispatch();

    const handleSelectedProduct = () => {
        dispatch(setSelectedProduct(''));
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12} lg={12}>
                <ChildCard noBorder>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" pb={3}>
                        {
                            <IconButton
                                size="small"
                                aria-label="close"
                                onClick={handleSelectedProduct}
                                sx={{ color: 'text' }}
                            >
                                <IconArrowLeft size={'1.7rem'} />
                            </IconButton>
                        }

                        <Box display="flex">
                            <Cart />
                        </Box>
                    </Stack>
                    <Box sx={{ height: '100vh', overflow: 'auto' }} flexGrow={1}>
                        <ChildCard>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={12} lg={6}>
                                    {/* <ProductCarousel /> */}
                                </Grid>
                                <Grid item xs={12} sm={12} lg={6}>
                                    <ProductDetail />
                                </Grid>
                            </Grid>
                        </ChildCard>
                        <Grid marginBottom={20} item xs={12} sm={12} lg={12}>
                            <ProductDesc />
                        </Grid>
                        {/* <Grid item xs={12} sm={12} lg={12}>
                            <ProductRelated />
                        </Grid> */}
                    </Box>
                </ChildCard>
            </Grid>
        </Grid>
    );
};

export default EcommerceDetail;
