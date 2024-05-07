import React, { forwardRef } from 'react';
import { Box, Typography, Badge } from '@mui/material';

export interface CountOptionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string;
    count?: number;
    styles?: any;
}

export const CountOptionLabel = forwardRef<HTMLDivElement, CountOptionLabelProps>((props, ref) => {
    const { label, count } = props;

    const name = Array.isArray(label) ? label[0] : label;

    return (
        <Box ref={ref} display="flex" alignItems="center" justifyContent="space-between" {...props}>
            <Typography>{name.toLowerCase()}</Typography> <Badge badgeContent={count} color="primary" sx={{ mr: 1 }} />
        </Box>
    );
});

CountOptionLabel.displayName = 'CountOptionLabel';
