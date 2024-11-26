import { Box } from '@mui/material';
import { GENERAL_STORAGE_URL } from '@/constants/aws';
import Avatar from '../../Assets/components/Avatar';
import Username from '../../Username';
import { Asset } from '@/features/assets/types';

interface Props {
    creator: any;
    creatorName?: string;
    asset: Asset;
}

export const User = ({ asset, creator, creatorName }: Props) => {
    return (
        <Box display="flex" flexDirection={'row'} gap={1} alignItems={'center'}>
            <Avatar
                baseUrl={GENERAL_STORAGE_URL}
                path={creator}
                name={asset.assetMetadata?.creators?.formData?.[0]?.name}
            />
            <Username
                username={creatorName || asset.creator?.username}
                vaultAdress={asset.vault?.vaultAddress}
                size="medium"
                openInNewTab
                iconSpacing="small"
            />
        </Box>
    );
};
