import { WEB3_NETWORK_TYPE } from '@/constants/web3';
import { BrowserProvider, Contract, JsonRpcSigner, parseUnits, formatEther } from 'ethers';
import type { Account, Chain, Client, Transport } from 'viem';
import schema from './contracts.json';
import { BuyVUSDWithVTRU, GetBalanceVUSD, GetVtruConversion } from './types';

const isTestNet = WEB3_NETWORK_TYPE === 'testnet';
const network = isTestNet ? 'testnet' : 'mainnet';

type MainnetKeys = keyof (typeof schema)['mainnet'];
type TestnetKeys = keyof (typeof schema)['testnet'];

const getContractAddress = (name: MainnetKeys | TestnetKeys) => schema[network][name];

const clientToSigner = (client: Client<Transport, Chain, Account>) => {
    if (!client) throw new Error('Client not found');

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

export const getVtruConversion = async ({ client, vusdAmount }: GetVtruConversion): Promise<number> => {
    try {
        const signer = clientToSigner(client);
        const VUSD = new Contract(getContractAddress('VUSD'), schema.abi.VUSD, signer);

        const vusdAmountInBaseUnits = vusdAmount * 10 ** 6;
        const result = await VUSD.getVtruConversion(vusdAmountInBaseUnits);

        const resultInVtru = Number(result) / 10 ** 18;
        return Math.ceil(resultInVtru);
    } catch (error) {
        console.log('error getVtruConversion', error);

        return 0;
    }
};

export const getBalanceVUSD = async ({ client }: GetBalanceVUSD): Promise<number> => {
    try {
        const signer = clientToSigner(client);
        const VUSD = new Contract(getContractAddress('VUSD'), schema.abi.VUSD, signer);

        const result = await VUSD.balanceOf(signer.address);

        return Math.round(Number(result) / 10 ** 6);
    } catch (error) {
        console.log('error getBalanceVUSD', error);

        return 0;
    }
};

export const buyVUSDWithVTRU = async ({ client, vusdAmount, vtruConverted }: BuyVUSDWithVTRU) => {
    try {
        const signer = clientToSigner(client);
        const VUSD = new Contract(getContractAddress('VUSD'), schema.abi.VUSD, signer);

        const vusdAmountInBaseUnits = vusdAmount * 10 ** 6;
        const vtruConvertedInBaseUnits = parseUnits(String(vtruConverted), 18);

        return VUSD.mintWithVtru(signer.address, vusdAmountInBaseUnits, { value: vtruConvertedInBaseUnits });
    } catch (error) {
        console.error('error buyVUSDWithVTRU', error);
    }
};
