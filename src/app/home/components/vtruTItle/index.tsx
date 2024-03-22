'use client';

import Typography from '@mui/material/Typography';
import { Variant } from '@mui/material/styles/createTypography';
import { Saira } from 'next/font/google';

const saira = Saira({ weight: '400', subsets: ['latin'] });

export default function VtruTitle({
    login,
    vtru = 'h2',
    studio = 'h2',
    copy = 'h1',
    vtruRem = '',
    studioRem = '',
    copyRem = '2.5rem',
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
        <Typography display="inline">
            <Typography style={{ fontSize: login ? '3em' : vtruRem }} fontWeight="bold" variant={vtru} display="inline">
                VTRU
            </Typography>
            <Typography
                style={{ fontSize: login ? '3em' : studioRem }}
                variant={studio}
                fontWeight="normal"
                display="inline"
            >
                {' '}
                Search
            </Typography>
        </Typography>
    );
}
