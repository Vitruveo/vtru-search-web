import { Direction, Shadows, Theme } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';

export const themeConfig = (theme: Theme) => ({
    ...theme,
    direction: theme.direction as Direction,
    palette: {
        primary: {
            main: '#00d6f4',
            light: '#F2ECF9',
            dark: '#149cb0',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#95CFD5',
            light: '#EDF8FA',
            dark: '#8BC8CE',
            contrastText: '#ffffff',
        },
        success: {
            main: '#13DEB9',
            light: '#E6FFFA',
            dark: '#02b3a9',
            contrastText: '#ffffff',
        },
        info: {
            main: '#539BFF',
            light: '#EBF3FE',
            dark: '#1682d4',
            contrastText: '#ffffff',
        },
        error: {
            main: '#FA896B',
            light: '#FDEDE8',
            dark: '#f3704d',
            contrastText: '#ffffff',
        },
        warning: {
            main: '#FFAE1F',
            light: '#FEF5E5',
            dark: '#ae8e59',
            contrastText: '#ffffff',
        },
        grey: {
            100: '#F2F6FA',
            200: '#EAEFF4',
            300: '#DFE5EF',
            400: '#7C8FAC',
            500: '#5A6A85',
            600: '#2A3547',
        },
        text: {
            primary: '#2A3547',
            secondary: '#2A3547',
        },
        action: {
            disabledBackground: 'rgba(73,82,88,0.12)',
            hoverOpacity: 0.02,
            hover: '#f6f9fc',
        },
        divider: '#e5eaef',
    },
    typography: theme.typography as TypographyOptions,
    shadows: theme.shadows as Shadows,
    shape: {
        borderRadius: theme.shape.borderRadius,
    },
});
