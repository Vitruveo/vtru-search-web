import { useI18n } from '@/app/hooks/useI18n';
import { Box, Button, Typography, Drawer, useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Asset } from '@/features/assets/types';
import { AWS_BASE_URL_S3, GENERAL_STORAGE_URL } from '@/constants/aws';
import { STORE_BASE_URL } from '@/constants/api';
import { useSelector } from '@/store/hooks';
import { MediaRenderer } from './MediaRenderer';
import Avatar from './Avatar';

interface Props {
    drawerOpen: boolean;
    assetView: Asset;
    onClose(): void;
}

export function DrawerAsset({ drawerOpen, assetView, onClose }: Props) {
    const { language } = useI18n();

    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

    const creator = useSelector((state) => state.assets.creator);

    const handleClickView = () => {
        const searchParams = new URLSearchParams(window.location.search);
        const grid = searchParams.get('grid');

        window.open(`${STORE_BASE_URL}/${creator.username}/${assetView?._id}${grid ? `?grid=${grid}` : ''}`, '_blank');
    };

    const width = lgUp ? 400 : mdUp ? 300 : 200;
    const height = lgUp ? 300 : mdUp ? 225 : 150;

    return (
        <Drawer anchor="right" open={drawerOpen} onClose={onClose}>
            <Box p={4}>
                <Box width={width} height={height} borderRadius={'8px'}>
                    <MediaRenderer
                        src={`${AWS_BASE_URL_S3}/${assetView?.formats?.preview?.path}`}
                        fallbackSrc={'https://via.placeholder.com/' + width + 'x' + height}
                        autoPlay
                    />
                </Box>

                <Typography variant="h4" mt={2}>
                    {assetView?.assetMetadata?.context?.formData?.title}
                </Typography>
                <Box mt={3} mb={3} display="flex" alignItems="center" gap={1}>
                    <Avatar baseUrl={GENERAL_STORAGE_URL} path={creator.avatar} />
                    {Array.isArray(assetView?.assetMetadata?.creators?.formData) &&
                        assetView?.assetMetadata?.creators?.formData?.length > 0 && (
                            <Typography variant="h6">
                                {assetView?.assetMetadata?.creators?.formData[0].name || 'No creator'}
                            </Typography>
                        )}
                </Box>
                <Box mb={3}>
                    <Typography variant="h6">
                        {language['search.assetList.visualization.description'] as string}
                    </Typography>
                    <Typography style={{ overflowWrap: 'break-word' }} maxWidth={lgUp ? 400 : mdUp ? 300 : 200}>
                        {assetView?.assetMetadata?.context?.formData?.description}
                    </Typography>
                </Box>
                <Button disabled={!creator.username} fullWidth variant="contained" onClick={handleClickView}>
                    {language['search.assetList.visualization.view'] as string}
                </Button>
            </Box>
        </Drawer>
    );
}
