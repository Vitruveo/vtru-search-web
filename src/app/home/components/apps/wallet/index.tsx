import '@rainbow-me/rainbowkit/styles.css';
import React from 'react';
import { RainbowKitProvider, getDefaultWallets, connectorsForWallets, Locale } from '@rainbow-me/rainbowkit';
import { argentWallet, trustWallet, ledgerWallet } from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, zora, goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [
        mainnet,
        polygon,
        optimism,
        arbitrum,
        base,
        zora,
        ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
    ],
    [alchemyProvider({ apiKey: 'QVu1QOsFMNO67ap6rhDGnkvSi-3pvYXF' }), publicProvider()]
);

const projectId = 'e35af8e9cf766036d44374c2bd11ebbe';

const { wallets } = getDefaultWallets({
    appName: 'RainbowKit demo',
    projectId,
    chains,
});

const demoAppInfo = {
    appName: 'Rainbowkit Demo',
};

const connectors = connectorsForWallets([
    ...wallets,
    {
        groupName: 'Other',
        wallets: [
            argentWallet({ projectId, chains }),
            trustWallet({ projectId, chains }),
            ledgerWallet({ projectId, chains }),
        ],
    },
]);

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});

interface Props {
    children: React.ReactNode;
}

export function WalletProvider({ children }: Props) {
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider appInfo={demoAppInfo} chains={chains} locale="en">
                {children}
            </RainbowKitProvider>
        </WagmiConfig>
    );
}
