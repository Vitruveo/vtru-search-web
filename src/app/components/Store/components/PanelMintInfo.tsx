import { useState } from 'react';
import { Box, Grid, Theme, Typography, useMediaQuery } from '@mui/material';
import { RemoveRedEye, VisibilityOff } from '@mui/icons-material';

interface PanelMintInfoProps {
    title: string;
    color?: string;
    content: string;
    disable?: boolean;
    hasHidden?: boolean;
}

const colors = {
    gray: '#999999',
};

export default function PanelMintInfo({
    title,
    content,
    color,
    disable = false,
    hasHidden = false,
}: PanelMintInfoProps) {
    const smUp = useMediaQuery((mediaQuery: Theme) => mediaQuery.breakpoints.down('sm'));

    const [showContent, setShowContent] = useState(false);

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography
                variant="h4"
                fontWeight="bold"
                style={{
                    fontSize: 22,
                    whiteSpace: 'nowrap',
                    wordBreak: 'break-all',
                    color: disable ? '#DEDEDE' : color || 'unset',
                }}
            >
                {title}
            </Typography>

            <Box display="flex" gap={1} justifyContent={'flex-end'} marginRight={smUp ? 3.2 : 4.2}>
                <Typography
                    variant="h4"
                    style={{
                        // blur if content is hidden
                        filter: !hasHidden ? '' : showContent ? 'unset' : 'blur(6px)',

                        fontSize: 22,
                        wordBreak: 'keep-all',
                        overflowWrap: 'normal',
                        color: disable ? '#DEDEDE' : color || 'unset',
                    }}
                >
                    {content}
                </Typography>
                {hasHidden && (
                    <Box
                        display="flex"
                        alignItems="center"
                        onClick={() => setShowContent(!showContent)}
                        style={{ cursor: 'pointer', marginRight: -32 }}
                    >
                        {showContent ? <VisibilityOff /> : <RemoveRedEye />}
                    </Box>
                )}
            </Box>
        </Box>
    );
}
