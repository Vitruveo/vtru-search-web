import { useState } from 'react';
import axios from 'axios';
import { useAccount } from 'wagmi';
import { useDispatch, useSelector } from '@/store/hooks';
import { actions } from '@/features/store';
import { formatDate } from '@/utils/assets';
import { Box, Button, Card, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconDownload } from '@tabler/icons-react';
import ConnectWallet from '../../ConnectWallet';
import ModalTermDownload from './ModalTermDownload';
import { ASSET_STORAGE_URL } from '@/constants/aws';

export interface ActivityProps {
    listing: {
        title: string;
        date: Date | string;
        link?: {
            url: string;
            text: string;
        };
        extra?: {
            url: string;
        };
    }[];
    mintAdress?: string;
}

export default function Activity({ listing, mintAdress }: ActivityProps) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.down('sm'));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { asset, loadingDigitalCollectibleDownload } = useSelector((state) => state.store);
    const loggedWallets = useSelector((state) => state.creator?.wallets || []);
    const isMintAddressInLoggedWallets = loggedWallets.some((item) => item.address === mintAdress);

    const { isConnected, address } = useAccount();
    const isMintAddressEqualConnectedAddress = isConnected && address?.toLowerCase() === mintAdress?.toLowerCase();

    const formattedDate = (date: string | Date) => {
        const parsedDate = new Date(date);
        const day = parsedDate.getUTCDate();
        const month = parsedDate.getUTCMonth();
        const year = parsedDate.getUTCFullYear();
        return formatDate({ day, month, year });
    };

    const downloadable = (title: string) => {
        return title === 'Licensed' && (isMintAddressInLoggedWallets || isMintAddressEqualConnectedAddress);
    };

    const generateGridColumns = (title: string, date?: string | Date) => {
        if (!date) return '1fr 1fr 1fr';
        if (smUp) return '0.8fr 1fr 1fr 0fr';
        if (downloadable(title)) return '1.4fr 1fr 1fr 0.9fr 0.9fr';
        return '1.3fr 1fr 1fr 0.8fr';
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleDownloadMedia = async () => {
        dispatch(actions.startLoadingDigitalCollectibleDownload());
        const url = `${ASSET_STORAGE_URL}/${asset.formats?.original?.path}`;
        const fileName = asset.assetMetadata?.context?.formData?.title || Date.now().toString();

        try {
            dispatch(
                actions.setDigitalCollectibleDownload({
                    assetId: asset._id,
                    digital: [
                        {
                            wallet: mintAdress || '',
                            isTermAccepted: true,
                            date: new Date().toISOString(),
                            licenseType: 'CC BY-NC-ND',
                        },
                    ],
                })
            );
            const response = await axios.get(url, { responseType: 'blob' });
            const blob = response.data;
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(link.href);
        } finally {
            handleModalClose();
            dispatch(actions.finishLoadingDigitalCollectibleDownload());
        }
    };

    return (
        <div style={{ marginTop: '1px' }}>
            <Typography
                variant="h6"
                style={{
                    backgroundColor: '#777777',
                    color: '#ffff',
                    textIndent: 10,
                    paddingTop: 15,
                    paddingLeft: 6,
                    height: 45,
                }}
            >
                Activity
            </Typography>
            <Card style={{ borderRadius: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {listing.length > 0 ? (
                    listing
                        .filter((item) => item.date)
                        .map((item, index) => (
                            <Box
                                key={index}
                                display="grid"
                                alignItems={'center'}
                                gridTemplateColumns={generateGridColumns(listing[0].title, listing[0].date)}
                            >
                                {item.extra?.url ? (
                                    <a
                                        href={item.extra.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                            textDecoration: 'underline',
                                            color: theme.palette.primary.main,
                                        }}
                                    >
                                        {item.title}
                                    </a>
                                ) : (
                                    <Typography
                                        variant="body1"
                                        fontWeight="bold"
                                        style={{ whiteSpace: 'nowrap', wordBreak: 'break-all' }}
                                        paddingRight={smUp ? 3.5 : 0}
                                    >
                                        {item.title}
                                    </Typography>
                                )}
                                <Typography
                                    variant="body1"
                                    style={{
                                        wordWrap: 'break-word',
                                    }}
                                >
                                    {formattedDate(item.date)}
                                </Typography>
                                {item.link?.text && item.link?.url && (
                                    <a
                                        href={item.link.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                            textDecoration: 'underline',
                                            color: theme.palette.primary.main,
                                        }}
                                    >
                                        {item.link.text}
                                    </a>
                                )}
                                {downloadable(item.title) && (
                                    <Tooltip
                                        title="Download Original"
                                        arrow
                                        componentsProps={{
                                            tooltip: {
                                                sx: { fontSize: '0.8rem' },
                                            },
                                        }}
                                    >
                                        <Button
                                            onClick={handleModalOpen}
                                            sx={{
                                                backgroundColor: theme.palette.primary.main,
                                                color: '#ffff',
                                                '&:hover': {
                                                    backgroundColor: theme.palette.primary.main,
                                                },
                                                borderRadius: 0,
                                                height: 25,
                                                width: 25,
                                            }}
                                        >
                                            <IconDownload size={18} />
                                        </Button>
                                    </Tooltip>
                                )}
                                {item.title === 'Licensed' && (
                                    <ConnectWallet showChain={false} size="small" showWallet={false} />
                                )}
                            </Box>
                        ))
                ) : (
                    <></>
                )}
            </Card>
            <ModalTermDownload
                isOpen={isModalOpen}
                onClose={handleModalClose}
                actions={{ downloadMedia: handleDownloadMedia }}
                data={{ loading: loadingDigitalCollectibleDownload }}
            />
        </div>
    );
}
