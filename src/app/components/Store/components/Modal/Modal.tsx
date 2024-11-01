/* eslint-disable @next/next/no-img-element */
import { Modal as MuiModal, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import styled from './index.module.css';

interface ModalProps {
    open: boolean;
    handleClose: () => void;
    content: string;
    baseUrl?: string;
    path?: string;
}

export default function Modal({ open, handleClose, content, baseUrl, path }: ModalProps) {
    const isVideo = content.match(/\.(mp4|webm|ogg)$/) != null;
    const [magnifyStyle, setMagnifyStyle] = useState({});
    const isMobile = useMediaQuery('(max-width: 900px)');

    const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
        const { clientX, clientY } = e;
        const { offsetWidth, offsetHeight } = e.currentTarget;
        const rect = e.currentTarget.getBoundingClientRect();
        const xPercantage = ((clientX - rect.left) / offsetWidth) * 100;
        const yPercantage = ((clientY - rect.top) / offsetHeight) * 100;
        setMagnifyStyle((prev) => ({
            ...prev,
            display: 'block',
            top: `${clientY - 100}px`,
            left: `${clientX - 100}px`,
            backgroundPosition: `${xPercantage}% ${yPercantage}%`,
        }));
    };

    const handleMouseLeave = () => {
        setMagnifyStyle((prev) => ({ ...prev, display: 'none' }));
    };

    return (
        <MuiModal open={open} onClose={handleClose}>
            <div
                className={styled.main}
                onClick={(e) => (e.target === e.currentTarget || isMobile) && handleClose()}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}
            >
                {!isVideo ? (
                    <>
                        <img
                            src={content}
                            alt="original-image"
                            className={styled.imageModal}
                            draggable={false}
                            onMouseMove={!isMobile ? handleMouseMove : () => {}}
                            onMouseLeave={!isMobile ? handleMouseLeave : () => {}}
                        />
                    </>
                ) : (
                    <video className={styled.video} autoPlay loop playsInline controls={false}>
                        <source src={content} type="video/mp4" />
                    </video>
                )}
                {!isMobile ? (
                    <div className={styled.magnify} style={{ backgroundImage: `url(${content})`, ...magnifyStyle }} />
                ) : null}
                {baseUrl && path && (
                    <a
                        href={`${baseUrl}/${path}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            textDecoration: 'none',
                            padding: 4,
                            border: '2px solid white',
                            color: 'white',
                            backgroundColor: '#FF0066',
                            borderRadius: 8,
                        }}
                    >
                        View Original Media
                    </a>
                )}
            </div>
        </MuiModal>
    );
}
