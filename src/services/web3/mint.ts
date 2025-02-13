/* eslint-disable no-console */
import { Contract, BrowserProvider, JsonRpcSigner } from 'ethers';
import type { Account, Chain, Client, Transport } from 'viem';
import { BigNumber } from '@ethersproject/bignumber';

import type {
    GetAvailableCreditsParams,
    GetBuyCapabilityInCents,
    GetBuyerBalancesInCentsParams,
    GetLicenseInformationParams,
    GetPlatformFeeBasisPoints,
    IssueLicenseUsingCreditsParams,
} from './types';
import schema from './contracts.json';
import { getPriceWithMarkup } from '@/utils/assets';

import { API3_BASE_URL } from '@/constants/api';
import { getContractAddress, network, provider } from '.';

const clientToSigner = (client: Client<Transport, Chain, Account>) => {
    const { account, chain, transport } = client;
    const networkClient = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    };
    const providerClient = new BrowserProvider(transport, networkClient);
    const signer = new JsonRpcSigner(providerClient, account.address);
    return signer;
};

export const getBuyCapabilityInCents = ({ wallet, vault, price, fee, client, curatorFee }: GetBuyCapabilityInCents) => {
    const signer = clientToSigner(client);

    const licenseRegistry = new Contract(getContractAddress('LicenseRegistry'), schema.abi.LicenseRegistry, signer);

    return licenseRegistry
        .getBuyCapabilityInCents(
            wallet,
            [
                vault,
                getContractAddress('VIBE'),
                '0x0000000000000000000000000000000000000001',
                '0x0000000000000000000000000000000000000000',
                '0x0000000000000000000000000000000000000000',
            ],
            [price, fee, curatorFee, 0, 0]
        )
        .then((proxyResult) => {
            const result = proxyResult.map((value: any) => BigNumber.from(value).toNumber());
            // console.log('result getBuyCapabilityInCents', result);

            const [totalAmount, grantBalance, nonGrantBalance, transactionBalance] = result;
            return {
                totalAmount: totalAmount / 100,
                grantBalance: grantBalance / 100,
                nonGrantBalance: nonGrantBalance / 100,
                transactionBalance: transactionBalance / 100,
            };
        })
        .catch((error) => {
            console.log('error getBuyCapabilityInCents', error);
            return {
                totalAmount: 0,
                grantBalance: 0,
                nonGrantBalance: 0,
                transactionBalance: 0,
            };
        });
};

export const getBuyerBalancesInCents = ({ wallet, client }: GetBuyerBalancesInCentsParams) => {
    const signer = clientToSigner(client);

    const licenseRegistry = new Contract(getContractAddress('LicenseRegistry'), schema.abi.LicenseRegistry, signer);

    return licenseRegistry
        .getBuyerBalancesInCents(wallet)
        .then((proxyResult) => {
            const result = proxyResult.map((value: any) => BigNumber.from(value).toNumber());

            const [grantBalance, nonGrantBalance] = result;
            return {
                grantBalance: grantBalance / 100,
                nonGrantBalance: nonGrantBalance / 100,
            };
        })
        .catch((error) => {
            console.log('error getBuyerBalancesInCents', error);
            return {
                grantBalance: 0,
                nonGrantBalance: 0,
            };
        });
};

export const getPlatformFeeBasisPoints = ({ client }: GetPlatformFeeBasisPoints) => {
    const signer = clientToSigner(client);

    const licenseRegistry = new Contract(getContractAddress('LicenseRegistry'), schema.abi.LicenseRegistry, signer);

    return licenseRegistry
        .getPlatformFeeBasisPoints()
        .then((result) => BigNumber.from(result).toNumber())
        .catch(() => 0);
};

