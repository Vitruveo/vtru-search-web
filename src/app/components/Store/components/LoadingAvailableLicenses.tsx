import { Box, CircularProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Props {
    message: string;
    background?: string;
}

export const LoadingAvailableLincenses = ({ message, background }: Props) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                minHeight: 155,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: background || theme.palette.background.paper,
                padding: '1rem',
                borderRadius: '1rem',
                gap: '1rem',
            }}
        >
            <CircularProgress sx={{ color: '#FF0066' }} />
            <Typography variant="h6">{message}</Typography>
        </Box>
    );
};
