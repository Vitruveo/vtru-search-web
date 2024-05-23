'use client';

import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Variant } from '@mui/material/styles/createTypography';

export default function VtruTitle({
    login,
    vtru = 'h2',
    studio = 'h2',
    vtruRem = '',
    studioRem = '',
}: {
    login?: boolean;
    vtru?: Variant;
    studio?: Variant;
    copy?: Variant;
    vtruRem?: string;
    studioRem?: string;
    copyRem?: string;
}) {
    return (
        <Stack display="inline">
            <Typography style={{ fontSize: login ? '3em' : vtruRem }} fontWeight="bold" variant={vtru} display="inline">
                VTRU
            </Typography>
            <Typography
                style={{ fontSize: login ? '3em' : studioRem }}
                fontWeight="normal"
                display="inline"
            >
                {' '}
                Search
            </Typography>
        </Stack>
    );
}
