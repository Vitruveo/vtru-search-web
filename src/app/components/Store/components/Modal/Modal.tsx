/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { Modal as MuiModal, useMediaQuery, Button, Typography, Box } from '@mui/material';
import { IconZoomCancel, IconZoomCheck } from '@tabler/icons-react';
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
    const [isMagnifyingGlassOn, setIsMagnifyingGlassOn] = useState(false);

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
        <MuiModal
            open={open}
            onClose={handleClose}
            slotProps={{ backdrop: { style: { backgroundColor: 'rgba(0,0,0,0.85)' } } }}
        >
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
                            style={{ cursor: !isMobile && isMagnifyingGlassOn ? 'none' : 'default' }}
                            draggable={false}
                            onMouseMove={!isMobile && isMagnifyingGlassOn ? handleMouseMove : () => {}}
                            onMouseLeave={!isMobile && isMagnifyingGlassOn ? handleMouseLeave : () => {}}
                        />
                    </>
                ) : (
                    <video className={styled.video} autoPlay loop playsInline controls={false}>
                        <source src={content} type="video/mp4" />
                    </video>
                )}
                {!isMobile && isMagnifyingGlassOn ? (
                    <div className={styled.magnify} style={{ backgroundImage: `url(${content})`, ...magnifyStyle }} />
                ) : null}
                <Box display="flex" gap={2}>
                    {!isMobile ? (
                        <Button
                            onClick={() => setIsMagnifyingGlassOn((prev) => !prev)}
                            variant="contained"
                            sx={{ border: '2px solid white' }}
                        >
                            {isMagnifyingGlassOn ? (
                                <Box display={'flex'} flex={1} sx={{ minWidth: '11.5ch' }}>
                                    <IconZoomCancel />
                                    <Typography variant="subtitle2">Disable Loupe</Typography>
                                </Box>
                            ) : (
                                <Box display={'flex'} flex={1} sx={{ minWidth: '11.5ch' }}>
                                    <IconZoomCheck />
                                    <Typography variant="subtitle2">Enable Loupe</Typography>
                                </Box>
                            )}
                        </Button>
                    ) : null}
                    {path && (
                        <a
                            href={baseUrl ? `${baseUrl}/${path}` : path}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                textDecoration: 'none',
                                padding: 4,
                                paddingTop: 8,
                                border: '2px solid white',
                                color: 'white',
                                backgroundColor: '#FF0066',
                                borderRadius: 8,
                            }}
                        >
                            View Full-Size Media
                        </a>
                    )}
                </Box>
            </div>
        </MuiModal>
    );
}
