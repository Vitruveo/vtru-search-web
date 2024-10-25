import { Asset } from '@/features/assets/types';
import { Box, CircularProgress, Grid, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { MediaRenderer } from '../Assets/components/MediaRenderer';
import PanelMint from './components/PanelMint';
import { User } from './components/User';
import { AWS_BASE_URL_S3 } from '@/constants/aws';

interface StoreProps {
    data: {
        asset: Asset;
        loading: boolean;
        username: string;
        creatorAvatar: string;
    };
}

const Store = ({ data }: StoreProps) => {
    const { asset, loading, creatorAvatar, username } = data;

    const [size, setSize] = useState({ width: 300, height: 300 });
    const [image, setImage] = useState<string>('');

    useEffect(() => {
        if (asset.formats?.preview.path) setImage(`${AWS_BASE_URL_S3}/${asset.formats?.preview.path}`);
    }, [asset?.formats]);

    if (loading)
        return (
            <Grid item justifyContent={'center'} alignItems={'center'} display={'flex'}>
                <CircularProgress sx={{ color: '#FF0066' }} />
            </Grid>
        );

    return (
        <Box maxHeight={1300} display={'flex'} justifyContent={'center'} height={'100vh'}>
            <LazyLoad once style={{ minWidth: 1300 }}>
                <Box display="flex" flexDirection="column" gap={3}>
                    <Grid
                        container
                        spacing={2}
                        padding={3}
                        sx={{
                            backgroundColor: '#000000',
                            height: 'auto',
                            minHeight: '700px',
                        }}
                    >
                        <Grid
                            item
                            md={6}
                            width="100%"
                            alignItems="center"
                            display="flex"
                            justifyContent={'center'}
                            height="100%"
                            minHeight={'600px'}
                        >
                            <Box width={size.width} height={size.height}>
                                <MediaRenderer src={image} />
                            </Box>
                        </Grid>
                        <Grid item md={6} width="100%">
                            <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                                <Box display="flex" flexDirection="column" gap={1}>
                                    <Typography variant="h1" sx={{ color: '#ffff' }}>
                                        {asset.assetMetadata?.context.formData.title}
                                    </Typography>
                                    <User creator={creatorAvatar} creatorName={username} asset={asset} />
                                </Box>
                                <Box>
                                    <PanelMint asset={asset} />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </LazyLoad>
        </Box>
    );
};

export default Store;
