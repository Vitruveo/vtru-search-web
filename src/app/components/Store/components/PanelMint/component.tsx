import { Box, Button, Card, Modal, Typography, useTheme } from '@mui/material';
import PanelMintInfo from '../PanelMintInfo';
import Licenses from '../Licenses';
import { formatPrice } from '@/utils/assets';
import { LoadingAvailableLincenses } from '../LoadingAvailableLicenses';
import Fees from '../Fees';
import TotalPrice from '../TotalPrice';
import ModalMinted from '../ModalMinted';

interface PanelMintProps {
    data: {
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
    };
    actions: {
        handleMintNFT: () => void;
        handleCloseModalMinted: () => void;
        handleCloseModalLicense: () => void;
        handleOpenModalLicense: () => void;
    };
}

export const PanelMint = ({ data, actions }: PanelMintProps) => {
    const {
        credits,
        walletCredits,
        loading,
        license,
        available,
        isConnected,
        link,
        stateModalMinted,
        address,
        blocked,
        chain,
        notListed,
        platformFee,
        totalFee,
        feesCurator,
        buyCapability,
        loadingBuy,
        stateModalLicense,
    } = data;
    const { handleMintNFT, handleCloseModalMinted, handleCloseModalLicense, handleOpenModalLicense } = actions;

    const theme = useTheme();

    const formattedPrice = formatPrice({ price: credits, withUS: true, decimals: true });

    const { state, message } = loading;

    const warningMessage = () => {
        if (!isConnected) return '(Connect wallet)';
        if (notListed) return '(Not listed)';
        if (!chain) return '(Change network to Vitruveo)';
        if (blocked) return '(Not available)';
        if (walletCredits < credits) return '(Insufficient funds)';
    };

    const contentMessage = () => {
        if (!isConnected) return 'Not connected';
        if (notListed) return 'Not listed';
        if (!chain) return 'Change network to Vitruveo';
        if (blocked) return 'Not available';
        if (loadingBuy) return 'Loading...';
        if (!available) return 'SOLD';

        return formattedPrice;
    };

    if (!stateModalLicense) {
        return (
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
                    marginTop: 1,
                }}
            >
                Digital Artwork License
            </Button>
        );
    }

    return (
        <Card style={{ display: 'flex', flexDirection: 'column', borderRadius: 0 }}>
            <Box>
                <Modal
                    open={stateModalLicense}
                    onClose={handleCloseModalLicense}
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Box
                            width="80%"
                            bgcolor={theme.palette.background.default}
                            position="relative"
                            padding={6}
                            borderRadius={0}
                        >
                            <Button
                                onClick={handleCloseModalLicense}
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    color: theme.palette.text.primary,
                                    backgroundColor: 'transparent',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                    },
                                }}
                            >
                                X
                            </Button>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={8}>
                                <Typography variant="h1">
                                    {address ? 'License Digital Collectible' : 'Connect Wallet'}
                                </Typography>
                                {address && (
                                    <Typography>{address?.slice(0, 6) + '...' + address?.slice(-4)}</Typography>
                                )}
                            </Box>
                            {state ? (
                                <Box minHeight={319}>
                                    <LoadingAvailableLincenses message={message} />
                                </Box>
                            ) : (
                                <Box flexDirection="column" display="flex" margin="0 auto 0" maxWidth={500} gap={2}>
                                    <Box mb={2}>
                                        <Typography variant="h4">Digital Artwork License</Typography>
                                    </Box>
                                    <Licenses title="License type" license={license} />
                                    {isConnected && available && chain ? (
                                        <Box display={'flex'} flexDirection={'column'} gap={1.5}>
                                            <Box>
                                                <PanelMintInfo title="Price" content={contentMessage()} />
                                                <Fees
                                                    title="Fees"
                                                    value={platformFee.value + feesCurator.value}
                                                    fees={{
                                                        platform: platformFee,
                                                        curator: feesCurator,
                                                    }}
                                                />
                                                <TotalPrice title="Total" value={totalFee} />
                                            </Box>
                                            <Box display={'flex'} flexDirection={'column'} gap={0.2}>
                                                <PanelMintInfo
                                                    title="Usable Credits"
                                                    content={formatPrice({
                                                        price: buyCapability.grantBalance,
                                                        withUS: true,
                                                        decimals: true,
                                                    })}
                                                    disable
                                                />
                                                <PanelMintInfo
                                                    title="Usable Balance"
                                                    content={formatPrice({
                                                        price: buyCapability.nonGrantBalance,
                                                        withUS: true,
                                                        decimals: true,
                                                    })}
                                                    disable
                                                />
                                                <PanelMintInfo
                                                    title="Transaction Balance"
                                                    content={formatPrice({
                                                        price: buyCapability.transactionBalance,
                                                        withUS: true,
                                                        decimals: true,
                                                    })}
                                                    disable
                                                />
                                            </Box>
                                        </Box>
                                    ) : (
                                        <PanelMintInfo title="Price" content={contentMessage()} />
                                    )}

                                    <Button
                                        variant="contained"
                                        disabled={
                                            !available ||
                                            !address ||
                                            walletCredits < credits ||
                                            buyCapability.transactionBalance > 0
                                        }
                                        onClick={handleMintNFT}
                                        sx={{
                                            backgroundColor: '#FF0066',
                                            color: '#ffff',
                                            '&:hover': {
                                                backgroundColor: '#FF0066',
                                            },
                                            borderRadius: 0,
                                            marginTop: 1,
                                        }}
                                    >
                                        License artwork {warningMessage()}
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Modal>
            </Box>

            <ModalMinted open={stateModalMinted} handleClose={handleCloseModalMinted} link={link} />
        </Card>
    );
};

export default PanelMint;
