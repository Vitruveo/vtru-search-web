import Image from 'next/image';
import { Stack, Typography } from '@mui/material';
import { useState } from 'react';

interface MediaRendererProps {
    src: string;
    fallbackSrc?: string;
}

export const MediaRenderer = (props: MediaRendererProps) => {
    const [src, setSrc] = useState(props.src);

    const onError = () => {
        setSrc(props?.fallbackSrc ?? 'fallback');
    };

    const isImage = src.match(/\.(jpeg|jpg|gif|png)$/) != null;
    const isVideo = src.match(/\.(mp4|webm|ogg)$/) != null;

    if (isVideo) {
        return (
            <video autoPlay muted loop style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={onError}>
                <source src={src} type="video/mp4" />
            </video>
        );
    }

    if (isImage || src === props.fallbackSrc) {
        return (
            <Image
                src={src}
                alt="asset"
                width={160}
                height={160}
                onError={onError}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        );
    }

    return (
        <Stack justifyContent="center" alignItems="center" width="100%" height="100%">
            <Typography variant="h6">Unsupported media type</Typography>
        </Stack>
    );
};
