import { useAccount } from 'wagmi';
import { useSelector } from '@/store/hooks';
import { formatDate } from '@/utils/assets';
import { Box, Button, Card, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconDownload } from '@tabler/icons-react';
import ConnectWallet from '../../ConnectWallet';

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
    downloadMedia: () => void;
    mintAdress?: string;
}

export default function Activity({ listing, downloadMedia, mintAdress }: ActivityProps) {
    const theme = useTheme();
    const isLogged = useSelector((state) => state.creator.token !== '');
    const loggedWallets = useSelector((state) => state.creator.wallets);
    const isMintAddressInLoggedWallets = loggedWallets.some((item) => item.address === mintAdress);

    const { isConnected, address } = useAccount();
    const isMintAddessEqualConnectedAddress = isConnected && address?.toLowerCase() === mintAdress?.toLowerCase();

    const formattedDate = (date: string | Date) => {
        const parsedDate = new Date(date);
        const day = parsedDate.getUTCDate();
        const month = parsedDate.getUTCMonth();
        const year = parsedDate.getUTCFullYear();
        return formatDate({ day, month, year });
    };

    const downloadable = (title: string) => {
        return isLogged && title === 'Licensed' && (isMintAddressInLoggedWallets || isMintAddessEqualConnectedAddress);
    };

    const generateGridColumns = (title: string, date?: string | Date) => {
        if (!date) return '1fr 1fr 1fr';
        if (downloadable(title)) return '1.4fr 1fr 1fr 0.9fr 0.9fr';
        return '1.3fr 1fr 1fr 0.8fr';
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
                                            onClick={downloadMedia}
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
        </div>
    );
}
