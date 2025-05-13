import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export default function PrintProductDetailsLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box
            padding={4}
            sx={{
                overflowY: 'auto',
                height: '100vh',
                paddingBottom: 10,

                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                backgroundColor: '#6c3baf',
            }}
        >
            <Box display="flex" justifyContent="start">
                <Image src={'/images/logos/XIBIT-logo_dark.png'} alt="logo" height={40} width={120} priority />
            </Box>

            <Typography variant="h1" fontSize={['1.5rem', '1.75rem', '2rem', '2.5rem']}>
                Print License
            </Typography>

            {children}
        </Box>
    );
}
