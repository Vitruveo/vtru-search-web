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
        <Typography
            style={{
                display: 'inline-block',
                alignSelf: 'baseline',
                fontSize: login ? '3em' : studioRem,
                color: '#B9BEC4',
                letterSpacing: '3px',
            }}
            fontWeight="normal"
        >
            SEARCH
        </Typography>
    );
}
