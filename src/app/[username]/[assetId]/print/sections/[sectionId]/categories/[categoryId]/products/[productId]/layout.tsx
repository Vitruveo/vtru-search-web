import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export default function PrintProductDetailsLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box
            padding={2}
            sx={{
                overflowY: 'auto',
                height: '100vh',
                paddingBottom: 10,
            }}
        >
            <Box display="flex" justifyContent="center" alignItems="center">
                <Image src={'/images/logos/XIBIT-logo_dark.png'} alt="logo" height={40} width={120} priority />
            </Box>

            <Typography variant="h1" mt={2} fontSize={['1.5rem', '1.75rem', '2rem', '2.5rem']}>
                Print License
            </Typography>

            {children}
        </Box>
    );
}
