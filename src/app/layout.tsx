'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PersistGate } from 'redux-persist/integration/react';
import CssBaseline from '@mui/material/CssBaseline';
import store, { persistor } from '@/store';
import { NextAppDirEmotionCacheProvider } from '@/utils/theme/EmotionCache';
import { ThemeSettings } from '@/utils/theme/Theme';
import { themeConfig } from '@/utils/theme/ThemeConfig';
import CustomizedSnackbar from './common/toastr';
import { useToastr } from './hooks/useToastr';
import '@/utils/i18n';
import 'toastr/build/toastr.min.css';
import 'react-image-crop/dist/ReactCrop.css';

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
            <body style={{ overflow: 'hidden' }}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <MyApp>{children}</MyApp>
                    </PersistGate>
                </Provider>
            </body>
        </html>
    );
}
