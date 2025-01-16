import { formatPrice } from '@/utils/assets';
import { Box, Grid, Typography } from '@mui/material';

interface TotalPriceProps {
    title: string;
    value: number;
}

export default function TotalPrice({ title, value }: TotalPriceProps) {
    return (
        <Grid container spacing={2} style={{ justifyContent: 'space-between' }}>
            <Grid item sm={6}>
                <Typography variant="body1" fontWeight="bold" style={{ whiteSpace: 'nowrap', wordBreak: 'break-all' }}>
                    {title}
                </Typography>
            </Grid>
            <Grid item sm={6}>
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    fontWeight={'bold'}
                    justifyContent={'flex-end'}
                    maxWidth={120}
                >
                    {formatPrice({ price: value, withUS: true, decimals: true })}
                </Box>
            </Grid>
        </Grid>
    );
}
