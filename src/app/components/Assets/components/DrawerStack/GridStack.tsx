import { useI18n } from '@/app/hooks/useI18n';
import { AWS_BASE_URL_S3 } from '@/constants/aws';
import { Asset } from '@/features/assets/types';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

interface GridStackProps {
    selectedAssets: Asset[];
}
export default function GridStack({ selectedAssets }: GridStackProps) {
    const [selected, setSelected] = useState('1');
    const { language } = useI18n();

    return (
        <>
            <Typography> 🖼️ An image grid looks great on social media</Typography>

            <Box display={'flex'} flexDirection={'row'} gap={5} mt={6} mb={6}>
                <Box
                    display={'grid'}
                    gridTemplateColumns={'repeat(2, 1fr)'}
                    gap={0.5}
                    p={1}
                    border={`2px solid ${selected === '1' ? '#23afdb' : '#EEEEEE'}`}
                    onClick={() => setSelected('1')}
                >
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} style={{ backgroundColor: '#EEEEEE', height: '40px', width: '40px' }}>
                            {selectedAssets[index] && (
                                <Image
                                    src={`${AWS_BASE_URL_S3}/${selectedAssets[index]?.formats?.preview?.path}`}
                                    width={40}
                                    height={40}
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
                    border={`2px solid ${selected === '2' ? '#23afdb' : '#EEEEEE'}`}
                    onClick={() => setSelected('2')}
                >
                    {Array.from({ length: 9 }).map((_, index) => (
                        <div key={index} style={{ backgroundColor: '#EEEEEE', height: '26px', width: '26px' }}>
                            {selectedAssets[index] && (
                                <Image
                                    src={`${AWS_BASE_URL_S3}/${selectedAssets[index]?.formats?.preview?.path}`}
                                    width={26}
                                    height={26}
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
                    border={`2px solid ${selected === '3' ? '#23afdb' : '#EEEEEE'}`}
                    onClick={() => setSelected('3')}
                >
                    {Array.from({ length: 16 }).map((_, index) => (
                        <div key={index} style={{ backgroundColor: '#EEEEEE', height: '19px', width: '19px' }}>
                            {selectedAssets[index] && (
                                <Image
                                    src={`${AWS_BASE_URL_S3}/${selectedAssets[index]?.formats?.preview?.path}`}
                                    width={19}
                                    height={19}
                                    alt={'asset in grid 4x4'}
                                />
                            )}
                        </div>
                    ))}
                </Box>
            </Box>
            <Typography variant="caption">Note: Grid is limited to the first 16 curated items.</Typography>
            <Button disabled variant="contained" fullWidth>
                {language['search.drawer.stack.button.publish'] as string}
            </Button>
        </>
    );
}
