import { Box, Button, Card, Typography, useMediaQuery } from '@mui/material';
import { useRouter, useParams } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import { Asset } from '@/features/assets/types';
import BuyVUSDModalHOC from '@/app/components/BuyVUSD/modalHOC';
import ModalMinted from '../ModalMinted';
import MetadataAccordion from '../Metadata/MetadataAccordion';
import LicenseModal from './licenseModal';
import PrintLicenseModal from './PrintLicense/index';
import { LastAssetsList } from '../LastAssetsList';
import { LastAssets } from '@/features/store/types';
import { LoadingAvailableLincenses } from '../LoadingAvailableLicenses';

export interface PanelMintProps {
    image: string;
    size: {
        width: number;
        height: number;
    };
    creatorAvatar: string;
    creatorName: string;
    data: {
        asset: Asset;
        license: string;
        credits: number;
        walletCredits: number;
        available: boolean;
        address: `0x${string}` | undefined;
        isConnected: boolean;
        stateModalMinted: boolean;
        stateModalLicense: boolean;
        stateModalPrintLicense: boolean;
        link: string;
        loading: {
            state: boolean;
            message: string;
        };
        blocked: boolean;
        chain: boolean;
        notListed: boolean;
        assetTitle?: string;
        totalFee: number;
        openModalBuyVUSD: boolean;
        platformFee: {
            porcent: number;
            value: number;
        };
        feesCurator: {
            porcent: number;
            value: number;
        };
        loadingBuy: boolean;
        buyCapability: {
            totalAmount: number;
        };
        expandedAccordion: string | false;
        lastAssets: LastAssets[];
        lastAssetsLoading: boolean;
        assetLicenses: {
            available: boolean;
            credits: number;
        } | null;
    };
    actions: {
        handleMintNFT: () => void;
        handleCloseModalMinted: () => void;
        handleCloseModalLicense: () => void;
        handleOpenModalLicense: () => void;
        handleCloseModalPrintLicense: () => void;
        handleOpenModalPrintLicense: () => void;
        handleOpenModalBuyVUSD: () => void;
        handleCloseModalBuyVUSD: () => void;
        handleAccordionChange: (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => void;
    };
}

export const PanelMint = ({ image, size, creatorAvatar, creatorName, data, actions }: PanelMintProps) => {
    const theme = useTheme();
    const router = useRouter();
    const params = useParams();

    const isMobile = useMediaQuery('(max-width: 900px)');
    const {
        link,
        assetLicenses,
        stateModalMinted,
        stateModalLicense,
        stateModalPrintLicense,
        expandedAccordion,
        available,
        asset,
        lastAssets,
        lastAssetsLoading,
        openModalBuyVUSD,
    } = data;
    const {
        handleCloseModalMinted,
        handleOpenModalLicense,
        handleOpenModalPrintLicense,
        handleAccordionChange,
        handleOpenModalBuyVUSD,
        handleCloseModalBuyVUSD,
    } = actions;

    if (!assetLicenses) return <LoadingAvailableLincenses message="Checking Licenses..." background="#000000" />;

    if (!stateModalPrintLicense && !stateModalLicense && !openModalBuyVUSD && !stateModalMinted) {
        return (
            <>
                <Typography variant="h4" sx={{ color: '#ffff' }} marginBottom={2}>
                    {available ? 'Available Licenses' : 'No Licenses Available'}
                </Typography>
                {available ? (
                    <Box>
                        <MetadataAccordion
                            title="Digital Collectible"
                            last={false}
                            expanded={expandedAccordion === 'digitalCollectible'}
                            onChange={handleAccordionChange('digitalCollectible')}
                        >
                            <Box
                                display="flex"
                                flexDirection="column"
                                height={140}
                                justifyContent="space-between"
                                marginLeft={isMobile ? 0 : 3}
                            >
                                <Typography
                                    marginTop={isMobile ? 0 : 3}
                                    variant="h5"
                                    sx={{ color: theme.palette.text.primary }}
                                >
                                    Own this artwork as a digital collectible.
                                </Typography>
                                <Box marginBottom={isMobile ? 0 : 3} display="flex" alignItems="center" gap={2}>
                                    <Button
                                        variant="contained"
                                        onClick={handleOpenModalLicense}
                                        sx={{
                                            backgroundColor: theme.palette.primary.main,
                                            color: '#ffff',
                                            '&:hover': {
                                                backgroundColor: theme.palette.primary.main,
                                            },
                                            borderRadius: 0,
                                        }}
                                    >
                                        Buy with VUSD
                                    </Button>
                                    <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                                        Requires crypto wallet.{' '}
                                        <Typography
                                            onClick={handleOpenModalBuyVUSD}
                                            component="span"
                                            sx={{
                                                textDecoration: 'underline',
                                                cursor: 'pointer',
                                                color: theme.palette.text.primary,
                                            }}
                                        >
                                            Get VUSD
                                        </Typography>
                                    </Typography>
                                </Box>
                            </Box>
                        </MetadataAccordion>
                        <MetadataAccordion
                            title="Print"
                            last
                            expanded={expandedAccordion === 'print'}
                            onChange={handleAccordionChange('print')}
                        >
                            <Box display="flex" alignItems="center" height={140} marginLeft={3}>
                                <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                                    Coming Soon!
                                </Typography>
                            </Box>
                        </MetadataAccordion>
                    </Box>
                ) : (
                    <Box>
                        <LastAssetsList
                            assets={lastAssets}
                            loading={lastAssetsLoading}
                            creatorName={creatorName}
                            creatorId={asset.framework?.createdBy}
                        />
                    </Box>
                )}
            </>
        );
    }

    return (
        <>
            <Card style={{ display: 'flex', flexDirection: 'column', borderRadius: 0 }}>
                <LicenseModal
                    image={image}
                    size={size}
                    creatorAvatar={creatorAvatar}
                    creatorName={creatorName}
                    data={data}
                    actions={actions}
                />

                <PrintLicenseModal
                    image={image}
                    size={size}
                    creatorAvatar={creatorAvatar}
                    creatorName={creatorName}
                    data={data}
                    actions={actions}
                />

                <ModalMinted open={stateModalMinted} handleClose={handleCloseModalMinted} link={link} />
                <BuyVUSDModalHOC isOpen={openModalBuyVUSD} onClose={handleCloseModalBuyVUSD} />
            </Card>
        </>
    );
};

export default PanelMint;
