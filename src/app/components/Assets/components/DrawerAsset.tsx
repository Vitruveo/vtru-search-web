import { useI18n } from '@/app/hooks/useI18n';
import { Box, Button, Typography, Drawer, useMediaQuery } from '@mui/material';
import cookie from 'cookiejs';
import { Theme } from '@mui/material/styles';
import { Asset } from '@/features/assets/types';
import { ASSET_STORAGE_URL, GENERAL_STORAGE_URL } from '@/constants/aws';
import { SEARCH_BASE_URL } from '@/constants/api';
import { useSelector } from '@/store/hooks';
import { MediaRenderer } from './MediaRenderer';
import Avatar from './Avatar';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import Username from '../../Username';

interface Props {
    drawerOpen: boolean;
    assetView: Asset;
    onClose(): void;
}

export function DrawerAsset({ drawerOpen, assetView, onClose }: Props) {
    const theme = useTheme();
    const { language } = useI18n();

    const lgUp = useMediaQuery((mq: Theme) => mq.breakpoints.up('lg'));
    const mdUp = useMediaQuery((mq: Theme) => mq.breakpoints.up('md'));

    const creator = useSelector((state) => state.assets.creator);
    const paused = useSelector((state) => state.assets.paused);

    const handleClickView = () => {
        const searchParams = new URLSearchParams(window.location.search);
        const grid = searchParams.get('grid');
        const video = searchParams.get('video');

        const domain = window.location.hostname.replace('search.', '');
        cookie.set(`${grid ? 'grid' : video ? 'video' : ''}`, grid || video || '', { path: '/', domain });
        if (!grid) {
            // remove cookie grid
            cookie.remove('grid');
            document.cookie = 'grid=; path=/; domain=' + domain + '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
        if (!video) {
            // remove cookie video
            cookie.remove('video');
            document.cookie = 'video=; path=/; domain=' + domain + '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
        window.open(`${SEARCH_BASE_URL}/${creator.username}/${assetView?._id}`);
    };

    const width = lgUp ? 400 : mdUp ? 300 : 200;
    const height = lgUp ? 300 : mdUp ? 225 : 150;

    return (
        <Drawer anchor="right" open={drawerOpen} onClose={onClose}>
            <Box p={4}>
                <Box width={width} height={width} borderRadius={'8px'}>
                    <MediaRenderer
                        src={`${ASSET_STORAGE_URL}/${assetView?.formats?.preview?.path}`}
                        fallbackSrc={'https://via.placeholder.com/' + width + 'x' + height}
                        autoPlay
                    />
                </Box>

                <Typography variant="h4" mt={2} maxWidth={width} sx={{ wordBreak: 'break-word' }}>
                    {assetView?.assetMetadata?.context?.formData?.title}
                </Typography>
                <Box mt={3} mb={3} display="flex" alignItems="center" gap={1}>
                    <Avatar baseUrl={GENERAL_STORAGE_URL} path={creator.avatar} />
                    <Username
                        username={assetView?.creator?.username}
                        vaultAdress={assetView?.vault?.vaultAddress}
                        size="medium"
                    />
                </Box>
                <Box mb={3}>
                    <Typography variant="h6">
                        {language['search.assetList.visualization.description'] as string}
                    </Typography>
                    <Typography style={{ overflowWrap: 'break-word' }} maxWidth={lgUp ? 400 : mdUp ? 300 : 200}>
                        {assetView?.assetMetadata?.context?.formData?.description}
                    </Typography>
                </Box>
                <Button disabled={paused || !creator.username} fullWidth variant="contained" onClick={handleClickView}>
                    {language['search.assetList.visualization.view'] as string}
                </Button>
            </Box>
        </Drawer>
    );
}
