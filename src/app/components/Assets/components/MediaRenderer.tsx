import Image from 'next/image';
import { Stack, Typography } from '@mui/material';
import { useRef, useState } from 'react';

interface MediaRendererProps {
    src: string;
    fallbackSrc?: string;
}

export const MediaRenderer = (props: MediaRendererProps) => {
    const [src, setSrc] = useState(props.src);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const onError = () => {
        setSrc(props?.fallbackSrc ?? 'fallback');
    };

    const togglePlayPause = () => {
        if (videoRef.current) {
            const video = videoRef.current;
            if (video.paused || video.ended) {
                video.play();
            } else {
                video.pause();
            }
        }
    };

    const isImage = src.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
    const isVideo = src.match(/\.(mp4|webm|ogg)$/) != null;

    if (isVideo) {
        return (
            <video
                ref={videoRef}
                muted
                loop
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
                onError={onError}
                onClick={togglePlayPause}
            >
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
