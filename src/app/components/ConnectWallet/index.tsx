import { Box, Button, Typography } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useDisconnect } from 'wagmi';
import '@rainbow-me/rainbowkit/styles.css';
import Image from 'next/image';

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
}

export default function ConnectWallet({ size = 'regular', rounded = false }: Props) {
    const buttonStyle = {
        background: 'linear-gradient(to right, #FF0066, #9966FF)',
        color: '#fff',
        '&:hover': {
            background: 'linear-gradient(to right, #cc0052, #7a52cc)',
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
                                <Button sx={buttonStyle} onClick={handleDisconnect}>
                                    Disconnect
                                </Button>
                                <Box onClick={openChainModal}>
                                    {chain?.hasIcon && chain?.iconUrl && (
                                        <Image
                                            src={chain.iconUrl}
                                            alt={chain.name || 'Chain icon'}
                                            width={40}
                                            height={40}
                                            layout={'fixed'}
                                        />
                                    )}
                                </Box>
                            </Box>
                        )}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
}
