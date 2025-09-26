'use client';
import Image from 'next/image';
import { Box, Link, Typography, useMediaQuery } from '@mui/material';
import { NODE_ENV } from '@/constants/api';
import { useSelector } from '@/store/hooks';

export default function Congratulations() {
    const isMobile = useMediaQuery('(max-width: 900px)');
    const searchUrl = useSelector((state) => state.redirects.data[NODE_ENV].xibit.search_url);

    return (
        <Box
            width="100%"
            height={isMobile ? '90vh' : '100vh'}
            display="flex"
            flexDirection="column"
            gap={8}
            marginBlock={10}
            overflow={'auto'}
        >
            <Box display="flex" justifyContent="center" alignItems="center">
                <Image src={'/images/logos/XIBIT-logo_dark.png'} alt="logo" height={80} width={240} priority />
            </Box>
            <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
                gap={6}
                paddingInline={isMobile ? '5%' : '10%'}
            >
                <Typography variant="h1" sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    Thank you for your order!
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '2rem', lineHeight: 1.5 }}>
                    Your payment has been received and a receipt has been emailed to you. Fulfillment will take
                    approximately 2-3 weeks.
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '2rem', lineHeight: 1.5 }}>
                    Meanwhile, if you have any questions please visit{' '}
                    <Link
                        href="https://support.xibit.app"
                        rel="noopener noreferrer"
                        target="_blank"
                        style={{ textDecoration: 'none' }}
                        color="inherit"
                    >
                        support.xibit.app
                    </Link>
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Link href={`${searchUrl}`} rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <Typography variant="h1" sx={{ fontSize: '2rem' }}>
                        Back to Home
                    </Typography>
                </Link>
            </Box>
        </Box>
    );
}
