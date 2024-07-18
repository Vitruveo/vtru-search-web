import React from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

import { Box, Typography } from '@mui/material';
import { useSelector } from '@/store/hooks';
import { AWS_BASE_URL_S3 } from '@/constants/aws';

function Slider() {
    const assets = useSelector((state) => state.assets.data.data);

    return (
        <Box sx={{ width: 'calc(100vw - 350px)' }}>
            <Marquee>
                {assets.slice(0, 10).map((asset) => (
                    <Box
                        key={asset._id}
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        ml={2}
                        mr={2}
                    >
                        <Image
                            src={`${AWS_BASE_URL_S3}/${asset?.formats?.preview?.path}`}
                            alt={asset?.formats?.preview?.path}
                            width={200}
                            height={200}
                            style={{
                                objectFit: 'cover',
                                borderRadius: 10,
                            }}
                        />
                        <Typography variant="caption">{asset.assetMetadata?.context.formData.title}</Typography>
                    </Box>
                ))}
            </Marquee>
        </Box>
    );
}

export default Slider;
