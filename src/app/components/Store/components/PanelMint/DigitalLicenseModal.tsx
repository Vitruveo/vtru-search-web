import { Box, Button, Grid, IconButton, Modal, Theme, Typography, useMediaQuery } from '@mui/material';
import { formatPrice } from '@/utils/assets';
import { LoadingAvailableLincenses } from '../LoadingAvailableLicenses';
import Licenses from '../Licenses';
import PanelMintInfo from '../PanelMintInfo';
import Fees from '../Fees';
import { PanelMintProps } from './component';
import ConnectWallet from '@/app/components/ConnectWallet';
import { IconX } from '@tabler/icons-react';
import { MediaRenderStore } from '../MediaRenderStore';
import { User } from '../User';
import Image from 'next/image';
import { Breadcrumb } from '@/app/components/Breadcrumb';

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
    const smUp = useMediaQuery((mediaQuery: Theme) => mediaQuery.breakpoints.down('sm'));

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

    return (
        <Modal open={stateModalLicense} onClose={handleCloseModalLicense}>
            <Box
                sx={{
                    position: 'relative',
                    bgcolor: '#171C23',
                    opacity: 1,
                    p: smUp ? 2 : 4,
                    height: '100%',
                }}
            >
                <Box display="flex" justifyContent="space-between">
                    <Image src={'/images/logos/XIBIT-logo_dark.png'} alt="logo" height={40} width={120} priority />
                    <Box display="flex" alignItems="center" gap={2}>
                        <ConnectWallet size={'regular'} rounded showChain={false} />
                        <IconButton aria-label="close" onClick={handleCloseModalLicense} sx={{ color: 'white' }}>
                            <IconX />
                        </IconButton>
                    </Box>
                </Box>

                <Typography mt={4} variant="h1" fontSize={['1.5rem', '1.75rem', '2rem', '2.5rem']}>
                    Digital Collectible License
                </Typography>

                <Box mt={4}>
                    <Breadcrumb items={[{ label: 'Home' }, { label: 'Digital Collectible License' }]} params={{}} />
                </Box>
                <Box overflow={isConnected ? 'auto' : 'hidden'} maxHeight="90vh" pb={12}>
                    {isConnected ? (
                        <Box mt={4}>
                            <Grid container>
                                <Grid item xs={12} sm={12} lg={6}>
                                    <Box display="flex" alignItems="center" justifyContent="center">
                                        <MediaRenderStore
                                            removeMargin
                                            media={image}
                                            width={600}
                                            height={600}
                                            alt="preview"
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={12} lg={6}>
                                    <Typography fontWeight="600" variant="h2">
                                        {assetTitle}
                                    </Typography>
                                    <Box
                                        position="relative"
                                        width="100%"
                                        maxWidth={700}
                                        bgcolor="rgba(0,0,0,0.6)"
                                        padding={3}
                                        mt={2}
                                    >
                                        {state ? (
                                            <Box>
                                                <LoadingAvailableLincenses message={message} />
                                            </Box>
                                        ) : (
                                            <Box flexDirection="column" display="flex">
                                                {isConnected && available && chain ? (
                                                    <Box display={'flex'} flexDirection={'column'} gap={1}>
                                                        <Box display={'flex'} flexDirection={'column'} gap={1}>
                                                            <PanelMintInfo title="Price:" content={contentMessage()} />
                                                            <Fees
                                                                title="Fees:"
                                                                value={platformFee.value + feesCurator.value}
                                                                fees={{
                                                                    platform: platformFee,
                                                                    curator: feesCurator,
                                                                }}
                                                            />

                                                            <PanelMintInfo
                                                                title="Total:"
                                                                content={formatPrice({
                                                                    price: totalFee,
                                                                    withUS: true,
                                                                    decimals: true,
                                                                })}
                                                            />
                                                        </Box>
                                                        <Box display={'flex'} flexDirection={'column'} gap={2}>
                                                            <PanelMintInfo
                                                                title="Available Balance:"
                                                                color="white"
                                                                content={formatPrice({
                                                                    price: walletCredits,
                                                                    withUS: true,
                                                                    decimals: true,
                                                                })}
                                                                disable
                                                                hasHidden
                                                            />
                                                        </Box>
                                                        <Box mt={3} mb={1}>
                                                            <Licenses title="License type:" license={license} />
                                                        </Box>
                                                    </Box>
                                                ) : (
                                                    <PanelMintInfo title="Price" content={contentMessage()} />
                                                )}
                                            </Box>
                                        )}
                                    </Box>
                                    <Grid container spacing={2} mt={3}>
                                        <Grid item xs={12} lg={4} md={6}>
                                            <Button
                                                size="large"
                                                variant="contained"
                                                disabled={
                                                    !walletCredits ||
                                                    !available ||
                                                    !address ||
                                                    walletCredits < credits ||
                                                    walletCredits < buyCapability.totalAmount ||
                                                    loading.state
                                                }
                                                onClick={handleMintNFT}
                                                sx={{
                                                    fontSize: 17,
                                                    width: smUp ? '100%' : 300,
                                                }}
                                            >
                                                Buy Now {warningMessage()}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Box marginTop={3} marginBottom={3} display="flex" flexDirection="column" gap={2}>
                                        <User creator={creatorAvatar} creatorName={creatorName} asset={asset} />
                                    </Box>
                                </Grid>
                            </Grid>
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
                            <Typography variant="h3" fontWeight={'900'} sx={{ fontSize: smUp ? '1rem' : '1.5rem' }}>
                                Connect your crypto wallet for licensing options.
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Modal>
    );
};

export default LicenseModal;
