import getInfoLink from '@/utils/licensesInfo';
import { Box, Grid, Tooltip, Typography } from '@mui/material';
import { IconInfoCircle } from '@tabler/icons-react';

interface LicensesProps {
    title: string;
    license: string;
}

export default function Licenses({ title, license }: LicensesProps) {
    return (
        <Grid container spacing={2} style={{ paddingTop: 0, paddingBottom: 15, justifyContent: 'space-between' }}>
            <Grid item sm={6} alignItems={'center'} display={'flex'}>
                <Typography
                    variant="body1"
                    fontWeight="bold"
                    style={{ whiteSpace: 'nowrap', wordBreak: 'break-all', fontSize: 22 }}
                >
                    {title}
                </Typography>
            </Grid>
            <Grid item sm={6}>
                <Box display="flex" gap={1} justifyContent={'flex-end'}>
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
                                fontSize: 22,
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
                        <IconInfoCircle style={{ transform: 'translateY:(0%)', cursor: 'pointer' }} />
                    </Tooltip>
                </Box>
            </Grid>
        </Grid>
    );
}
