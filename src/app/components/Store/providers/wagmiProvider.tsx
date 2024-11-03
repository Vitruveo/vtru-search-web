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
import { WAGMI_APP_NAME, WAGMI_PROJECT_ID } from '@/constants/web3';
import { NODE_ENV } from '@/constants/api';

const vitruveoMainnet = {
    id: 1490,
    name: 'Vitruveo Mainnet',
    network: 'vitruveo',
    iconUrl: '/v-icon.png',
    iconBackground: '#000',
    nativeCurrency: {
        decimals: 18,
        name: 'Vitruveo',
        symbol: 'VTRU',
    },
    rpcUrls: {
        public: { http: ['https://rpc.vitruveo.xyz/'] },
        default: { http: ['https://rpc.vitruveo.xyz/'] },
    },
    blockExplorers: {
        default: { name: 'VitruveoScan', url: 'https://explorer.vitruveo.xyz' },
        etherscan: { name: 'VitruveoScan', url: 'https://explorer.vitruveo.xyz' },
    },
    testnet: false,
};

const vitruveoTestnet = {
    id: 14333,
    name: 'Vitruveo Testnet',
    network: 'vitruveo-testnet',
    iconUrl: '/v-icon.png',
    iconBackground: '#000',
    nativeCurrency: {
        decimals: 18,
        name: 'Vitruveo Testnet',
        symbol: 'tVTRU',
    },
    rpcUrls: {
        public: { http: ['https://test-rpc.vitruveo.xyz/'] },
        default: { http: ['https://test-rpc.vitruveo.xyz/'] },
    },
    blockExplorers: {
        default: { name: 'VitruveoScan', url: 'https://test-explorer.vitruveo.xyz' },
        etherscan: { name: 'VitruveoScan', url: 'https://test-explorer.vitruveo.xyz' },
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
