import Image from 'next/image';
import { Stack, Typography, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { IconPlayerPlayFilled } from '@tabler/icons-react';

interface MediaRendererProps {
    src: string;
    fallbackSrc?: string;
    autoPlay?: boolean;
    preSource?: string;
    type?: string;
}

export const MediaRenderer = ({ src: source, fallbackSrc, autoPlay = false, preSource, type }: MediaRendererProps) => {
    const [src, setSrc] = useState(source);
    const isMobile = useMediaQuery('(max-width: 900px)');

    const onError = () => {
        setSrc(fallbackSrc ?? 'fallback');
    };

    const isImage = src.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
    const isVideo = src.match(/\.(mp4|webm|ogg)$/) != null;
    const preIsImage = preSource?.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
    const preIsVideo = preSource?.match(/\.(mp4|webm|ogg)$/) != null;

    if (isVideo || type === 'video') {
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
                {preIsVideo && (
                    <video muted style={{ display: 'none' }}>
                        <source src={src} type="video/mp4" />
                    </video>
                )}
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
                    onError={onError}
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

    if (isImage || src === fallbackSrc || type === 'grid') {
        return (
            <>
                {preIsImage && <Image src={src} alt="asset" width={160} height={160} style={{ display: 'none' }} />}
                <Image
                    src={src}
                    alt="asset"
                    width={160}
                    height={160}
                    onError={onError}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
                />
            </>
        );
    }

    if (type === 'slideshow') {
        return (
            <iframe
                src={src}
                title="stack"
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
