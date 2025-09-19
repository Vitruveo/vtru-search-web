import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { Box, CircularProgress, Typography } from '@mui/material';
import { ASSET_STORAGE_URL } from '@/constants/aws';
import { LastAssets } from '@/features/store/types';
import { NODE_ENV } from '@/constants/api';
import { REDIRECTS_JSON } from '@/constants/vitruveo';
import { videoExtension } from '@/utils/videoExtensions';

interface Props {
    assets: LastAssets[];
    loading: boolean;
    creatorName: string;
    creatorId: string | null;
}

export const LastAssetsList = ({ assets, loading, creatorName, creatorId }: Props) => {
    const [searchUrl, setSearchUrl] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const rowData = await axios.get(REDIRECTS_JSON);
            setSearchUrl(rowData.data[NODE_ENV].xibit.search_url);
        };
        fetchData();
    }, []);

    return (
        <Box>
            {!loading && assets.length > 0 && (
                <Box sx={{ display: 'flex', marginBlock: 1, alignItems: 'center', gap: 1 }}>
                    <Typography variant="h5">Other works by this artist</Typography>
                    <Link href={`${searchUrl}/?creatorId=${creatorId}`}>
                        <Typography variant="h5" sx={{ color: 'white', textDecoration: 'underline' }}>
                            View all
                        </Typography>
                    </Link>
                </Box>
            )}
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'left',
                    marginBlock: 2,
                    gap: 2,
                    flexWrap: 'wrap',
                }}
            >
                {loading ? (
                    <Box>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CircularProgress key={index} />
                        ))}
                    </Box>
                ) : (
                    assets.map((asset) => {
                        const isVideo = videoExtension.some((ext) => asset.path?.endsWith(ext));
                        return (
                            <Link key={asset._id} href={`${searchUrl}/${creatorName}/${asset._id}`}>
                                <Box width={100} height={100}>
                                    {isVideo ? (
                                        <video
                                            autoPlay
                                            loop
                                            playsInline
                                            muted
                                            controls={false}
                                            width={100}
                                            height={100}
                                            style={{
                                                objectFit: 'cover',
                                                borderRadius: 8,
                                            }}
                                        >
                                            <source src={`${ASSET_STORAGE_URL}/${asset.path}`} type="video/mp4" />
                                        </video>
                                    ) : (
                                        <Image
                                            src={`${ASSET_STORAGE_URL}/${asset.path}`}
                                            alt={'last consgined asset'}
                                            style={{
                                                objectFit: 'cover',
                                                borderRadius: 8,
                                            }}
                                            width={100}
                                            height={100}
                                        />
                                    )}
                                </Box>
                            </Link>
                        );
                    })
                )}
            </Box>
        </Box>
    );
};
