/* eslint-disable @next/next/no-img-element */
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
        <img
            src={media}
            width={width}
            height={height}
            alt={alt}
            onClick={onClick}
            style={{
                display: 'block',
                borderRadius: '10px',
                cursor: 'pointer',
                objectFit: 'contain',
            }}
            draggable={false}
        />
    );
};

export const MediaRenderStore = React.memo(MediaRenderStoreMain);