export const getAssetLicenses = ({ assetKey, client }: GetLicenseInformationParams) => {
    const signer = clientToSigner(client);

    const licenseRegistry = new Contract(getContractAddress('LicenseRegistry'), schema.abi.LicenseRegistry, signer);

    return licenseRegistry
        .getAvailableLicense(assetKey, 1, 1)
        .then((result) => {
            if (Array.isArray(result) && result.length >= 8) {
                const amount = BigNumber.from(result[7]).toNumber();
                const credits = BigNumber.from(result[3]).toNumber();

                return {
                    available: amount > 0,
                    credits: credits,
                };
            }

            return {
                available: false,
                credits: 0,
            };
        })
        .catch(() => {
            return {
                available: false,
                credits: 0,
            };
        });
};

export const getAvailableCredits = ({ wallet, client }: GetAvailableCreditsParams) => {
    const signer = clientToSigner(client);

    const licenseRegistry = new Contract(getContractAddress('LicenseRegistry'), schema.abi.LicenseRegistry, signer);

    return licenseRegistry
        .getAvailableCredits(wallet)
        .then((result) => {
            if (Array.isArray(result) && result.length >= 2) {
                const [_, creditsCents] = result;

                const creditsCentsConverted = BigNumber.from(creditsCents).toNumber();

                return {
                    usdCredits: creditsCentsConverted / 100,
                };
            }

            return {
                usdCredits: 0,
            };
        })
        .catch(() => {
            return {
                usdCredits: 0,
            };
        });
};

export const issueLicenseUsingCredits = async ({
    assetKey,
    client,
    stackId,
    curatorFee,
    currentStore,
    assetCreatedBy,
}: IssueLicenseUsingCreditsParams) => {
    const signer = clientToSigner(client);

    const contractAddress = schema[network].LicenseRegistry;

    const domain = {
        name: 'Vitruveo Store',
        version: '1',
        chainId: Number((await provider.getNetwork()).chainId),
    };

    const types = {
        Transaction: [
            { name: 'name', type: 'string' },
            { name: 'action', type: 'string' },
            { name: 'method', type: 'string' },
            { name: 'assetKey', type: 'string' },
            { name: 'price', type: 'string' },
            { name: 'licenseTypeId', type: 'uint' },
            { name: 'quantity', type: 'uint' },
            { name: 'contract', type: 'address' },
            { name: 'timestamp', type: 'uint' },
        ],
    };

    const licenseRegistry = new Contract(getContractAddress('LicenseRegistry'), schema.abi.LicenseRegistry, signer);

    const result = await licenseRegistry.getAvailableLicense(assetKey, 1, 1);
    const licenseCost = BigNumber.from(result[3]).toNumber();

    const platformFeeBasisPoints = await licenseRegistry.getPlatformFeeBasisPoints();
    const platformFeeBasisPointsFormatted = BigNumber.from(platformFeeBasisPoints).toNumber();

    const platformFeeValue = (licenseCost * platformFeeBasisPointsFormatted) / 10_000;
    const totalPlatformFee =
        getPriceWithMarkup({ assetPrice: licenseCost, stores: currentStore, assetCreatedBy }) + platformFeeValue;

    const tx = {
        name: 'License Registry',
        action: 'Use Credits to mint asset',
        method: 'issueLicenseUsingCreditsStudio',
        assetKey: assetKey,
        price: `US$ ${totalPlatformFee / 100 + curatorFee}`,
        licenseTypeId: 1,
        quantity: 1,
        contract: contractAddress,
        timestamp: Math.floor(Date.now() / 1000),
    };

    // Sign the message
    const signedMessage = await signer.signTypedData(domain, types, tx);

    // Send the signed message to backend
    const response = await fetch(`${API3_BASE_URL}/mint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            buyerSignerAddress: signer.address,
            domain,
            types,
            tx,
            signedMessage,
            stackId,
            customStoreId: currentStore?._id,
        }),
    });

    const responseData = await response.json();
    if (response.ok) {
        return responseData;
    } else {
        throw new Error(responseData.error);
    }
};
