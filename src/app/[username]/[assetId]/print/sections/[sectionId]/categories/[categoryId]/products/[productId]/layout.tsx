import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export default function PrintProductDetailsLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box
            padding={4}
            sx={{
                overflowY: 'auto',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
            }}
        >
            <Box display="flex" justifyContent="start">
                <Image src={'/images/logos/XIBIT-logo_dark.png'} alt="logo" height={40} width={120} priority />
            </Box>

            <Typography variant="h4" fontSize={['1.5rem', '1.75rem', '2rem', '2.5rem']} lineHeight={1}>
                Print License
            </Typography>

            {children}
        </Box>
    );
}
