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
    handleChangeCurate(): void;
    handleClickImage(): void;
}

const AssetItem = ({ assetView, asset, isCurated, checkedCurate, handleChangeCurate, handleClickImage }: Props) => {
    return (
        <Box
            sx={{
                border: assetView === asset ? '1px solid #00d6f4' : '',
                maxWidth: 250,
                cursor: 'pointer',
            }}
            onClick={() => {
                if (isCurated) handleChangeCurate();
                else handleClickImage();
            }}
        >
            <BlankCard className="hoverCard">
                <Box width={250} height={250} borderRadius="8px 8px 0 0">
                    <MediaRenderer
                        src={`${AWS_BASE_URL_S3}/${asset?.formats?.preview?.path}`}
                        fallbackSrc={'https://via.placeholder.com/250'}
                    />
                </Box>

                <CardContent sx={{ p: 3, pt: 2 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
                        <Typography variant="h6" sx={{ cursor: 'pointer' }}>
                            {asset?.assetMetadata?.context?.formData?.title || 'No Title'}
                        </Typography>
                        {isCurated && <Checkbox style={{ padding: 0 }} checked={checkedCurate} />}
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
                        {Array.isArray(asset?.assetMetadata?.creators?.formData) &&
                            asset?.assetMetadata?.creators?.formData?.length > 0 && (
                                <a
                                    href="#"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                    }}
                                    style={{ textDecoration: 'underline', padding: 5, paddingLeft: 0 }}
                                >
                                    {asset?.assetMetadata?.creators?.formData[0].name || 'No creator'}
                                </a>
                            )}
                        <Typography variant="h6" minWidth={42} height={25}>
                            $ 150
                        </Typography>
                    </Stack>
                </CardContent>
            </BlankCard>
        </Box>
    );
};

export default AssetItem;
