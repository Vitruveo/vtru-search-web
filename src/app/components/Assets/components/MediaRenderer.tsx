import { Stack, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { IconPlayerPlayFilled } from '@tabler/icons-react';

interface MediaRendererProps {
    src: string;
    fallbackSrc?: string;
    autoPlay?: boolean;
    preSource?: string;
}

const defaultFallbackSrc = 'https://via.placeholder.com/200';

export const MediaRenderer = ({ src: source, fallbackSrc, autoPlay = false }: MediaRendererProps) => {
    const isMobile = useMediaQuery('(max-width: 900px)');
    const [src, setSrc] = useState<string | null>(null);

    const isVideo = source.match(/\.(mp4|webm|ogg)$/) != null;
    const isImage = source.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const loadMedia = () => {
            if (isVideo) {
                const video = document.createElement('video');
                video.src = source;
                video.load();

                video.onloadeddata = () => {
                    if (!signal.aborted) {
                        setSrc(source);
                    }
                };
                video.onerror = () => {
                    if (!signal.aborted) {
                        setSrc(fallbackSrc || defaultFallbackSrc);
                    }
                };
            }

            if (isImage) {
                const img = new Image();
                img.src = source;

                img.onload = () => {
                    if (!signal.aborted) {
                        setSrc(img.src);
                    }
                };

                img.onerror = () => {
                    if (!signal.aborted) {
                        setSrc(fallbackSrc || defaultFallbackSrc);
                    }
                };
            }
        };

        loadMedia();

        return () => {
            controller.abort();
        };
    }, []);

    if (!src) {
        return (
            <Stack justifyContent="center" alignItems="center" width="100%" height="100%">
                <Typography variant="h6">Loading</Typography>
            </Stack>
        );
    }

    if (isVideo) {
        return (
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                }}
            >
                <video
                    autoPlay={!isMobile || autoPlay}
                    muted
                    loop
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
                        isMobile && !autoPlay ? { position: 'absolute', bottom: 10, right: 10 } : { display: 'none' }
                    }
                />
            </div>
        );
    }

    if (isImage) {
        return (
            <img
                src={src}
                alt="asset"
                width={160}
                height={160}
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
