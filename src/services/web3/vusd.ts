import { WEB3_NETWORK_TYPE } from '@/constants/web3';
import { BrowserProvider, Contract, JsonRpcSigner, parseUnits, formatEther, parseEther } from 'ethers';
import type { Account, Chain, Client, Transport } from 'viem';
import schema from './contracts.json';
import { BuyVUSDWithUSDC, BuyVUSDWithVTRU, GetBalanceUSDC, GetBalanceVUSD, GetVtruConversion } from './types';

const isTestNet = WEB3_NETWORK_TYPE === 'testnet';
const network = isTestNet ? 'testnet' : 'mainnet';

type MainnetKeys = keyof (typeof schema)['mainnet'];
type TestnetKeys = keyof (typeof schema)['testnet'];

const contracts = {
    Vitruveo: {
        veo: '0x4D5B24179c656A88087eF4369887fD58AB5e8EF3',
        usdc: '0xbCfB3FCa16b12C7756CD6C24f1cC0AC0E38569CF',
        decimals: 6,
        delay: 20_000,
    },
    Ethereum: {
        veo: '0x3153F488233132c429175b5FD8199eb775b6C6Ff',
        usdc: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        decimals: 6,
        delay: 20_000,
    },
    'BNB Smart Chain': {
        veo: '0x6793c3172DacaE034B3e84909E200DB285225AB3',
        usdc: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        decimals: 18,
        delay: 20_000,
    },
    Polygon: {
        veo: '0x6793c3172DacaE034B3e84909E200DB285225AB3',
        usdc: '0x3c499c542cef5e3811e1192ce70d8cc03d5c3359',
        decimals: 6,
        delay: 20_000,
    },
    Base: {
        veo: '0x6793c3172DacaE034B3e84909E200DB285225AB3',
        usdc: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
        decimals: 6,
        delay: 20_000,
    },
    Avalanche: {
        veo: '0x30d414eab3575ff4bF1Ea2c63401BA1D22De231f',
        usdc: '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e',
        decimals: 6,
        delay: 20_000,
    },
};

const erc20abi = [
    {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [
            {
                name: '',
                type: 'string',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                name: '_spender',
                type: 'address',
            },
            {
                name: '_value',
                type: 'uint256',
            },
        ],
        name: 'approve',
        outputs: [
            {
                name: '',
                type: 'bool',
            },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [
            {
                name: '',
                type: 'uint256',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                name: '_from',
                type: 'address',
            },
            {
                name: '_to',
                type: 'address',
            },
            {
                name: '_value',
                type: 'uint256',
            },
        ],
        name: 'transferFrom',
        outputs: [
            {
                name: '',
                type: 'bool',
            },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [
            {
                name: '',
                type: 'uint8',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            {
                name: '_owner',
                type: 'address',
            },
        ],
        name: 'balanceOf',
        outputs: [
            {
                name: 'balance',
                type: 'uint256',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [
            {
                name: '',
                type: 'string',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                name: '_to',
                type: 'address',
            },
            {
                name: '_value',
                type: 'uint256',
            },
        ],
        name: 'transfer',
        outputs: [
            {
                name: '',
                type: 'bool',
            },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            {
                name: '_owner',
                type: 'address',
            },
            {
                name: '_spender',
                type: 'address',
            },
        ],
        name: 'allowance',
        outputs: [
            {
                name: '',
                type: 'uint256',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        payable: true,
        stateMutability: 'payable',
        type: 'fallback',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: 'owner',
                type: 'address',
            },
            {
                indexed: true,
                name: 'spender',
                type: 'address',
            },
            {
                indexed: false,
                name: 'value',
                type: 'uint256',
            },
        ],
        name: 'Approval',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: 'from',
                type: 'address',
            },
            {
                indexed: true,
                name: 'to',
                type: 'address',
            },
            {
                indexed: false,
                name: 'value',
                type: 'uint256',
            },
        ],
        name: 'Transfer',
        type: 'event',
    },
];

const getContractAddress = (name: MainnetKeys | TestnetKeys) => schema[network][name];
const getContractByNetwork = (name: keyof typeof contracts) => contracts[name];

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

export const getBalanceUSDC = async ({ client, chainName }: GetBalanceUSDC): Promise<number> => {
    try {
        const signer = clientToSigner(client);

        const contract = getContractByNetwork(chainName as keyof typeof contracts);
        const USDC = new Contract(contract.usdc, erc20abi, signer);

        const result = await USDC.balanceOf(signer.address);

        return Number(result) / 10 ** contract.decimals;
    } catch (error) {
        console.log('error getBalanceUSDC', error);

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

export const buyVUSDWithUSDC = async ({ client, chainName, usdcAmount }: BuyVUSDWithUSDC) => {
    const signer = clientToSigner(client);

    const contract = getContractByNetwork(chainName as keyof typeof contracts);
    const USDC = new Contract(contract.usdc, erc20abi, signer);

    const allowance = await USDC.allowance(signer.address, contract.veo);

    const amountTarget = usdcAmount * 10 ** contract.decimals;

    if (Number(allowance) < amountTarget) {
        await USDC.approve(contract.veo, parseUnits(String(usdcAmount), contract.decimals));

        await new Promise((resolve) => setTimeout(resolve, contract.delay));
    }

    const VEO = new Contract(contract.veo, schema.abi.VEO, signer);

    if (chainName.toLocaleLowerCase().includes('vitruveo')) {
        await VEO.mintPublicVUSD(usdcAmount, {
            gasLimit: 100_000,
        });
    } else {
        await VEO.mintBridgeVUSD(1490, signer.address, usdcAmount);
    }
};
