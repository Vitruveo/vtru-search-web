// src/app/layout.tsx
'use client'; // Isso indica que é um componente de cliente
import store, { persistor } from '@/store';
import '@/utils/i18n';
import { NextAppDirEmotionCacheProvider } from '@/utils/theme/EmotionCache';
import { ThemeSettings } from '@/utils/theme/Theme';
import { themeConfig } from '@/utils/theme/ThemeConfig';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google';
import React from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'toastr/build/toastr.min.css';
import CustomizedSnackbar from './common/toastr';
import Web3WagmiProvider from './components/Store/providers/wagmiProvider';
import { useToastr } from './hooks/useToastr';
import { DomainProvider } from './context/domain';

const inter = Inter({ subsets: ['latin'] });

const MyApp = ({ children }: { children: React.ReactNode }) => {
    const theme = ThemeSettings();
    const toastr = useToastr();

    return (
        <NextAppDirEmotionCacheProvider options={{ key: 'modernize' }}>
            <ThemeProvider theme={createTheme(themeConfig(theme))}>
                <CustomizedSnackbar
                    open={toastr.data.open}
                    type={toastr.data.type}
                    message={toastr.data.message}
                    setOpenState={toastr.setState}
                />
                <CssBaseline />
                {children}
            </ThemeProvider>
        </NextAppDirEmotionCacheProvider>
    );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
                <meta httpEquiv="refresh" content="3600" />
            </head>
            <body style={{ overflow: 'hidden', backgroundColor: '#171C23' }} className={inter.className}>
                <Provider store={store}>
                    <Web3WagmiProvider>
                        <PersistGate loading={null} persistor={persistor}>
                            <DomainProvider>
                                <MyApp>{children}</MyApp>
                            </DomainProvider>
                        </PersistGate>
                    </Web3WagmiProvider>
                </Provider>
            </body>
        </html>
    );
}
