import getInfoLink from '@/utils/licensesInfo';
import { Box, Grid, Tooltip, Typography } from '@mui/material';
import { IconInfoCircle } from '@tabler/icons-react';

interface LicensesProps {
    title: string;
    license: string;
}

export default function Licenses({ title, license }: LicensesProps) {
    return (
        <Grid container spacing={2} style={{ paddingTop: 0, paddingBottom: 10, justifyContent: 'space-between' }}>
            <Grid item xs={8} sm={2}>
                <Typography variant="body1" fontWeight="bold" style={{ whiteSpace: 'nowrap', wordBreak: 'break-all' }}>
                    {title}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                <Box display="flex" gap={1} justifyContent={'flex-end'} maxWidth={152}>
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
                                textDecoration: 'underline',
                                color: 'inherit',
                                wordBreak: 'break-all',
                            }}
                        >
                            {license}
                        </a>
                    </Typography>
                    <Tooltip
                        style={{
                            padding: 1,
                            cursor: 'pointer',
                        }}
                        placement="right"
                        title={'The license link provides more information about your rights when buying this artwork.'}
                    >
                        <IconInfoCircle />
                    </Tooltip>
                </Box>
            </Grid>
        </Grid>
    );
}
