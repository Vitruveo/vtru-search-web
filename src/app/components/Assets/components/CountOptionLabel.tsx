import React, { forwardRef } from 'react';
import { Box, Typography, Badge } from '@mui/material';

export interface CountOptionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string;
    count?: number;
    styles?: any;
}

export const CountOptionLabel = forwardRef<HTMLDivElement, CountOptionLabelProps>((props, ref) => {
    const { label, count } = props;

    return (
        <Box ref={ref} display="flex" alignItems="center" justifyContent="space-between" {...props}>
            <Typography>{label.toLowerCase()}</Typography> <Badge badgeContent={count} color="primary" sx={{ mr: 1 }} />
        </Box>
    );
});

CountOptionLabel.displayName = 'CountOptionLabel';
