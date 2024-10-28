import { Box, Typography } from '@mui/material';
import { GENERAL_STORAGE_URL } from '@/constants/aws';
import Avatar from '../../Assets/components/Avatar';

interface Props {
    creator: any;
    creatorName?: string;
    asset: any;
}

export const User = ({ asset, creator, creatorName }: Props) => {
    return (
        <Box display="flex">
            <Avatar
                baseUrl={GENERAL_STORAGE_URL}
                path={creator}
                name={asset.assetMetadata?.creators?.formData[0]?.name}
            />
            <Typography
                variant="h6"
                style={{
                    textIndent: 8,
                    alignContent: 'center',
                    color: '#ffff',
                }}
            >
                @{creatorName || asset.assetMetadata.creators?.formData[0]?.name}
            </Typography>
        </Box>
    );
};
