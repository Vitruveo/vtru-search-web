import React from 'react';
import Marquee from 'react-fast-marquee';
import { Box, CardContent, Link, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useSelector } from '@/store/hooks';
import { AWS_BASE_URL_S3 } from '@/constants/aws';
import { SpotlightAsset } from '@/features/assets/types';
import { STORE_BASE_URL } from '@/constants/api';
import { MediaRenderer } from '../Assets/components/MediaRenderer';
import { formatPrice } from '@/utils/assets';

function SpotlightSlider() {
    const assets = useSelector((state) => state.assets.spotlight);
    const theme = useTheme();

    const handleClickItem = (asset: SpotlightAsset) => {
        window.open(`${STORE_BASE_URL}/${asset?.username || 'preview'}/${asset?._id}`);
    };

    return (
        <Box>
            <Marquee>
                {assets.map((asset, index) => {
                    const assetTitle = asset?.title || 'No Title';
                    const creatorName = asset?.username || 'No creator';

                    const price = formatPrice(asset.price);

                    const nextAssetExists = index + 1 < assets.length;
                    return (
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            m={2}
                            onClick={() => handleClickItem(asset)}
                            sx={{
                                backgroundColor: theme.palette.grey[100],
                                ':hover': {
                                    cursor: 'pointer',
                                    boxShadow: '0 0 10px 0px #000',
                                },
                            }}
                            key={asset._id}
                        >
                            <Box width={250} height={250} borderRadius="8px 8px 0 0" position="relative">
                                <MediaRenderer
                                    src={`${AWS_BASE_URL_S3}/${asset?.preview}`}
                                    fallbackSrc={'https://via.placeholder.com/250'}
                                    preSource={
                                        nextAssetExists ? `${AWS_BASE_URL_S3}/${assets[index + 1]?.preview}` : ''
                                    }
                                />
                            </Box>
                            <CardContent
                                sx={{ width: 250, p: 3, pt: 2 }}
                                style={{
                                    borderBottomRightRadius: 10,
                                    borderBottomLeftRadius: 10,
                                }}
                            >
                                <Typography
                                    title={assetTitle}
                                    variant="h6"
                                    sx={{ cursor: 'pointer' }}
                                    width="100%"
                                    whiteSpace="nowrap"
                                    overflow="hidden"
                                    textOverflow="ellipsis"
                                >
                                    {assetTitle}
                                </Typography>
                                <Box sx={{ width: '100%' }}>
                                    <Link
                                        title={creatorName}
                                        sx={{
                                            display: 'block',
                                            width: '100%',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                        }}
                                        href="#"
                                        onClick={() => {}}
                                    >
                                        {creatorName}
                                    </Link>
                                </Box>
                                <Stack mt={2}>
                                    <Typography
                                        variant="h6"
                                        overflow="hidden"
                                        whiteSpace="nowrap"
                                        textOverflow="ellipsis"
                                    >
                                        {price}
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Box>
                    );
                })}
            </Marquee>
        </Box>
    );
}

export default SpotlightSlider;
