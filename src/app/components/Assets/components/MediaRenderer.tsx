import Image from 'next/image';
import { Stack, Typography, useMediaQuery } from '@mui/material';
import { useState } from 'react';

interface MediaRendererProps {
    src: string;
    fallbackSrc?: string;
    autoPlay?: boolean;
}

export const MediaRenderer = ({ src: source, fallbackSrc, autoPlay = false }: MediaRendererProps) => {
    const [src, setSrc] = useState(source);
    const isMobile = useMediaQuery('(max-width: 900px)');

    const onError = () => {
        setSrc(fallbackSrc ?? 'fallback');
    };

    const isImage = src.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
    const isVideo = src.match(/\.(mp4|webm|ogg)$/) != null;

    if (isVideo) {
        return (
            <video
                autoPlay={!isMobile || autoPlay}
                muted
                loop
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
                onError={onError}
            >
                <source src={src} type="video/mp4" />
            </video>
        );
    }

    if (isImage || src === fallbackSrc) {
        return (
            <Image
                src={src}
                alt="asset"
                width={160}
                height={160}
                onError={onError}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
            />
        );
    }

    return (
        <Stack justifyContent="center" alignItems="center" width="100%" height="100%">
            <Typography variant="h6">Unsupported media type</Typography>
        </Stack>
    );
};
