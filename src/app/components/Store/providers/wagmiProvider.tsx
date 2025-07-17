import { WagmiProvider } from 'wagmi';
import {
    mainnet as ethereum,
    sepolia as etheriumTestnet,
    polygon,
    polygonZkEvmTestnet as polygonTestnet,
    base,
    baseGoerli as baseTestnet,
    bsc,
    bscTestnet,
} from 'wagmi/chains';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EXPLORER_URL, WAGMI_APP_NAME, WAGMI_PROJECT_ID, WEB3_NETWORK_RPC_ADDRESS } from '@/constants/web3';
import { NODE_ENV } from '@/constants/api';

export const vitruveoMainnet = {
    id: 1490,
    name: 'Vitruveo',
    network: 'vitruveo',
    iconUrl: '/images/icons/v-icon.png',
    iconBackground: '#000',
    nativeCurrency: {
        decimals: 18,
        name: 'Vitruveo',
        symbol: 'VTRU',
    },
    rpcUrls: {
        public: { http: [WEB3_NETWORK_RPC_ADDRESS] },
        default: { http: [WEB3_NETWORK_RPC_ADDRESS] },
    },
    blockExplorers: {
        default: { name: 'VitruveoScan', url: EXPLORER_URL },
        etherscan: { name: 'VitruveoScan', url: EXPLORER_URL },
    },
    testnet: false,
};

export const vitruveoTestnet = {
    id: 14333,
    name: 'Vitruveo Testnet',
    network: 'vitruveo-testnet',
    iconUrl: '/images/icons/v-icon.png',
    iconBackground: '#000',
    nativeCurrency: {
        decimals: 18,
        name: 'Vitruveo Testnet',
        symbol: 'tVTRU',
    },
    rpcUrls: {
        public: { http: [WEB3_NETWORK_RPC_ADDRESS] },
        default: { http: [WEB3_NETWORK_RPC_ADDRESS] },
    },
    blockExplorers: {
        default: { name: 'VitruveoScan', url: EXPLORER_URL },
        etherscan: { name: 'VitruveoScan', url: EXPLORER_URL },
    },
    testnet: true,
};

interface Web3WagmiProviderProps {
    children: React.ReactNode;
}

export default function Web3WagmiProvider({ children }: Web3WagmiProviderProps) {
    const config = getDefaultConfig({
        appName: WAGMI_APP_NAME,
        projectId: WAGMI_PROJECT_ID,
        chains:
            NODE_ENV == 'production'
                ? [vitruveoMainnet, ethereum, polygon, base, bsc]
                : [vitruveoTestnet, etheriumTestnet, polygonTestnet, baseTestnet, bscTestnet],
    });

    const queryClient = new QueryClient();

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>{children}</RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
