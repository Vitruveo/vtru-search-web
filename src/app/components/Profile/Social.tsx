import { Social as SocialType } from '@/features/profile/creator/types';
import { Box, Typography } from '@mui/material';
import { IconBrandFacebook, IconBrandGoogle, IconBrandX } from '@tabler/icons-react';

interface SocialProps {
    social?: SocialType;
}

export default function Social({ social }: SocialProps) {
    return (
        <Box paddingBlock={0.5} display={'flex'} gap={1}>
            {social?.x.name && (
                <Box display={'flex'} alignItems={'center'} gap={0.5}>
                    <IconBrandX />
                    <Typography variant="body1">{social.x.name}</Typography>
                </Box>
            )}
            {social?.facebook?.name && (
                <Box display={'flex'} alignItems={'center'} gap={0.5}>
                    <IconBrandFacebook />
                    <Typography variant="body1">{social.facebook.name}</Typography>
                </Box>
            )}
            {social?.google?.name && (
                <Box display={'flex'} alignItems={'center'} gap={0.5}>
                    <IconBrandGoogle />
                    <Typography variant="body1">{social.google.name}</Typography>
                </Box>
            )}
        </Box>
    );
}
