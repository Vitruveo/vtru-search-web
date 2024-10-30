import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useI18n } from '@/app/hooks/useI18n';
import { AWS_BASE_URL_S3 } from '@/constants/aws';
import { Box, Button, Grid, Typography } from '@mui/material';

import { STACK_BASE_URL } from '@/constants/api';
import { Asset } from '@/features/assets/types';
import { actions } from '@/features/ws';
import { socket } from '@/services/socket';
import { useDispatch, useSelector } from '@/store/hooks';
import { createTwitterIntent, generateUrlToCopyOnTwitter } from '@/utils/twitter';
import { ShareButton } from './ShareButton';

interface GridStackProps {
    selectedAssets: Asset[];
    title: string;
    description: string;
    fees: number;
}

const sizes = {
    '2x2': 26,
    '3x3': 16.9,
    '4x4': 12.35,
} as { [key: string]: number };

export default function GridStack({ selectedAssets, title, description, fees }: GridStackProps) {
    const captureRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch();
    const { language } = useI18n();

    const { grid } = useSelector((state) => state.ws);
    const [selected, setSelected] = useState('2x2');
    const [confirmedGrid, setConfirmedGrid] = useState(false);

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
        const size = selected === '2x2' ? 2 : selected === '3x3' ? 3 : 4;

        dispatch(
            actions.gridUpload({
                assetsId: selectedAssets.map((item) => item._id.toLowerCase()).slice(0, size ** 2),
                assets: selectedAssets.map((item) => item.formats.preview.path).slice(0, size ** 2),
                fees,
                size,
                title,
                description,
            })
        );
    };

    const [_creatorId, _type, timestamp] = grid.path.split('/');

    const url = `${STACK_BASE_URL}/grid/${timestamp}`;
    const twitterShareURL = createTwitterIntent({ url, hashtags: 'Vitruveo,VTRUSuite' });

    if (confirmedGrid) {
        return (
            <>
                <Box display={'flex'} justifyContent={'center'}>
                    <Typography fontWeight={'bold'}>{language['search.drawer.stack.grid.share'] as string}</Typography>
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
                                <div
                                    key={index}
                                    style={{
                                        backgroundColor: '#EEEEEE',
                                        height: 300,
                                        width: 300,
                                    }}
                                >
                                    {updatedAssets[index] && (
                                        <Image
                                            src={`${AWS_BASE_URL_S3}/${updatedAssets[index]?.formats?.preview?.path}`}
                                            width={300}
                                            height={300}
                                            alt={''}
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
                                        alt={''}
                                    />
                                )}
                            </div>
                        ))}
                    </Box>
                </Box>
                {grid.loading && (
                    <Typography variant="caption">
                        {language['search.drawer.stack.grid.generating'] as string}
                    </Typography>
                )}
                {grid.path && (
                    <Box display={'flex'} justifyContent={'center'}>
                        <ShareButton
                            twitterURL={twitterShareURL}
                            contentToCopy={generateUrlToCopyOnTwitter({ url, timestamp })}
                            url={grid.url}
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
                <Typography fontWeight={'bold'}>
                    {' '}
                    🖼️ {language['search.drawer.stack.grid.subtitle'] as string}
                </Typography>
            </Box>

            <Grid container mt={4} mb={4} gap={2} display={'flex'} flexDirection={'row'} justifyContent={'center'}>
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
                                    alt={''}
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
                                    alt={''}
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
                                    alt={''}
                                />
                            )}
                        </div>
                    ))}
                </Box>
            </Grid>

            <Typography variant="caption">{language['search.drawer.stack.grid.note'] as string}</Typography>
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
