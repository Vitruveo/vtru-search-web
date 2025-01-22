import Image from 'next/image';
import Link from 'next/link';
import { Box, CircularProgress } from '@mui/material';
import { ASSET_STORAGE_URL } from '@/constants/aws';
import { LastAssets } from '@/features/store/types';
import { SEARCH_BASE_URL } from '@/constants/api';

interface Props {
    assets: LastAssets[];
    creatorName: string;
    loading: boolean;
}

export const LastAssetsList = ({ assets, loading, creatorName }: Props) => {
    return (
        <Box>
            {loading ? (
                <Loading />
            ) : (
                assets.map((asset) => (
                    <Link key={asset._id} href={`${SEARCH_BASE_URL}/${creatorName}/${asset._id}`}>
                        <Box key={asset._id} sx={{ marginBlock: 2 }}>
                            <Image
                                src={`${ASSET_STORAGE_URL}/${asset.path}`}
                                width={98}
                                height={98}
                                alt={'last asset'}
                            />
                        </Box>
                    </Link>
                ))
            )}
        </Box>
    );
};

const Loading = () => {
    return (
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginBlock: 4 }}>
            {Array.from({ length: 5 }).map((_, index) => (
                <CircularProgress key={index} />
            ))}
        </Box>
    );
};
