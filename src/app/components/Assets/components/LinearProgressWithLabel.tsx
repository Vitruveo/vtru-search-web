import { LinearProgress, LinearProgressProps, Typography, Box } from '@mui/material';

interface LinearProgressWithLabelProps {
    value: number;
    props?: LinearProgressProps;
}

export default function LinearProgressWithLabel({ value, props }: LinearProgressWithLabelProps) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress {...props} variant="determinate" value={value} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2">{`${Math.round(value)}%`}</Typography>
            </Box>
        </Box>
    );
}
