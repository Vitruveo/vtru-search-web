'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { Inter } from 'next/font/google';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PersistGate } from 'redux-persist/integration/react';
import CssBaseline from '@mui/material/CssBaseline';
import '@/utils/i18n';
import 'toastr/build/toastr.min.css';
import 'react-image-crop/dist/ReactCrop.css';

import store, { persistor } from '@/store';
import { NextAppDirEmotionCacheProvider } from '@/utils/theme/EmotionCache';
import { ThemeSettings } from '@/utils/theme/Theme';
import { themeConfig } from '@/utils/theme/ThemeConfig';
import PageContainer from './components/container/PageContainer';
import AppCard from './components/shared/AppCard';
import AssetsSidebar from './components/assets/assetsGrid/AssetsSidebar';
import { Box } from '@mui/material';
import AssetsList from './components/assets/assetsGrid/AssetsList';

const inter = Inter({ subsets: ['latin'] });

const MyApp = ({ children }: { children: React.ReactNode }) => {
    const theme = ThemeSettings();

    return (
        <NextAppDirEmotionCacheProvider options={{ key: 'modernize' }}>
            <ThemeProvider theme={createTheme(themeConfig(theme))}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </NextAppDirEmotionCacheProvider>
    );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(true);

    return (
        <html lang="en">
            <body style={{ overflow: 'hidden' }} className={inter.className}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <MyApp>
                            <PageContainer title="Search" description="this is Search">
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
                        </MyApp>
                    </PersistGate>
                </Provider>
            </body>
        </html>
    );
}
