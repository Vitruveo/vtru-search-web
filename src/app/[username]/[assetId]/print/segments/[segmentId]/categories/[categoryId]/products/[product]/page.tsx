'use client';

import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import Image from 'next/image';

// components
import ProductCarousel from '@/app/components/Store/components/PanelMint/PrintLicense/ecommerce/productDetail/ProductCarousel';
import { Breadcrumb } from '@/app/components/Breadcrumb';

const breadcrumbItems = [
    {
        label: 'Home',
        href: '/{username}/{assetId}/print/segments',
    },
    {
        label: 'Display',
        href: '/{username}/{assetId}/print/segments/{segmentId}/categories',
    },
    {
        label: 'Posters',
        href: '/{username}/{assetId}/print/segments/{segmentId}/categories/{categoryId}/products',
    },
    {
        label: 'Poster 1',
    },
];

interface PrintProductProps {
    params: {
        username: string;
        assetId: string;
        segmentId: string;
        categoryId: string;
    };
}

export default function PrintProductDetails({ params }: PrintProductProps) {
    return (
        <Box
            padding={2}
            sx={{
                overflowY: 'auto',
                height: '100vh',
                paddingBottom: 10,
            }}
        >
            <Box display="flex" justifyContent="center" alignItems="center">
                <Image src={'/images/logos/XIBIT-logo_dark.png'} alt="logo" height={40} width={120} priority />
            </Box>

            <Typography variant="h1" mt={2}>
                Print License
            </Typography>

            <Breadcrumb items={breadcrumbItems} params={params} />

            <Box mt={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} lg={6}>
                        <ProductCarousel />
                    </Grid>

                    <Grid item xs={12} sm={12} lg={6}>
                        <Box display="flex" alignItems="center" mt={2}>
                            <Chip label="In Stock" color="success" size="small" />
                            <Typography color="textSecondary" variant="caption" ml={1} textTransform="capitalize">
                                Posters
                            </Typography>
                        </Box>

                        <Typography fontWeight="600" variant="h4" mt={2}>
                            Poster 1
                        </Typography>
                        <Typography variant="subtitle2" mt={1}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim facere repellat neque incidunt
                            fugiat possimus ratione corporis esse dicta. Aut, exercitationem dolor pariatur eum neque
                            reprehenderit unde dolore. Soluta, animi.
                        </Typography>

                        <Typography mt={2} variant="h3" fontWeight={600}>
                            $129.9
                        </Typography>

                        <Grid container spacing={2} mt={3}>
                            <Grid item xs={12} lg={4} md={6}>
                                <Button color="primary" size="large" fullWidth variant="contained">
                                    Buy Now
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
