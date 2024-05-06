import { Box, CardContent, Checkbox, Stack, Typography } from '@mui/material';
import BlankCard from '../../Shared/BlankCard';
import { AWS_BASE_URL_S3 } from '@/constants/aws';
import { Asset } from '@/features/assets/types';
import { MediaRenderer } from '../components/MediaRenderer';

interface Props {
    assetView: Asset;
    asset: Asset;
    isCurated: boolean;
    checkedCurate: boolean;
    handleChangeCurate(event: React.ChangeEvent<HTMLInputElement>): void;
    handleClickImage(): void;
    isAvailable?: boolean;
}

const AssetItem = ({
    assetView,
    asset,
    isCurated,
    checkedCurate,
    handleChangeCurate,
    handleClickImage,
    isAvailable = true,
}: Props) => {
    return (
        <Box
            sx={{
                border: assetView === asset ? '1px solid #00d6f4' : '',
                maxWidth: 250,
                cursor: 'pointer',
            }}
            style={{
                filter: isAvailable ? 'none' : 'grayscale(1)',
            }}
        >
            <BlankCard className="hoverCard">
                <Box width={250} height={250} onClick={handleClickImage} borderRadius="8px 8px 0 0" position='relative'>
                    {!isAvailable && (
                        <Box position='absolute' pl={4} pt={2}>
                            <Typography fontWeight={900} fontSize={16} textAlign='center' color='white'>NOT AVAILABLE</Typography>
                        </Box>
                    )}
                    <MediaRenderer
                        src={`${AWS_BASE_URL_S3}/${asset?.formats?.preview?.path}`}
                        fallbackSrc={'https://via.placeholder.com/250'}
                    />
                </Box>

                <CardContent
                    color="white"
                    sx={{ p: 3, pt: 2 }}
                    style={{ backgroundColor: isAvailable ? 'white' : '#c4c4c4' }}
                >
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
