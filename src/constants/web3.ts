import { NODE_ENV } from './api';

export const WEB3_NETWORK_TYPE = process.env.NEXT_PUBLIC_WEB3_NETWORK_TYPE || 'testnet';
export const WEB3_NETWORK_RPC_ADDRESS =
    process.env.NEXT_PUBLIC_WEB3_NETWORK_RPC_ADDRESS || 'https://test-rpc.vitruveo.xyz';
export const WAGMI_APP_NAME = process.env.NEXT_WAGMI_APP_NAME || 'vitruveo.store';
export const WAGMI_PROJECT_ID = process.env.NEXT_WAGMI_PROJECT_ID || 'da75a31aef43de8f3667b0b4b435c6fd';
export const EXPLORER_URL =
    NODE_ENV === 'production' ? 'https://explorer.vitruveo.xyz' : 'https://test-explorer.vitruveo.xyz';
