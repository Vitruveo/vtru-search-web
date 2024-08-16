import { Direction, Shadows, Theme, Palette } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';

export const themeConfig = (theme: Theme) => ({
    ...theme,
    direction: theme.direction as Direction,
    palette: theme.palette as Palette,
    typography: theme.typography as TypographyOptions,
    shadows: theme.shadows as Shadows,
    shape: {
        borderRadius: theme.shape.borderRadius,
    },
});
