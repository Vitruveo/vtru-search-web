import Image from 'next/image';
import Link from 'next/link';
import { Box, CircularProgress, Typography } from '@mui/material';
import { ASSET_STORAGE_URL } from '@/constants/aws';
import { LastAssets } from '@/features/store/types';
import { SEARCH_BASE_URL } from '@/constants/api';

interface Props {
    assets: LastAssets[];
    loading: boolean;
    creatorName: string;
    creatorId: string | null;
}

export const LastAssetsList = ({ assets, loading, creatorName, creatorId }: Props) => {
    return (
        <Box>
            <Box sx={{ display: 'flex', marginBlock: 1, alignItems: 'center', gap: 1 }}>
                <Typography variant="h5">Other works by this artist</Typography>
                <Link href={`${SEARCH_BASE_URL}/?creatorId=${creatorId}`}>
                    <Typography variant="h5" sx={{ color: 'white', textDecoration: 'underline' }}>
                        View all
                    </Typography>
                </Link>
            </Box>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginBlock: 2 }}>
                {loading
                    ? Array.from({ length: 5 }).map((_, index) => <CircularProgress key={index} />)
                    : assets.map((asset) => (
                        <Link key={asset._id} href={`${SEARCH_BASE_URL}/${creatorName}/${asset._id}`}>
                            <Image
                                src={`${ASSET_STORAGE_URL}/${asset.path}`}
                                width={98}
                                height={98}
                                alt={'last asset'}
                            />
                        </Link>
                    ))}
            </Box>
        </Box>
    );
};
