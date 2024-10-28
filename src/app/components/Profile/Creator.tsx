import { GENERAL_STORAGE_URL } from '@/constants/aws';
import { ProfileCreator } from '@/features/profile/creator/types';
import { Box, Skeleton, Theme, Typography, useMediaQuery } from '@mui/material';
import Avatar from '../Assets/components/Avatar';

interface ProfileCreatorProps {
    data: {
        creator: ProfileCreator;
        loading: boolean;
    };
}

export default function Creator({ data }: ProfileCreatorProps) {
    const { creator, loading } = data;
    const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

    if (loading)
        return (
            <Box display={'flex'} justifyContent={'center'} paddingBlock={4}>
                <Box display={'flex'} alignItems={'center'} gap={3} flexDirection={smUp ? 'row' : 'column'}>
                    <Skeleton variant="circular" width={98} height={98} />
                    <Box display={'flex'} flexDirection={'column'} gap={1}>
                        <Skeleton variant="text" width={400} />
                        <Skeleton variant="text" width={300} />
                    </Box>
                </Box>
            </Box>
        );

    return (
        <Box display={'flex'} justifyContent={'center'} paddingBlock={4}>
            <Box display={'flex'} alignItems={'center'} gap={3} flexDirection={smUp ? 'row' : 'column'}>
                <Avatar baseUrl={GENERAL_STORAGE_URL} path={creator.avatar} size="large" />
                <Box display={'flex'} flexDirection={'column'} gap={1}>
                    <Typography variant="h1">{creator.username}</Typography>
                    <Typography variant="body1">{creator.artsQuantity} arts</Typography>
                </Box>
            </Box>
        </Box>
    );
}
