import { useI18n } from '@/app/hooks/useI18n';
import { AWS_BASE_URL_S3 } from '@/constants/aws';
import { Asset } from '@/features/assets/types';
import { Box, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
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
    setGenerating: Dispatch<SetStateAction<boolean>>;
}

const sizes = {
    '2x2': 40,
    '3x3': 26,
    '4x4': 19,
} as { [key: string]: number };

export default function GridStack({ selectedAssets, title, setGenerating }: GridStackProps) {
    const captureRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch();
    const { language } = useI18n();

    const { grid } = useSelector((state) => state.ws);
    const [selected, setSelected] = useState('2x2');
    const [confirmedGrid, setConfirmedGrid] = useState(false);
    const [loadingRequest, setLoadingRequest] = useState(false);

    useEffect(() => {
        if (socket.io) dispatch(actions.watchEvents());
    }, [socket]);

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

    const handleConfirmGrid = async () => {
        setConfirmedGrid(true);

        dispatch(
            actions.gridUpload({
                assetsId: selectedAssets.map((item) => item._id.toLowerCase()),
                assets: selectedAssets.map((item) => item.formats.preview.path),
                fees: 10,
                size: selected === '2x2' ? 2 : selected === '3x3' ? 3 : 4,
                title,
            })
        );

        await new Promise((resolve) => setTimeout(resolve, 2000));
    };

    const [creatorId, type, timestamp] = grid.path.split('/');

    const url = `${API_BASE_URL}/search/grid`;
    const extra = `title=${encodeURIComponent(title)}&creatorId=${encodeURIComponent(creatorId)}&type=${encodeURIComponent(type)}&timestamp=${encodeURIComponent(timestamp)}`;
    const twitterShareURL = createTwitterIntent({ url, extra, hashtags: 'Vitruveo,VTRUSuite' });

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
                                objectFit: 'contain',
                            }}
                            ref={captureRef}
                        >
                            {Array.from({ length: Number(selected[0]) ** 2 }).map((_, index) => (
                                <div
                                    key={index}
                                    style={{
                                        backgroundColor: '#EEEEEE',
                                        height: 300,
                                        width: 300,
                                        objectFit: 'contain',
                                    }}
                                >
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
                                    objectFit: 'contain',
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
                {grid.loading && <Typography variant="caption">Request upload image grid...</Typography>}
                {grid.path && (
                    <Box display={'flex'} justifyContent={'center'}>
                        <ShareButton
                            twitterURL={twitterShareURL}
                            contentToCopy={`${url}?c=${Date.now()}${extra}`}
                            url={''}
                            downloadable
                            title={title}
                        />
                    </Box>
                )}
            </>
        );
    }

    return (
        <>
            <Box display={'flex'} justifyContent={'center'}>
                <Typography fontWeight={'bold'}> 🖼️ An image grid looks great on social media</Typography>
            </Box>

            <Grid container mt={4} mb={4} gap={4} justifyContent={'center'}>
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
                                objectFit: 'contain',
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
                                objectFit: 'contain',
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
                                objectFit: 'contain',
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
            </Grid>

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
