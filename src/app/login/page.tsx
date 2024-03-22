'use client';
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/home/components/container/PageContainer';

import AuthLogo from '@/app/login/components/AuthLogo';
import AuthLogin from '@/app/login/components/authLogin/container';
import { useEffect } from 'react';
import Image from 'next/image';

export default function Login() {
    return (
        <PageContainer title="Login" description="this is Sample page">
            <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
                <AuthLogo />
                <Grid item xs={12} sm={12} lg={5} xl={4} display="flex" justifyContent="center" alignItems="center">
                    <Box p={4}>
                        <AuthLogin />
                    </Box>
                </Grid>
            </Grid>
        </PageContainer>
    );
}
