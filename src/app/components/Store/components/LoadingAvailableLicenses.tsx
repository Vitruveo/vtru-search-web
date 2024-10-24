import { Box, CircularProgress, Typography } from '@mui/material';

interface Props {
    message: string;
}

export const LoadingAvailableLincenses = ({ message }: Props) => {
    return (
        <Box
            sx={{
                minHeight: 155,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
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
