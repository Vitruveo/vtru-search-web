'use client';
import { Grid, Box } from '@mui/material';

import PageContainer from '../../home/components/container/PageContainer';
import AuthLogo from '../components/AuthLogo';
import Confirm from './confirm/container';

export default function OneTimePassword() {
    return (
        <PageContainer title="Verification Code" description="this is Sample page">
            <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
                <AuthLogo />
                <Grid item xs={12} sm={12} lg={5} xl={4} display="flex" justifyContent="center" alignItems="center">
                    <Box p={4}>
                        <Confirm />
                    </Box>
                </Grid>
            </Grid>
        </PageContainer>
    );
}
