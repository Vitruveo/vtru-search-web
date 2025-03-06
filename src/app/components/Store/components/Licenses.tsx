import getInfoLink from '@/utils/licensesInfo';
import { Box, Grid, Theme, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { IconInfoCircle } from '@tabler/icons-react';

interface LicensesProps {
    title: string;
    license: string;
}

export default function Licenses({ title, license }: LicensesProps) {
    const smUp = useMediaQuery((mediaQuery: Theme) => mediaQuery.breakpoints.down('sm'));

    return (
        <Grid container spacing={2} style={{ paddingTop: 0, paddingBottom: 15, justifyContent: 'space-between' }}>
            <Grid item sm={6} alignItems={'center'} display={'flex'}>
                <Typography
                    variant="body1"
                    fontWeight="bold"
                    style={{ whiteSpace: 'nowrap', wordBreak: 'break-all', fontSize: smUp ? 15 : 22 }}
                >
                    {title}
                </Typography>
            </Grid>
            <Grid item sm={6}>
                <Box display="flex" gap={1} alignItems="center" justifyContent={'flex-end'}>
                    <Typography
                        variant="body1"
                        style={{
                            wordBreak: 'keep-all',
                            overflowWrap: 'normal',
                        }}
                    >
                        <a
                            href={getInfoLink(license)}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                fontSize: smUp ? 15 : 22,
                                textDecoration: 'underline',
                                color: 'inherit',
                                wordBreak: 'break-all',
                            }}
                        >
                            {license}
                        </a>
                    </Typography>
                    <Tooltip
                        placement="right"
                        title={'The license link provides more information about your rights when buying this artwork.'}
                    >
                        <IconInfoCircle
                            size={smUp ? 17 : 25}
                            style={{
                                transform: 'translateY:(0%)',
                                cursor: 'pointer',
                            }}
                        />
                    </Tooltip>
                </Box>
            </Grid>
        </Grid>
    );
}
