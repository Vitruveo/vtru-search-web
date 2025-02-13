import { Stores } from '@/features/stores/types';
import type { Account, Chain, Client, Transport } from 'viem';

export interface GetPlatformFeeBasisPoints {
    client: Client<Transport, Chain, Account>;
}

export interface GetLicenseInformationParams {
    assetKey: string;
    client: Client<Transport, Chain, Account>;
}

export interface IssueLicenseUsingCreditsParams {
    assetKey: string;
    client: Client<Transport, Chain, Account>;
    stackId: string | null;
    curatorFee: number;
    currentStore?: Stores;
    assetCreatedBy: string | null;
}

export interface GetAvailableCreditsParams {
    wallet: string;
    client: Client<Transport, Chain, Account>;
}

export interface GetBuyerBalancesInCentsParams {
    wallet: string;
    client: Client<Transport, Chain, Account>;
}

export interface GetBuyCapabilityInCents {
    wallet: string;
    vault: string;
    price: number;
    fee: number;
    curatorFee: number;
    client: Client<Transport, Chain, Account>;
}

export interface GetVtruConversion {
    client: Client<Transport, Chain, Account>;
    vusdAmount: number;
}

export interface GetUsdcConversion {
    client: Client<Transport, Chain, Account>;
    usdcAmount: number;
}

export interface GetBalanceVUSD {
    client: Client<Transport, Chain, Account>;
}

export interface GetBalanceUSDC {
    client: Client<Transport, Chain, Account>;
    chainName: string;
}

export interface BuyVUSDWithVTRU {
    client: Client<Transport, Chain, Account>;
    vusdAmount: number;
    vtruConverted: number;
}

export interface BuyVUSDWithUSDC {
    client: Client<Transport, Chain, Account>;
    usdcAmount: number;
    chainName: string;
}
