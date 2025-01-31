/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Stack, Typography, useMediaQuery } from '@mui/material';
import { IconPlayerPlayFilled } from '@tabler/icons-react';

interface MediaRendererProps {
    src: string;
    fallbackSrc?: string;
    autoPlay?: boolean;
    preSource?: string;
    type?: string;
    muted?: boolean;
    controls?: boolean;
    onClick?: () => void;
    objectFit?: 'cover' | 'contain';
}

const defaultFallbackSrc = 'https://via.placeholder.com/200';

const MediaRendererMain = ({
    src,
    fallbackSrc,
    autoPlay = false,
    type,
    muted = true,
    controls = false,
    objectFit = 'cover',
    onClick,
}: MediaRendererProps) => {
    const isMobile = useMediaQuery('(max-width: 900px)');
    const [loading, setLoading] = useState(true);

    const isVideo = src.match(/\.(mp4|webm|ogg)(\?.*)?$/) != null || type === 'video';
    const isImage = src.match(/\.(jpeg|jpg|gif|png|webp)(\?.*)?$/) != null || type === 'grid';
    const isSlideshow = type === 'slideshow';

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
                        muted={muted}
                        controls={controls}
                        loop
                        preload="auto"
                        onLoadedData={() => setLoading(false)}
                        onClick={onClick}
                        onError={(event) => {
                            event.currentTarget.src = fallbackSrc || defaultFallbackSrc;
                            setLoading(false);
                        }}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: type ? 'contain' : 'cover',
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
                        objectFit: objectFit,
                        borderRadius: 'inherit',
                    }}
                    onLoad={() => setLoading(false)}
                    onClick={onClick}
                    onError={(event) => {
                        event.currentTarget.src = fallbackSrc || defaultFallbackSrc;
                        setLoading(false);
                    }}
                />
            )}

            {isSlideshow && (
                <>
                    <iframe
                        src={src}
                        title="stack"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: type ? 'contain' : 'cover',
                            border: 'none',
                        }}
                        onLoad={() => setLoading(false)}
                        onError={(event) => {
                            event.currentTarget.src = fallbackSrc || defaultFallbackSrc;
                            setLoading(false);
                        }}
                    />
                    <div
                        onClick={onClick}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            cursor: 'pointer',
                        }}
                    />
                </>
            )}

            {!isVideo && !isImage && !isSlideshow && (
                <Stack justifyContent="center" alignItems="center" width="100%" height="100%">
                    <Typography variant="h6">Unsupported media type</Typography>
                </Stack>
            )}
        </>
    );
};

export const MediaRenderer = React.memo(MediaRendererMain);
