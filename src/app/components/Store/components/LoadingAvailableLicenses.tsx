import { Box, CircularProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Props {
    message: string;
}

export const LoadingAvailableLincenses = ({ message }: Props) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                minHeight: 155,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.palette.background.paper,
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
