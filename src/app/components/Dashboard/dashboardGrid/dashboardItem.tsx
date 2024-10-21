import { Box, Typography } from '@mui/material';
import Image from 'next/image';

interface DashboardItemProps {
    backgroundColor?: string;
    title: string;
    content: number;
    image: string;
}

export default function DashboardItem({ title, content, image, backgroundColor }: DashboardItemProps) {
    return (
        <Box display={'flex'} justifyContent={'space-between'} width={'15%'} p={2} sx={{ background: backgroundColor }}>
            <Box mt={10}>
                <Typography variant="h1">{content}</Typography>
                <Typography>{title}</Typography>
            </Box>
            <Image src={image} alt={title} width={70} height={70} />
        </Box>
    );
}
