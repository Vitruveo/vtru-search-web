import { formatPrice } from '@/utils/assets';
import { Box, Grid, Tooltip, Typography } from '@mui/material';
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
    return (
        <Grid container spacing={2} style={{ justifyContent: 'space-between' }}>
            <Grid item xs={8} sm={2} alignItems={'center'} display={'flex'}>
                <Typography
                    variant="body1"
                    fontWeight="bold"
                    style={{
                        whiteSpace: 'nowrap',
                        wordBreak: 'break-all',
                    }}
                >
                    {title}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                <Box display={'flex'} alignItems={'center'} gap={1} justifyContent={'flex-end'} maxWidth={150}>
                    {formatPrice({ price: value, withUS: true })}
                    <Tooltip
                        style={{
                            padding: 1,
                            cursor: 'pointer',
                        }}
                        placement="right"
                        title={
                            <>
                                Platform ({fees.platform.porcent}%):{' '}
                                {formatPrice({ price: fees.platform.value, withUS: true })} <br />
                                {fees.curator.value > 0 && (
                                    <>
                                        Curator ({fees.curator.porcent}%):{' '}
                                        {formatPrice({ price: fees.curator.value, withUS: true })} <br />{' '}
                                    </>
                                )}
                            </>
                        }
                    >
                        <IconInfoCircle />
                    </Tooltip>
                </Box>
            </Grid>
        </Grid>
    );
}
