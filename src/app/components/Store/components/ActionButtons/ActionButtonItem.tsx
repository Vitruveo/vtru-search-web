/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button, useMediaQuery } from '@mui/material';
import styles from './index.module.css';

type ActionButtonProps = {
    title: string;
    onClick?: () => void;
    handleLoad?: () => void;
    handleSelect?: (button: string) => void;
    media: string;
    selected?: string | false;
};

export default function ActionButton({
    title,
    onClick,
    handleLoad,
    handleSelect,
    media,
    selected,
}: ActionButtonProps): React.JSX.Element {
    const isVideo = media.match(/\.(mp4|webm|ogg)$/) != null;
    const isMobile = useMediaQuery('(max-width: 900px)');

    if (isVideo) {
        return (
            <Button
                className={styles.main}
                sx={isMobile ? { width: '80px', height: '80px' } : { padding: 0 }}
                type="button"
                onClick={onClick}
            >
                <video
                    autoPlay
                    loop
                    playsInline
                    muted
                    controls={false}
                    width={isMobile ? '80px' : 100}
                    height={isMobile ? '80px' : 100}
                    style={{
                        minWidth: isMobile ? '80px' : '100px',
                        height: isMobile ? '80px' : 100,
                        border: selected ? '4px solid #FF0066' : 'none',
                        objectFit: 'cover',
                        borderRadius: 8,
                    }}
                    onLoadedData={() => {
                        if (handleLoad && handleSelect) {
                            handleLoad();
                            handleSelect(title.toLowerCase());
                        }
                    }}
                >
                    <source src={media} type="video/mp4" />
                </video>
                <div className={styles.highlight} style={{ position: 'absolute' }}>
                    {title}
                </div>
            </Button>
        );
    }

    return (
        <Button
            className={styles.main}
            sx={isMobile ? { width: '80px', height: '80px' } : {}}
            type="button"
            onClick={onClick}
        >
            <img
                src={media}
                alt={title}
                onLoad={() => {
                    if (handleLoad && handleSelect) {
                        handleLoad();
                        handleSelect(title.toLowerCase());
                    }
                }}
                style={{
                    minWidth: isMobile ? '80px' : '100px',
                    height: isMobile ? '80px' : 100,
                    borderRadius: 8,
                    objectFit: 'cover',
                    border: selected ? '4px solid #FF0066' : 'none',
                }}
            />
            <div className={styles.highlight}>{title}</div>
        </Button>
    );
}
