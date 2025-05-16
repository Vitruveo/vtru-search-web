import Image from 'next/image';
import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useDisconnect } from 'wagmi';
import '@rainbow-me/rainbowkit/styles.css';

const sizes = {
    regular: {
        fontSize: 'unset',
        width: 'unset',
        height: 'unset',
    },
    large: {
        fontSize: '1.5rem',
        width: 260,
        height: 60,
    },
};

interface Props {
    size?: 'regular' | 'large';
    rounded?: boolean;
    showChain?: boolean;
}

export default function ConnectWallet({ size = 'regular', rounded = false, showChain = true }: Props) {
    const theme = useTheme();

    const buttonStyle = {
        background: theme.palette.primary.main,
        color: '#fff',
        '&:hover': {
            background: theme.palette.primary.main,
        },
        lineHeight: '1.5',
        borderRadius: rounded ? 2 : 0,
        ...sizes[size],
    };

    const { disconnect } = useDisconnect();
    const handleDisconnect = () => disconnect();

    return (
        <ConnectButton.Custom>
            {({ account, chain, openChainModal, openConnectModal, mounted }) => {
                const ready = mounted;
                const connected = ready && account && chain;

                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            style: {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {chain?.unsupported ? (
                            <Button sx={buttonStyle} onClick={openChainModal}>
                                Wrong Network
                            </Button>
                        ) : !connected ? (
                            <Button sx={buttonStyle} onClick={openConnectModal}>
                                Connect Wallet
                            </Button>
                        ) : (
                            <Box display={'flex'} gap={2} alignItems={'center'}>
                                <Box onClick={openChainModal}>
                                    {showChain && chain?.hasIcon && chain?.iconUrl && (
                                        <Image
                                            src={chain.iconUrl}
                                            alt={chain.name || 'Chain icon'}
                                            width={40}
                                            height={40}
                                            layout={'fixed'}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    )}
                                </Box>
                                <Button sx={buttonStyle} onClick={handleDisconnect}>
                                    Disconnect
                                </Button>
                            </Box>
                        )}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
}
