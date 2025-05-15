import { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, Typography, useMediaQuery } from '@mui/material';
import LazyLoad from 'react-lazyload';
import '../Assets/assetsGrid/AssetScroll.css';
import pkgJson from '../../../../package.json';
import { Asset } from '@/features/assets/types';
import { LastAssets } from '@/features/store/types';
import { Creators } from '../Assets/types';
import { ASSET_STORAGE_URL } from '@/constants/aws';
import { EXPLORER_URL } from '@/constants/web3';
import { SEARCH_BASE_URL } from '@/constants/api';
import { User } from './components/User';
import ActionButtons from './components/ActionButtons/ActionButtonList';
import PanelMint from './components/PanelMint';
import Activity from './components/Activity';
import { About } from './components/About';
import AboutCreator from './components/AboutCreator/AboutCreator';
import MetadataList from './components/Metadata/MetadataList';
import { Background } from './components/Background';
import Modal from './components/Modal/Modal';
import { MediaRenderStore } from './components/MediaRenderStore';
import { LastAssetsList } from './components/LastAssetsList';

interface StoreProps {
    data: {
        asset: Asset;
        loading: boolean;
        username: string;
        creatorAvatar: string;
        creatorLoading: boolean;
        lastAssets: LastAssets[];
        lastAssetsLoading: boolean;
    };
}

const Store = ({ data }: StoreProps) => {
    const { asset, loading, creatorAvatar, username, creatorLoading, lastAssets, lastAssetsLoading } = data;
    const [size, setSize] = useState({ width: 300, height: 300 });
    const [image, setImage] = useState<string>('');
    const [expandedAccordion, setExpandedAccordion] = useState<string | false>(false);
    const [open, setOpen] = useState(false);
    const [contents, setContents] = useState<string>('');

    const isMobile = useMediaQuery('(max-width: 900px)');

    const handleClose = () => setOpen(false);
    const handleOpen = (content: string) => {
        setContents(content);
        setOpen(true);
    };

    const handleLoad = () => {
        setImage(`${ASSET_STORAGE_URL}/${asset.formats?.display?.path}`);
        if (asset.formats?.display?.definition === 'portrait') {
            setSize({ width: 430, height: 630 });
        }
        if (asset.formats?.display?.definition === 'landscape') {
            setSize({ width: 500, height: 300 });
        }
    };

    const handleAccordionChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedAccordion(isExpanded ? panel : false);
    };

    useEffect(() => {
        if (asset.formats?.preview.path) setImage(`${ASSET_STORAGE_URL}/${asset.formats?.preview.path}`);
    }, [asset?.formats]);

    if (loading)
        return (
            <Grid item justifyContent={'center'} alignItems={'center'} display={'flex'}>
                <CircularProgress sx={{ color: '#FF0066' }} />
            </Grid>
        );

    const previewPath = `${ASSET_STORAGE_URL}/${asset.formats?.preview.path}`;

    const getWidth = () => {
        if (image === previewPath && isMobile) return 300;
        if (isMobile) return '100%';
        if (image === previewPath) return 500;
        return size.width;
    };
    const getHeight = () => {
        if (image === previewPath && isMobile) return 300;
        if (image === previewPath) return 500;
        return size.height;
    };

    return (
        <LazyLoad once style={{ minWidth: !isMobile ? 1300 : 0 }}>
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
                        <MediaRenderStore
                            media={image}
                            width={getWidth()}
                            height={getHeight()}
                            alt="original"
                            onClick={() => handleOpen(image)}
                        />
                    </Grid>
                    {isMobile && (
                        <Grid item xs={12}>
                            <ActionButtons asset={asset} setImage={setImage} handleLoad={handleLoad} />
                        </Grid>
                    )}
                    <Grid item md={6} width="100%" display={'flex'} flexDirection={'column'} gap={4}>
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Typography variant="h1" sx={{ color: '#ffff' }}>
                                {asset.assetMetadata?.context.formData.title}
                            </Typography>
                            <User creator={creatorAvatar} creatorName={username} asset={asset} />
                        </Box>
                        <Box display="flex" flexDirection="column" justifyContent="center" height="70%">
                            <PanelMint
                                image={image}
                                creatorAvatar={creatorAvatar}
                                creatorName={username}
                                size={size}
                                asset={asset}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    {!isMobile && (
                        <Grid item md={6} width="100%">
                            <ActionButtons asset={asset} setImage={setImage} handleLoad={handleLoad} />
                        </Grid>
                    )}
                    <Grid item md={6} width="100%">
                        {asset?.consignArtwork?.listing && (
                            <Activity
                                listing={[
                                    {
                                        title: 'Licensed',
                                        date: asset?.mintExplorer?.createdAt,
                                        link: {
                                            text: 'Transaction',
                                            url: `${EXPLORER_URL}/tx/${asset?.mintExplorer?.transactionHash}`,
                                        },
                                        extra: {
                                            text: 'Portfolio',
                                            url: `${SEARCH_BASE_URL}?portfolio_wallets=${asset?.mintExplorer?.address}`,
                                        },
                                    },
                                    {
                                        title: 'Consigned to Vault',
                                        date: asset.consignArtwork.listing,
                                        link: {
                                            text: asset?.vault?.vaultAddress
                                                ? `${asset?.vault?.vaultAddress.slice(0, 6)}...${asset?.vault?.vaultAddress.slice(-6)}`
                                                : '',
                                            url: asset?.vault?.vaultAddress
                                                ? `${EXPLORER_URL}/address/${asset?.vault?.vaultAddress}`
                                                : '',
                                        },
                                    },
                                ]}
                            />
                        )}
                    </Grid>
                </Grid>
                <Grid item>
                    <About data={asset?.assetMetadata?.context.formData.description} />
                </Grid>
                <Grid container spacing={2}>
                    {!isMobile && (
                        <Grid item md={6} width="100%">
                            <AboutCreator
                                data={asset?.assetMetadata?.creators?.formData as unknown as Creators[]}
                                creatorAvatar={creatorAvatar}
                                creatorLoading={creatorLoading}
                            />
                            <LastAssetsList
                                assets={lastAssets}
                                loading={lastAssetsLoading}
                                creatorName={username}
                                creatorId={asset.framework?.createdBy}
                            />
                        </Grid>
                    )}
                    <Grid item md={6} width="100%">
                        {asset?.assetMetadata && (
                            <MetadataList
                                asset={asset}
                                expandedAccordion={expandedAccordion}
                                handleAccordionChange={handleAccordionChange}
                            />
                        )}
                    </Grid>
                    {isMobile && (
                        <Grid item md={6} width="100%">
                            <AboutCreator
                                data={asset?.assetMetadata?.creators?.formData as unknown as Creators[]}
                                creatorAvatar={creatorAvatar}
                                creatorLoading={creatorLoading}
                            />
                        </Grid>
                    )}
                    <Grid item xs={12} sx={{ paddingBottom: '200px' }}>
                        <Typography variant="body1" sx={{ textAlign: 'center' }}>
                            Version: {pkgJson.version}
                        </Typography>
                    </Grid>
                </Grid>
                <Background path={asset?.formats?.preview?.path} />
                <Modal
                    open={open}
                    handleClose={handleClose}
                    content={contents}
                    baseUrl={ASSET_STORAGE_URL}
                    path={asset.formats?.original?.path}
                />
            </Box>
        </LazyLoad>
    );
};

export default Store;
