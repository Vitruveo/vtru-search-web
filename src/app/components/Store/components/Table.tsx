import { Box, Typography } from '@mui/material';

interface TableProps {
    title: string;
    content: string;
}
export default function Table({ title, content }: TableProps) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
            <Typography variant="body1" sx={{ color: '#000000', fontSize: 14 }}>
                {title}
            </Typography>
            <Typography variant="body1" sx={{ color: '#000000', fontSize: 14 }}>
                {content}
            </Typography>
        </Box>
    );
}
