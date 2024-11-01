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
