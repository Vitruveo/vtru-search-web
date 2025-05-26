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
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography
                variant="body1"
                fontWeight="bold"
                style={{ whiteSpace: 'nowrap', wordBreak: 'break-all', fontSize: 22 }}
            >
                {title}
            </Typography>

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
                    <IconInfoCircle
                        size={smUp ? 17 : 25}
                        style={{
                            transform: 'translateY:(0%)',
                            cursor: 'pointer',
                        }}
                    />
                </Tooltip>
            </Box>
        </Box>
    );
}
