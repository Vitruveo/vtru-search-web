import React from 'react';
import Marquee from 'react-fast-marquee';
import { Box, CardContent, Link, Paper, Stack, Typography } from '@mui/material';

import { useSelector } from '@/store/hooks';
import { AWS_BASE_URL_S3 } from '@/constants/aws';
import { getAssetPrice } from '@/utils/assets';
import { MediaRenderer } from '../Assets/components/MediaRenderer';

function Slider() {
    const assets = useSelector((state) => state.assets.lastSold);

    return (
        <Box sx={{ width: 'calc(100vw - 350px)' }}>
            <Typography variant="h1" mb={4} fontWeight={500}>
                Recently Sold
            </Typography>
            <Marquee>
                {assets.map((asset) => {
                    const assetTitle = asset?.assetMetadata?.context?.formData?.title || 'No Title';

                    const hasCreator =
                        asset?.assetMetadata?.creators?.formData instanceof Array &&
                        asset?.assetMetadata?.creators?.formData?.length > 0;
                    const creatorName = hasCreator ? asset!.assetMetadata!.creators!.formData![0]!.name : 'No creator';

                    const price = getAssetPrice(asset);

                    return (
                        <Box
                            key={asset._id}
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            ml={2}
                            mr={2}
                        >
                            <Box width={250} height={250} borderRadius="8px 8px 0 0" position="relative">
                                <MediaRenderer
                                    src={`${AWS_BASE_URL_S3}/${asset?.formats?.preview?.path}`}
                                    fallbackSrc={'https://via.placeholder.com/250'}
                                />
                            </Box>
                            <CardContent
                                color="white"
                                sx={{ width: 250, p: 3, pt: 2 }}
                                style={{
                                    backgroundColor: '#e2e2e2',
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
                                <Link
                                    title={creatorName}
                                    padding={0}
                                    overflow="hidden"
                                    whiteSpace="nowrap"
                                    textOverflow="ellipsis"
                                    href="#"
                                    onClick={() => {}}
                                >
                                    {creatorName}
                                </Link>
                                <Stack direction="row" justifyContent="space-between" mt={2}>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            overflow="hidden"
                                            whiteSpace="nowrap"
                                            textOverflow="ellipsis"
                                        >
                                            Last Sold
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            overflow="hidden"
                                            whiteSpace="nowrap"
                                            textOverflow="ellipsis"
                                        >
                                            {price}
                                        </Typography>
                                    </Box>

                                    <Paper
                                        sx={{
                                            backgroundColor: 'red',
                                            borderRadius: '100%',
                                            height: 40,
                                            width: 40,
                                        }}
                                    />
                                </Stack>
                            </CardContent>
                        </Box>
                    );
                })}
            </Marquee>
        </Box>
    );
}

export default Slider;
