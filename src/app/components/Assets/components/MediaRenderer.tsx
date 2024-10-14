/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Stack, Typography, useMediaQuery } from '@mui/material';
import { IconPlayerPlayFilled } from '@tabler/icons-react';

interface MediaRendererProps {
    src: string;
    fallbackSrc?: string;
    autoPlay?: boolean;
    preSource?: string;
}

const defaultFallbackSrc = 'https://via.placeholder.com/200';

const MediaRendererMain = ({ src, fallbackSrc, autoPlay = false }: MediaRendererProps) => {
    const isMobile = useMediaQuery('(max-width: 900px)');
    const [loading, setLoading] = useState(true);

    const isVideo = src.match(/\.(mp4|webm|ogg)$/) != null;
    const isImage = src.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;

    return (
        <>
            {loading && (
                <Stack justifyContent="center" alignItems="center" width="100%" height="100%">
                    <Typography variant="h6">Loading</Typography>
                </Stack>
            )}

            {isVideo && (
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        display: loading ? 'none' : 'block',
                    }}
                >
                    <video
                        autoPlay={!isMobile || autoPlay}
                        muted
                        loop
                        preload="auto"
                        onLoadedData={() => setLoading(false)}
                        onError={(event) => {
                            event.currentTarget.src = fallbackSrc || defaultFallbackSrc;
                            setLoading(false);
                        }}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 'inherit',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            borderTopRightRadius: 10,
                            borderTopLeftRadius: 10,
                        }}
                    >
                        <source src={src} type="video/mp4" />
                    </video>
                    <IconPlayerPlayFilled
                        style={
                            isMobile && !autoPlay
                                ? { position: 'absolute', bottom: 10, right: 10 }
                                : { display: 'none' }
                        }
                    />
                </div>
            )}

            {isImage && (
                <img
                    src={src}
                    alt="asset"
                    width={160}
                    height={160}
                    style={{
                        display: loading ? 'none' : 'block',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 'inherit',
                    }}
                    onLoad={() => setLoading(false)}
                    onError={(event) => {
                        event.currentTarget.src = fallbackSrc || defaultFallbackSrc;
                        setLoading(false);
                    }}
                />
            )}

            {!isVideo && !isImage && (
                <Stack justifyContent="center" alignItems="center" width="100%" height="100%">
                    <Typography variant="h6">Unsupported media type</Typography>
                </Stack>
            )}
        </>
    );
};

export const MediaRenderer = React.memo(MediaRendererMain);
