import Image from "next/image";
import { Box, Link, Typography } from "@mui/material";
import { SEARCH_BASE_URL } from "@/constants/api";

export default function Congratulations() {
    return (
        <Box width="100%" height="100vh" display="flex" flexDirection="column" gap={8} marginBlock={10}>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                    src={'/images/logos/XIBIT-logo_dark.png'}
                    alt="logo"
                    height={80}
                    width={240}
                    priority
                />
            </Box>
            <Box display="flex" justifyContent="center" flexDirection="column" gap={6} paddingInline="10%">
                <Typography variant="h1" sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    Thank you for your order!
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '2rem', lineHeight: 1.5 }}>
                    Your payment has been received and a receipt has been emailed to you. Fulfillment will take approximately 2-3 weeks.
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '2rem', lineHeight: 1.5 }}>
                    Meanwhile, if you have any questions please visit https://support.xibit.app
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Link href={`${SEARCH_BASE_URL}`} rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <Typography variant="h1" sx={{ fontSize: '2rem' }}>Back to Home</Typography>
                </Link>
            </Box>
        </Box>
    );
}
