import { Box, Button, IconButton, Modal, Theme, Typography, useMediaQuery } from '@mui/material';
import { formatPrice } from '@/utils/assets';
import { LoadingAvailableLincenses } from '../LoadingAvailableLicenses';
import Licenses from '../Licenses';
import PanelMintInfo from '../PanelMintInfo';
import Fees from '../Fees';
import TotalPrice from '../TotalPrice';
import { PanelMintProps } from './component';
import ConnectWallet from '@/app/components/ConnectWallet';
import { IconX } from '@tabler/icons-react';
import { MediaRenderStore } from '../MediaRenderStore';
import { User } from '../User';

interface LicenseModalPropsType extends PanelMintProps {}

const LicenseModal = ({ image, creatorAvatar, creatorName, data, actions }: LicenseModalPropsType) => {
    const {
        stateModalLicense,
        address,
        notListed,
        asset,
        assetTitle,
        blocked,
        walletCredits,
        credits,
        loadingBuy,
        loading,
        license,
        isConnected,
        available,
        chain,
        platformFee,
        feesCurator,
        buyCapability,
        totalFee,
    } = data;

    const isMobile = useMediaQuery('(max-width: 900px)');
    const smUp = useMediaQuery((them: Theme) => them.breakpoints.up('sm'));

    const { state, message } = loading;
    const { handleMintNFT, handleCloseModalLicense } = actions;

    const formattedPrice = formatPrice({ price: credits, withUS: true, decimals: true });

    const warningMessage = () => {
        if (!isConnected) return '(Connect wallet)';
        if (notListed) return '(Not listed)';
        if (!chain) return '(Change network to Vitruveo)';
        if (blocked) return '(Not available)';
        if (walletCredits < credits || !walletCredits) return '(Insufficient funds)';
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

    const isSquare = asset.formats?.original?.definition === 'square';
    const isPortrait = asset.formats?.original?.definition === 'portrait';
    const mediaWidth = isMobile ? '100%' : isPortrait ? 360 : isSquare ? 400 : 500;
    const mediaHeight = isPortrait ? 500 : isSquare ? 400 : 365;

    return (
        <Modal open={stateModalLicense} sx={{ zIndex: 9999 }} onClose={handleCloseModalLicense}>
            <Box
                sx={{
                    position: 'relative',
                    bgcolor: '#6C3BAF',
                    opacity: 1,
                    p: 4,
                    height: '100%',
                }}
            >
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    flexDirection={smUp ? 'row' : 'column-reverse'}
                    gap={3}
                    alignItems={'center'}
                >
                    <Typography variant="h1" fontWeight={'900'} sx={{ fontSize: '3rem' }}>
                        Digital Collectible License
                    </Typography>
                    <Box display={'flex'} gap={2}>
                        <ConnectWallet size={'large'} rounded />
                        <IconButton aria-label="close" onClick={handleCloseModalLicense} sx={{ color: 'white' }}>
                            <IconX size={'3rem'} />
                        </IconButton>
                    </Box>
                </Box>
                {isConnected ? (
                    <Box>
                        <Box display="flex" alignItems="center" gap={4} marginTop={5}>
                            <MediaRenderStore media={image} width={mediaWidth} height={mediaHeight} alt="original" />
                            <Box>
                                <Box
                                    position="relative"
                                    minWidth={600}
                                    marginTop={0.3}
                                    height={365}
                                    width={isMobile ? '100%' : 700}
                                    bgcolor="#9BA2A9"
                                    padding={3}
                                    borderRadius={0}
                                >
                                    {state ? (
                                        <Box minHeight={319}>
                                            <LoadingAvailableLincenses message={message} />
                                        </Box>
                                    ) : (
                                        <Box flexDirection="column" display="flex" gap={2}>
                                            <Licenses title="License type" license={license} />
                                            {isConnected && available && chain ? (
                                                <Box display={'flex'} flexDirection={'column'} gap={4}>
                                                    <Box display={'flex'} flexDirection={'column'} gap={2}>
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
                                                    <Box display={'flex'} flexDirection={'column'} gap={2}>
                                                        <PanelMintInfo
                                                            title="Usable Credits"
                                                            color="white"
                                                            content={formatPrice({
                                                                price: buyCapability?.grantBalance,
                                                                withUS: true,
                                                                decimals: true,
                                                            })}
                                                            disable
                                                        />
                                                        <PanelMintInfo
                                                            title="Usable Balance"
                                                            color="white"
                                                            content={formatPrice({
                                                                price: buyCapability?.nonGrantBalance,
                                                                withUS: true,
                                                                decimals: true,
                                                            })}
                                                            disable
                                                        />
                                                        <PanelMintInfo
                                                            title="Transaction Balance"
                                                            color="white"
                                                            content={formatPrice({
                                                                price: buyCapability?.transactionBalance,
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
                                        </Box>
                                    )}
                                    <Button
                                        size="large"
                                        variant="contained"
                                        disabled={
                                            !walletCredits ||
                                            !available ||
                                            !address ||
                                            walletCredits < credits ||
                                            buyCapability.transactionBalance > 0
                                        }
                                        onClick={handleMintNFT}
                                        sx={{
                                            left: 0,
                                            top: 400,
                                            position: 'absolute',
                                            bottom: 16,
                                            fontSize: 22,
                                            width: 300,
                                            height: 60,
                                            lineHeight: '2',
                                            borderRadius: 2,
                                        }}
                                    >
                                        Buy {warningMessage()}
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                        <Box marginTop={12} display="flex" flexDirection="column" gap={1}>
                            <Typography variant="h1" sx={{ color: '#ffff' }}>
                                {assetTitle}
                            </Typography>
                            <User creator={creatorAvatar} creatorName={creatorName} asset={asset} />
                        </Box>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            height: '85vh',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="h3" fontWeight={'900'}>
                            Connect your crypto wallet for licensing options.
                        </Typography>
                    </Box>
                )}
            </Box>
        </Modal>
    );
};

export default LicenseModal;
