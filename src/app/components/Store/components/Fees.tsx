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
        <Grid container spacing={2} style={{ justifyContent: 'space-between', paddingBottom: 16 }}>
            <Grid item xs={8} sm={2}>
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
                <Box display={'flex'} alignItems={'center'} gap={1} justifyContent={'flex-end'} maxWidth={152}>
                    {formatPrice(value)}
                    <Tooltip
                        style={{
                            padding: 1,
                            cursor: 'pointer',
                        }}
                        placement="right"
                        title={
                            <>
                                Platform ({fees.platform.porcent}%): {formatPrice(fees.platform.value)} <br />
                                {fees.curator.value > 0 && (
                                    <>
                                        Curator ({fees.curator.porcent}%): {formatPrice(fees.curator.value)} <br />{' '}
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
