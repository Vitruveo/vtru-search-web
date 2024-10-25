import { useMediaQuery } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface MediaPreviewProps {
    media: string;
    alt: string;
    width: number | string;
    height: number;
    onClick?: () => void;
}

const MediaRenderStoreMain = ({ media, alt, height, width, onClick }: MediaPreviewProps): React.JSX.Element => {
    const isVideo = media.match(/\.(mp4|webm|ogg)$/) != null;
    const [key, setKey] = useState(0);
    const isMobile = useMediaQuery('(max-width: 900px)');

    useEffect(() => {
        setKey((prev) => prev + 1);
    }, [media]);

    if (isVideo) {
        return (
            <video
                width={width}
                height={height}
                autoPlay
                loop
                playsInline
                muted
                controls={false}
                onClick={onClick}
                key={key}
                style={{ display: 'block', margin: '0 auto', borderRadius: 10, cursor: 'pointer' }}
            >
                <source src={media} type="video/mp4" />
            </video>
        );
    }

    return (
        <div
            style={{
                display: 'block',
                margin: '0 auto',
                cursor: 'pointer',
                position: 'relative',
                width,
                height,
            }}
        >
            <Image
                src={media}
                alt={alt}
                onClick={onClick}
                draggable={false}
                fill
                style={{ objectFit: isMobile ? 'cover' : 'contain', borderRadius: 10 }}
            />
        </div>
    );
};

export const MediaRenderStore = React.memo(MediaRenderStoreMain);
