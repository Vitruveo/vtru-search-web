import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, CircularProgress, Grid, Typography, useMediaQuery } from '@mui/material';
import LazyLoad from 'react-lazyload';
import '../Assets/assetsGrid/AssetScroll.css';
import pkgJson from '../../../../package.json';
import { Asset } from '@/features/assets/types';
import { LastAssets } from '@/features/store/types';
import { Creators } from '../Assets/types';
import { ASSET_STORAGE_URL } from '@/constants/aws';
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
import { getThumbnailFromPath } from '@/utils/url-assets';
import { getAssetWatermark } from '@/features/assets/requests';
import { useSelector } from '@/store/hooks';
import { NODE_ENV } from '@/constants/api';

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
    const [format, setFormat] = useState<string>('preview');
    const [watermarkFormats, setWatermarkFormats] = useState<{ [key: string]: string } | null>(null);
    const [expandedAccordion, setExpandedAccordion] = useState<string | false>(false);
    const [open, setOpen] = useState(false);
    const [contents, setContents] = useState<string>('');
    const [modalLoading, setModalLoading] = useState<string | null>(null);
    const redirectState = useSelector((state) => state.redirects.data);
    const redirects = {
        search: redirectState[NODE_ENV].xibit.search_url,
        explorer: redirectState[NODE_ENV].vitruveo.explorer_url,
    };

    const isMobile = useMediaQuery('(max-width: 900px)');

    const handleClose = () => setOpen(false);
    const handleOpen = (content: string) => {
        const isVideo = content.match(/\.(mp4|webm|ogg)$/) != null;
        if (isVideo) {
            setContents(content);
            setOpen(true);
            return;
        }
        if (watermarkFormats) {
            if (watermarkFormats[format] && format !== 'exhibition') {
                setContents(watermarkFormats[format]);
            } else {
                setContents(content);
            }
            setOpen(true);
        } else {
            setModalLoading(content);
        }
    };

    const handleChangeImage = (newImage: string, isThumbnail: boolean = true) => {
        const isVideo = newImage.match(/\.(mp4|webm|ogg)$/) != null;
        if (isThumbnail && !isVideo) setImage(getThumbnailFromPath(newImage));
        else setImage(newImage);
    };

    const handleLoad = () => {
        handleChangeImage(`${ASSET_STORAGE_URL}/${asset.formats?.display?.path}`);
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

    const handleDownloadMedia = async () => {
        const url = `${ASSET_STORAGE_URL}/${asset.formats?.original?.path}`;
        const fileName = asset.assetMetadata?.context?.formData?.title || Date.now().toString();

        try {
            const response = await axios.get(url, { responseType: 'blob' });
            const blob = response.data;
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Error downloading the file', error);
        }
    };

    const handleClenupWatermarks = () => {
        if (watermarkFormats)
            Object.values(watermarkFormats).forEach((url) => {
                if (url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });
    };

    const handleGetAssetWatermarks = async () => {
        handleClenupWatermarks();
        if (asset.formats) {
            const watermarkResults = await Promise.allSettled(
                Object.keys(asset.formats).map(async (formatKey) => {
                    if (asset.formats && asset._id) {
                        try {
                            const watermarkBuffer = await getAssetWatermark({ assetId: asset._id, format: formatKey });
                            const blob = new Blob([watermarkBuffer], { type: 'image/jpeg' });
                            const imageUrl = URL.createObjectURL(blob);

                            const img = new window.Image();
                            img.src = imageUrl;

                            return [formatKey, imageUrl];
                        } catch (error) {
                            return null;
                        }
                    }
                    return null;
                })
            );

            const successfulWatermarks = Object.fromEntries(
                watermarkResults
                    .filter((result) => result.status === 'fulfilled' && result.value !== null)
                    .map((result) => (result as PromiseFulfilledResult<[string, string]>).value)
            );
            setWatermarkFormats(successfulWatermarks);
        }
    };

    useEffect(() => {
        if (asset.formats) {
            handleGetAssetWatermarks();
        }
        if (asset.formats?.preview.path) handleChangeImage(`${ASSET_STORAGE_URL}/${asset.formats?.preview.path}`);
    }, [asset?.formats]);

    useEffect(() => {
        if (watermarkFormats && modalLoading) {
            handleOpen(modalLoading);
            setModalLoading(null);
        }
        return () => {
            handleClenupWatermarks();
        };
    }, [watermarkFormats]);

    if (loading)
        return (
            <Grid item justifyContent={'center'} alignItems={'center'} display={'flex'}>
                <CircularProgress sx={{ color: '#FF0066' }} />
            </Grid>
        );

    const getWidth = () => {
        if (isMobile) return 300;
        return 500;
    };

    const getHeight = () => {
        if (isMobile) return 300;
        return 500;
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
                        sx={{
                            position: 'relative',
                        }}
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
                            <ActionButtons
                                asset={asset}
                                format={format}
                                setImage={handleChangeImage}
                                handleLoad={handleLoad}
                                setFormat={setFormat}
                            />
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
                                image={`${ASSET_STORAGE_URL}/${asset.formats?.preview?.path}`}
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
                            <ActionButtons
                                asset={asset}
                                format={format}
                                setImage={handleChangeImage}
                                handleLoad={handleLoad}
                                setFormat={setFormat}
                            />
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
                                            url: `${redirects.explorer}/tx/${asset?.mintExplorer?.transactionHash}`,
                                        },
                                        extra: {
                                            url: `${redirects.search}?portfolio_wallets=${asset?.mintExplorer?.address}`,
                                        },
                                    },
                                    {
                                        title: 'Consigned to Vault',
                                        date: asset.consignArtwork.listing,
                                        link: {
                                            text: asset?.vault?.vaultAddress
                                                ? `${asset?.vault?.vaultAddress.slice(0, 4)}...${asset?.vault?.vaultAddress.slice(-4)}`
                                                : '',
                                            url: asset?.vault?.vaultAddress
                                                ? `${redirects.explorer}/address/${asset?.vault?.vaultAddress}`
                                                : '',
                                        },
                                    },
                                ]}
                                downloadMedia={handleDownloadMedia}
                                mintAdress={asset?.mintExplorer?.address}
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
                <Background path={getThumbnailFromPath(asset?.formats?.preview?.path)} />
                <Modal
                    open={open}
                    handleClose={handleClose}
                    content={contents}
                    baseUrl={watermarkFormats && watermarkFormats['original'] ? '' : ASSET_STORAGE_URL}
                    path={
                        watermarkFormats
                            ? watermarkFormats['original']
                            : getThumbnailFromPath(asset.formats?.original?.path)
                    }
                />
                {!!modalLoading && (
                    <Box
                        sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            bgcolor: 'rgba(0,0,0,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1300,
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}
            </Box>
        </LazyLoad>
    );
};

export default Store;
