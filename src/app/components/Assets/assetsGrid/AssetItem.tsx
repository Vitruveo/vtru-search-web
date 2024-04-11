import { Box, CardContent, Checkbox, Stack, Typography } from '@mui/material';
import BlankCard from '../../Shared/BlankCard';
import Image from 'next/image';
import { AWS_BASE_URL_S3 } from '@/constants/aws';
import { Asset } from '@/features/assets/types';
import { useState } from 'react';

interface Props {
    assetView: Asset;
    asset: Asset;
    isCurated: boolean;
    checkedCurate: boolean;
    handleChangeCurate(event: React.ChangeEvent<HTMLInputElement>): void;
    handleClickImage(): void;
}

const AssetItem = ({ assetView, asset, isCurated, checkedCurate, handleChangeCurate, handleClickImage }: Props) => {
    const [file, setFile] = useState(`${AWS_BASE_URL_S3}/${asset?.formats?.preview?.path}`);

    return (
        <Box
            sx={{
                border: assetView === asset ? '1px solid #00d6f4' : '',
                maxWidth: 250,
                cursor: 'pointer',
            }}
            onClick={handleClickImage}
        >
            <BlankCard className="hoverCard">
                <Typography>
                    {asset?.formats?.preview?.path.includes('mp4') ? (
                        <video
                            width="250"
                            height="250"
                            autoPlay
                            muted
                            loop
                            style={{
                                objectFit: 'cover',
                            }}
                        >
                            <source src={file} type="video/mp4" />
                        </video>
                    ) : (
                        <Image
                            src={file}
                            alt="img"
                            style={{
                                objectFit: 'cover',
                            }}
                            width={250}
                            height={250}
                            onError={(e) => {
                                setFile('https://via.placeholder.com/250');
                            }}
                        />
                    )}
                </Typography>

                <CardContent sx={{ p: 3, pt: 2 }}>
                    <Typography variant="h6" onClick={handleClickImage} sx={{ cursor: 'pointer' }}>
                        {asset?.assetMetadata?.context?.formData?.title || 'No Title'}
                    </Typography>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
                        <Typography variant="h6" height={25}>
                            $ 150
                        </Typography>
                        {isCurated && (
                            <Checkbox style={{ padding: 0 }} checked={checkedCurate} onChange={handleChangeCurate} />
                        )}
                    </Stack>
                </CardContent>
            </BlankCard>
        </Box>
    );
};

export default AssetItem;
