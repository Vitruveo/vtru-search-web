import { formatPrice } from '@/utils/assets';
import { Box, Grid, Typography } from '@mui/material';

interface TotalPriceProps {
    title: string;
    value: number;
}

export default function TotalPrice({ title, value }: TotalPriceProps) {
    return (
        <Grid container spacing={2} style={{ justifyContent: 'space-between', paddingBottom: 10 }}>
            <Grid item xs={8} sm={2} style={{ paddingTop: 0 }}>
                <Typography variant="body1" fontWeight="bold" style={{ whiteSpace: 'nowrap', wordBreak: 'break-all' }}>
                    {title}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={8} lg={8} xl={8} style={{ paddingTop: 0 }}>
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    gap={1}
                    fontWeight={'bold'}
                    justifyContent={'flex-end'}
                    maxWidth={120}
                >
                    {formatPrice(value)}
                </Box>
            </Grid>
        </Grid>
    );
}
