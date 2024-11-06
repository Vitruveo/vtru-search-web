import { WEB3_NETWORK_TYPE } from '@/constants/web3';
import { BrowserProvider, Contract, JsonRpcSigner } from 'ethers';
import type { Account, Chain, Client, Transport } from 'viem';
import schema from './contracts.json';
import { BuyVUSDWithVTRU, GetVtruConversion } from './types';

const isTestNet = WEB3_NETWORK_TYPE === 'testnet';
const network = isTestNet ? 'testnet' : 'mainnet';

type MainnetKeys = keyof (typeof schema)['mainnet'];
type TestnetKeys = keyof (typeof schema)['testnet'];

const getContractAddress = (name: MainnetKeys | TestnetKeys) => schema[network][name];

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

export const getVtruConversion = ({ client, vusdAmount }: GetVtruConversion): Promise<number> => {
    const signer = clientToSigner(client);
    const VUSD = new Contract(getContractAddress('VUSD'), schema.abi.VUSD, signer);

    const vusdAmountInBaseUnits = vusdAmount * 10 ** 6;
    return VUSD.getVtruConversion(vusdAmountInBaseUnits)
        .then((result: bigint) => {
            const resultInVtru = Number(result) / 10 ** 18;
            return Math.ceil(resultInVtru);
        })
        .catch((error) => {
            console.error('error getVtruConversion', error);
            return 0;
        });
};

export const buyVUSDWithVTRU = ({ client, vusdAmount }: BuyVUSDWithVTRU) => {
    const signer = clientToSigner(client);
    const VUSD = new Contract(getContractAddress('VUSD'), schema.abi.VUSD, signer);

    const vusdAmountInBaseUnits = vusdAmount * 10 ** 6;
    return VUSD.mintWithVtru(signer.address, vusdAmountInBaseUnits).catch((error) => {
        console.error('error buyVUSDWithVTRU', error);
    });
};
