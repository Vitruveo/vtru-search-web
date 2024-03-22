'use client';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled, useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import Header from './layout/vertical/header/Header';
import Sidebar from './layout/vertical/sidebar/Sidebar';
import Customizer from './layout/shared/customizer/Customizer';
import Navigation from './layout/horizontal/navbar/Navigation';
import HorizontalHeader from './layout/horizontal/header/Header';
import { useDispatch, useSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import webSocketService from '@/services/websocket';
import { connectWebSocketThunk, loginWebSocketThunk } from '@/features/ws/thunks';
// import { userActionsCreators } from '@/features/user/slice';

const MainWrapper = styled('div')(() => ({
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
}));

const PageWrapper = styled('div')(() => ({
    display: 'flex',
    flexGrow: 1,
    paddingBottom: '30px',
    flexDirection: 'column',
    zIndex: 1,
    backgroundColor: 'transparent',
}));

const PageFooterWrapper = styled('div')(() => ({
    display: 'flex',
    overflowX: 'hidden',
    flexGrow: 1,
    flexDirection: 'column',
    zIndex: 1,
    backgroundColor: 'transparent',
}));

interface Props {
    children: React.ReactNode;
}

const isValidToken = (token: string) => {
    // Sua lógica de validação do token aqui
    return token !== null && token !== undefined && token !== '';
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const customizer = useSelector((state) => state.customizer);
    const token = useSelector((state) => state.user.token);
    const theme = useTheme();

    return (
        <MainWrapper>
            <title>Dashboard</title>
            {/* ------------------------------------------- */}
            {/* Sidebar */}
            {/* ------------------------------------------- */}
            {customizer.isHorizontal ? '' : <Sidebar />}
            {/* ------------------------------------------- */}
            {/* Main Wrapper */}
            {/* ------------------------------------------- */}
            <PageFooterWrapper
                className="page-wrapper"
                sx={{
                    ...(customizer.isCollapse && {
                        [theme.breakpoints.up('lg')]: {
                            ml: `${customizer.MiniSidebarWidth}px`,
                        },
                    }),
                }}
            >
                {/* ------------------------------------------- */}
                {/* Header */}
                {/* ------------------------------------------- */}
                {customizer.isHorizontal ? <HorizontalHeader /> : <Header />}
                {/* PageContent */}
                {customizer.isHorizontal ? <Navigation /> : ''}
                <Box
                    sx={{
                        maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
                    }}
                >
                    {/* ------------------------------------------- */}
                    {/* PageContent */}
                    {/* ------------------------------------------- */}

                    <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
                        {/* <Outlet /> */}
                        {children}
                        {/* <Index /> */}
                    </Box>

                    {/* ------------------------------------------- */}
                    {/* End Page */}
                    {/* ------------------------------------------- */}
                </Box>
            </PageFooterWrapper>
        </MainWrapper>
    );
}
