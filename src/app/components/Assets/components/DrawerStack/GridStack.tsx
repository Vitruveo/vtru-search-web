import { useI18n } from '@/app/hooks/useI18n';
import { AWS_BASE_URL_S3 } from '@/constants/aws';
import { Asset } from '@/features/assets/types';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ShareButton } from './ShareButton';
import html2canvas from 'html2canvas';
import { useDispatch, useSelector } from '@/store/hooks';
import { actions } from '@/features/ws';
import { socket } from '@/services/socket';
import { createTwitterIntent } from '@/utils/twitter';
import { API_BASE_URL } from '@/constants/api';
import LinearProgressWithLabel from '../LinearProgressWithLabel';

interface GridStackProps {
    selectedAssets: Asset[];
    title: string;
}

const sizes = {
    '2x2': 40,
    '3x3': 26,
    '4x4': 19,
} as { [key: string]: number };

export default function GridStack({ selectedAssets, title }: GridStackProps) {
    const captureRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch();
    const { preSignedURL, shareAvailable, path, uploadProgress } = useSelector((state) => state.ws);
    const [selected, setSelected] = useState('2x2');
    const [confirmedGrid, setConfirmedGrid] = useState(false);
    const [screenShot, setScreenShot] = useState('');
    const [loadingSreenshot, setLoadingScreenshot] = useState(false);
    const [loadingRequest, setLoadingRequest] = useState(false);
    const { language } = useI18n();

    const updatedAssets = selectedAssets.map((asset) => {
        const isVideo = asset?.formats?.preview?.path?.match(/\.(mp4|webm|ogg)$/) != null;
        if (isVideo) {
            return {
                ...asset,
                formats: {
                    ...asset.formats,
                    preview: {
                        ...asset.formats.preview,
                        path: asset.formats.preview.path.replace(/\.(\w+)$/, '_thumb.jpg'),
                    },
                },
            };
        }
        return asset;
    });

    const captureScreenshot = async () => {
        try {
            setLoadingScreenshot(true);
            if (captureRef.current) {
                captureRef.current.style.cssText = `
                    display: grid;
                    gap: 20px;
                    grid-template-columns: repeat(${selected[0]}, 1fr);
                    position: absolute;
                    top: -9999px;
                    left: -9999px;
                `;
                document.body.style.overflow = 'hidden';
                const canvas = await html2canvas(captureRef.current);
                captureRef.current!.style.display = 'none';
                setScreenShot(canvas.toDataURL());
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingScreenshot(false);
        }
    };

    useEffect(() => {
        dispatch(actions.setUploadProgress(0));
        dispatch(actions.setShareAvailable(false));
        if (confirmedGrid) captureScreenshot();
    }, [confirmedGrid]);

    useEffect(() => {
        if (screenShot) {
            setLoadingRequest(true);
            dispatch(actions.requestUpload(selectedAssets.map((item) => item._id)));
        }
    }, [screenShot]);

    useEffect(() => {
        if (socket.io) dispatch(actions.watchEvents());
    }, [socket]);

    useEffect(() => {
        if (preSignedURL && screenShot) {
            setLoadingRequest(false);
            dispatch(
                actions.upload({
                    preSignedURL,
                    screenShot,
                })
            );
        }
    }, [preSignedURL, screenShot]);

    const handleConfirmGrid = () => setConfirmedGrid(true);

    const [creatorId, type, timestamp] = path.split('/');

    const url = `${API_BASE_URL}/search/grid`;
    const extra = `&title=${encodeURIComponent(title)}&creatorId=${encodeURIComponent(creatorId)}&type=${encodeURIComponent(type)}&timestamp=${encodeURIComponent(timestamp)}`;
    const twitterShareURL = createTwitterIntent({ url, extra });

    if (confirmedGrid) {
        return (
            <>
                <Box display={'flex'} justifyContent={'center'}>
                    <Typography fontWeight={'bold'}>Now share your image grid with the world</Typography>
                </Box>
                <Box display={'flex'} flexDirection={'row'} gap={5} mt={4} mb={4} justifyContent={'center'}>
                    <Box
                        display={'grid'}
                        bgcolor={'transparent'}
                        gridTemplateColumns={`repeat(${selected[0]}, 1fr)`}
                        gap={0.5}
                        p={1}
                        border={'2px solid #23afdb'}
                    >
                        <div
                            style={{
                                backgroundColor: '#EEEEEE',
                                height: 630,
                                width: 1200,
                                display: 'none',
                            }}
                            ref={captureRef}
                        >
                            {Array.from({ length: Number(selected[0]) ** 2 }).map((_, index) => (
                                <div key={index} style={{ backgroundColor: '#EEEEEE', height: 300, width: 300 }}>
                                    {updatedAssets[index] && (
                                        <Image
                                            src={`${AWS_BASE_URL_S3}/${updatedAssets[index]?.formats?.preview?.path}`}
                                            width={300}
                                            height={300}
                                            alt={`asset in grid ${selected}`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {Array.from({ length: Number(selected[0]) ** 2 }).map((_, index) => (
                            <div
                                key={index}
                                style={{
                                    backgroundColor: '#EEEEEE',
                                    height: sizes[selected] * 2,
                                    width: sizes[selected] * 2,
                                }}
                            >
                                {updatedAssets[index] && (
                                    <Image
                                        src={`${AWS_BASE_URL_S3}/${updatedAssets[index]?.formats?.preview?.path}`}
                                        width={sizes[selected] * 2}
                                        height={sizes[selected] * 2}
                                        alt={`asset in grid ${selected}`}
                                    />
                                )}
                            </div>
                        ))}
                    </Box>
                </Box>
                {loadingSreenshot && <Typography variant="caption">Creating image grid...</Typography>}
                {loadingRequest && <Typography variant="caption">Request upload image grid...</Typography>}
                {shareAvailable ? (
                    <Box display={'flex'} justifyContent={'center'}>
                        <ShareButton
                            twitterURL={twitterShareURL}
                            contentToCopy={`${url}?c=${Date.now()}${extra}`}
                            url={screenShot}
                            downloadable
                            title={title}
                        />
                    </Box>
                ) : (
                    <LinearProgressWithLabel value={uploadProgress} />
                )}
            </>
        );
    }

    return (
        <>
            <Box display={'flex'} justifyContent={'center'}>
                <Typography fontWeight={'bold'}> 🖼️ An image grid looks great on social media</Typography>
            </Box>

            <Box display={'flex'} flexDirection={'row'} gap={5} mt={6} mb={6}>
                <Box
                    display={'grid'}
                    gridTemplateColumns={'repeat(2, 1fr)'}
                    gap={0.5}
                    p={1}
                    border={`2px solid ${selected === '2x2' ? '#23afdb' : '#EEEEEE'}`}
                    onClick={() => setSelected('2x2')}
                >
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            style={{
                                backgroundColor: '#EEEEEE',
                                height: sizes['2x2'],
                                width: sizes['2x2'],
                            }}
                        >
                            {updatedAssets[index] && (
                                <Image
                                    src={`${AWS_BASE_URL_S3}/${updatedAssets[index]?.formats?.preview?.path}`}
                                    width={sizes['2x2']}
                                    height={sizes['2x2']}
                                    alt={'asset in grid 2x2'}
                                />
                            )}
                        </div>
                    ))}
                </Box>
                <Box
                    display={'grid'}
                    gridTemplateColumns={'repeat(3, 1fr)'}
                    gap={0.5}
                    p={1}
                    border={`2px solid ${selected === '3x3' ? '#23afdb' : '#EEEEEE'}`}
                    onClick={() => setSelected('3x3')}
                >
                    {Array.from({ length: 9 }).map((_, index) => (
                        <div
                            key={index}
                            style={{
                                backgroundColor: '#EEEEEE',
                                height: sizes['3x3'],
                                width: sizes['3x3'],
                            }}
                        >
                            {updatedAssets[index] && (
                                <Image
                                    src={`${AWS_BASE_URL_S3}/${updatedAssets[index]?.formats?.preview?.path}`}
                                    width={sizes['3x3']}
                                    height={sizes['3x3']}
                                    alt={'asset in grid 3x3'}
                                />
                            )}
                        </div>
                    ))}
                </Box>
                <Box
                    display={'grid'}
                    gridTemplateColumns={'repeat(4, 1fr)'}
                    gap={0.5}
                    p={1}
                    border={`2px solid ${selected === '4x4' ? '#23afdb' : '#EEEEEE'}`}
                    onClick={() => setSelected('4x4')}
                >
                    {Array.from({ length: 16 }).map((_, index) => (
                        <div
                            key={index}
                            style={{
                                backgroundColor: '#EEEEEE',
                                height: sizes['4x4'],
                                width: sizes['4x4'],
                            }}
                        >
                            {updatedAssets[index] && (
                                <Image
                                    src={`${AWS_BASE_URL_S3}/${updatedAssets[index]?.formats?.preview?.path}`}
                                    width={sizes['4x4']}
                                    height={sizes['4x4']}
                                    alt={'asset in grid 4x4'}
                                />
                            )}
                        </div>
                    ))}
                </Box>
            </Box>

            <Typography variant="caption">Note: Grid is limited to the first 16 curated items.</Typography>
            <Button
                variant="contained"
                fullWidth
                onClick={handleConfirmGrid}
                disabled={updatedAssets.length === 0 || title.length === 0}
            >
                {language['search.drawer.stack.button.publish'] as string}
            </Button>
        </>
    );
}
