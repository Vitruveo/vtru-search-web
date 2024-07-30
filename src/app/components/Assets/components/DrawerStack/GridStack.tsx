import { useI18n } from '@/app/hooks/useI18n';
import { AWS_BASE_URL_S3 } from '@/constants/aws';
import { Asset } from '@/features/assets/types';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { ShareButton } from './ShareButton';

interface GridStackProps {
    selectedAssets: Asset[];
}

const sizes = {
    '2x2': 40,
    '3x3': 26,
    '4x4': 19,
} as { [key: string]: number };

export default function GridStack({ selectedAssets }: GridStackProps) {
    const [selected, setSelected] = useState('2x2');
    const [confirmedGrid, setConfirmedGrid] = useState(false);
    const { language } = useI18n();

    const handleConfirmGrid = () => {
        setConfirmedGrid(true);
    };

    if (confirmedGrid) {
        return (
            <>
                <Typography>Now share your image grid with the world</Typography>
                <Box display={'flex'} flexDirection={'row'} gap={5} mt={4} mb={4} justifyContent={'center'}>
                    <Box
                        display={'grid'}
                        gridTemplateColumns={`repeat(${selected[0]}, 1fr)`}
                        gap={0.5}
                        p={1}
                        border={'2px solid #23afdb'}
                    >
                        {Array.from({ length: Number(selected[0]) ** 2 }).map((_, index) => (
                            <div
                                key={index}
                                style={{
                                    backgroundColor: '#EEEEEE',
                                    height: sizes[selected] * 2,
                                    width: sizes[selected] * 2,
                                }}
                            >
                                {selectedAssets[index] && (
                                    <Image
                                        src={`${AWS_BASE_URL_S3}/${selectedAssets[index]?.formats?.preview?.path}`}
                                        width={sizes[selected] * 2}
                                        height={sizes[selected] * 2}
                                        alt={'asset in grid 2x2'}
                                    />
                                )}
                            </div>
                        ))}
                    </Box>
                </Box>
                <Box display={'flex'} justifyContent={'center'}>
                    <ShareButton twitterURL={''} videoURL="" />
                </Box>
            </>
        );
    }

    return (
        <>
            <Typography> 🖼️ An image grid looks great on social media</Typography>

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
                            {selectedAssets[index] && (
                                <Image
                                    src={`${AWS_BASE_URL_S3}/${selectedAssets[index]?.formats?.preview?.path}`}
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
                            {selectedAssets[index] && (
                                <Image
                                    src={`${AWS_BASE_URL_S3}/${selectedAssets[index]?.formats?.preview?.path}`}
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
                            {selectedAssets[index] && (
                                <Image
                                    src={`${AWS_BASE_URL_S3}/${selectedAssets[index]?.formats?.preview?.path}`}
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
            <Button variant="contained" fullWidth onClick={handleConfirmGrid}>
                {language['search.drawer.stack.button.publish'] as string}
            </Button>
        </>
    );
}
