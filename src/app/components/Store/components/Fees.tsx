import { formatPrice } from '@/utils/assets';
import { Box, Grid, Theme, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { IconInfoCircle } from '@tabler/icons-react';

interface FeesProps {
    title: string;
    value: number;
    fees: {
        platform: {
            porcent: number;
            value: number;
        };
        curator: {
            porcent: number;
            value: number;
        };
    };
}

export default function Fees({ title, value, fees }: FeesProps) {
    const smUp = useMediaQuery((mediaQuery: Theme) => mediaQuery.breakpoints.down('sm'));

    return (
        <Grid container spacing={2} style={{ justifyContent: 'space-between' }}>
            <Grid item sm={6} alignItems={'center'} display={'flex'}>
                <Typography
                    variant="body1"
                    fontWeight="bold"
                    style={{
                        fontSize: smUp ? 15 : 22,
                        whiteSpace: 'nowrap',
                        wordBreak: 'break-all',
                    }}
                >
                    {title}
                </Typography>
            </Grid>
            <Grid item sm={6}>
                <Box display={'flex'} alignItems={'center'} gap={1.1} justifyContent={'flex-end'}>
                    <Typography
                        variant="body1"
                        style={{
                            fontSize: smUp ? 15 : 22,
                            wordBreak: 'keep-all',
                            overflowWrap: 'normal',
                        }}
                    >
                        {formatPrice({ price: value, withUS: true, decimals: true })}
                    </Typography>

                    <Tooltip
                        placement="right"
                        title={
                            <>
                                Platform ({fees.platform.porcent}%):{' '}
                                {formatPrice({ price: fees.platform.value, withUS: true, decimals: true })} <br />
                                {fees.curator.value > 0 && (
                                    <>
                                        Curator ({fees.curator.porcent}%):{' '}
                                        {formatPrice({ price: fees.curator.value, withUS: true, decimals: true })}{' '}
                                        <br />{' '}
                                    </>
                                )}
                            </>
                        }
                    >
                        <IconInfoCircle
                            size={smUp ? 17 : 25}
                            style={{ transform: 'translateY(0%)', cursor: 'pointer' }}
                        />
                    </Tooltip>
                </Box>
            </Grid>
        </Grid>
    );
}
