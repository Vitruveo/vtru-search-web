import { Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface NumberOfFiltersProps {
    value: number | undefined;
    onClick?: () => void;
}
export default function NumberOfFilters({ value, onClick }: NumberOfFiltersProps) {
    const theme = useTheme();

    if (!value || value <= 0) return null;
    return (
        <Paper
            variant="elevation"
            sx={{
                backgroundColor: `${theme.palette.primary.main}`,
                color: `${theme.palette.primary.contrastText}`,
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
