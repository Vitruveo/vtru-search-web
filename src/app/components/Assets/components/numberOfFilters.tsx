import { Paper, Typography } from '@mui/material';

interface NumberOfFiltersProps {
    value: number | undefined;
    onClick?: () => void;
}
export default function NumberOfFilters({ value, onClick }: NumberOfFiltersProps) {
    if (!value || value <= 0) return null;
    return (
        <Paper
            variant="elevation"
            sx={{
                backgroundColor: '#00d6f4',
                color: 'white',
                borderRadius: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 24,
                height: 24,
                cursor: onClick ? 'pointer' : 'default',
            }}
            onClick={onClick}
        >
            <Typography fontSize="0.8rem" fontWeight="700">
                {value}
            </Typography>
        </Paper>
    );
}
