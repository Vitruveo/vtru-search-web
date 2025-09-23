import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface MediaPreviewProps {
    media: string;
    alt: string;
    width: number | string;
    height: number;
    removeMargin?: boolean;
    onClick?: () => void;
}

const MediaRenderStoreMain = ({
    media,
    removeMargin,
    alt,
    height,
    width,
    onClick,
}: MediaPreviewProps): React.JSX.Element => {
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
                style={{
                    display: 'block',
                    margin: removeMargin ? '0' : '0 auto',
                    borderRadius: 10,
                    cursor: 'pointer',
                    objectFit: 'contain',
                    maxWidth: '100%',
                    maxHeight: '100%',
                }}
            >
                <source src={media} type="video/mp4" />
            </video>
        );
    }

    return (
        <div
            style={{
                maxWidth: width,
                maxHeight: height,
                position: 'relative',
                cursor: 'pointer',
                width: '100%',
                height: '100%',
                minHeight: '500px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Image src={media} alt={alt} onClick={onClick} draggable={false} unoptimized fill objectFit="contain" />
        </div>
    );
};

export const MediaRenderStore = React.memo(MediaRenderStoreMain);
