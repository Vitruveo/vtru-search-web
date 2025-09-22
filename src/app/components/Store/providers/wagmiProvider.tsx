import { WagmiProvider } from 'wagmi';
import axios from 'axios';
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
import { REDIRECTS_JSON } from '@/constants/vitruveo';

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
        public: { http: [''] },
        default: { http: [''] },
    },
    blockExplorers: {
        default: { name: 'VitruveoScan', url: '' },
        etherscan: { name: 'VitruveoScan', url: '' },
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
        public: { http: [''] },
        default: { http: [''] },
    },
    blockExplorers: {
        default: { name: 'VitruveoScan', url: '' },
        etherscan: { name: 'VitruveoScan', url: '' },
    },
    testnet: true,
};

interface Web3WagmiProviderProps {
    children: React.ReactNode;
}

const fetchRedirects = async () => {
    const rowData = await axios.get(REDIRECTS_JSON);
    return rowData.data;
};
fetchRedirects().then((data) => {
    const updateNetwork = (network: any, env: string) => {
        network.blockExplorers.default.url = data[env].vitruveo.explorer_url;
        network.blockExplorers.etherscan.url = data[env].vitruveo.explorer_url;
        network.rpcUrls.public.http[0] = data[env].vitruveo.web3_network_rpc;
        network.rpcUrls.default.http[0] = data[env].vitruveo.web3_network_rpc;
    };
    updateNetwork(vitruveoMainnet, 'production');
    updateNetwork(vitruveoTestnet, 'qa');
});

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
