import { useAccount } from 'wagmi';
import { useSelector } from '@/store/hooks';
import { formatDate } from '@/utils/assets';
import { Box, Button, Card, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

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
            text: string;
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
            <Card style={{ borderRadius: 0 }}>
                {listing.length > 0 ? (
                    listing
                        .filter((item) => item.date)
                        .map((item, index) => (
                            <Box key={index} display="grid" gridTemplateColumns="1fr 1fr 1fr">
                                <Typography
                                    variant="body1"
                                    fontWeight="bold"
                                    style={{ whiteSpace: 'nowrap', wordBreak: 'break-all' }}
                                >
                                    {item.title}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    style={{
                                        wordWrap: 'break-word',
                                    }}
                                >
                                    {formattedDate(item.date)}
                                </Typography>
                                <Box display="flex" gap={3}>
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
                                    {item.extra?.text && item.extra?.url && (
                                        <a
                                            href={item.extra.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{
                                                textDecoration: 'underline',
                                                color: theme.palette.primary.main,
                                            }}
                                        >
                                            {item.extra.text}
                                        </a>
                                    )}
                                </Box>
                            </Box>
                        ))
                ) : (
                    <></>
                )}
                {isLogged && (isMintAddressInLoggedWallets || isMintAddessEqualConnectedAddress) && (
                    <Button
                        variant="contained"
                        onClick={downloadMedia}
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: '#ffff',
                            '&:hover': {
                                backgroundColor: theme.palette.primary.main,
                            },
                            borderRadius: 0,
                        }}
                    >
                        Download original media
                    </Button>
                )}
            </Card>
        </div>
    );
}
