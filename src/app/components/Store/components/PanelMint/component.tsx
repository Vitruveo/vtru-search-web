import { Box, Button, Card, Typography } from '@mui/material';
import { Asset } from '@/features/assets/types';
import ModalMinted from '../ModalMinted';
import MetadataAccordion from '../Metadata/MetadataAccordion';
import LicenseModal from './licenseModal';

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
        platformFee: {
            porcent: number;
            value: number;
        };
        feesCurator: {
            porcent: number;
            value: number;
        };
        loadingBuy: boolean;
        buyerBalances: {
            grantBalance: number;
            nonGrantBalance: number;
        };
        buyCapability: {
            totalAmount: number;
            grantBalance: number;
            nonGrantBalance: number;
            transactionBalance: number;
        };
        expandedAccordion: string | false;
    };
    actions: {
        handleMintNFT: () => void;
        handleCloseModalMinted: () => void;
        handleCloseModalLicense: () => void;
        handleOpenModalLicense: () => void;
        handleAccordionChange: (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => void;
    };
}

export const PanelMint = ({ image, size, creatorAvatar, creatorName, data, actions }: PanelMintProps) => {
    const { link, stateModalMinted, stateModalLicense, expandedAccordion } = data;
    const { handleCloseModalMinted, handleOpenModalLicense, handleAccordionChange } = actions;

    // isAssetAvailableLicenses

    if (!stateModalLicense) {
        return (
            <>
                <Typography variant="h4" sx={{ color: '#ffff' }} marginBottom={2}>
                    Available Licenses
                </Typography>
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
                            marginLeft={3}
                        >
                            <Typography marginTop={3} variant="h5" sx={{ color: '#ffff' }}>
                                Own this artwork as a digital collectible.
                            </Typography>
                            <Box marginBottom={3} display="flex" alignItems="center" gap={2}>
                                <Button
                                    variant="contained"
                                    onClick={handleOpenModalLicense}
                                    sx={{
                                        backgroundColor: '#FF0066',
                                        color: '#ffff',
                                        '&:hover': {
                                            backgroundColor: '#FF0066',
                                        },
                                        borderRadius: 0,
                                    }}
                                >
                                    Buy with VUSD
                                </Button>
                                <Typography variant="h6" sx={{ color: '#ffff' }}>
                                    Requires crypto wallet.{' '}
                                    <Typography
                                        component="span"
                                        sx={{
                                            textDecoration: 'underline',
                                            cursor: 'pointer',
                                            color: '#ffff',
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
                            <Typography variant="h6" sx={{ color: '#ffff' }}>
                                Coming Soon!
                            </Typography>
                        </Box>
                    </MetadataAccordion>
                </Box>
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

                <ModalMinted open={stateModalMinted} handleClose={handleCloseModalMinted} link={link} />
            </Card>
        </>
    );
};

export default PanelMint;
