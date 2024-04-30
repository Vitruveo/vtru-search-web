import { Box, Typography, Badge } from '@mui/material';

export interface CountOptionLabelProps {
    label: string;
    count: number;
}

export const CountOptionLabel = ({ label, count }: CountOptionLabelProps) => {
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography>{label.toLowerCase()}</Typography> <Badge badgeContent={count} color="primary" sx={{ mr: 1 }} />
        </Box>
    );
};
