import { JsonRpcProvider, Wallet } from 'ethers';
import schema from './contracts.json';
import { WEB3_NETWORK_RPC_ADDRESS, WEB3_NETWORK_TYPE, WEB3_PRIVATE_KEY } from '@/constants/web3';

console.log(WEB3_NETWORK_RPC_ADDRESS);

export const isTestNet = false;
export const network = isTestNet ? 'testnet' : 'mainnet';

export const provider = new JsonRpcProvider(WEB3_NETWORK_RPC_ADDRESS);

type MainnetKeys = keyof (typeof schema)['mainnet'];
type TestnetKeys = keyof (typeof schema)['testnet'];

export const getContractAddress = (name: MainnetKeys | TestnetKeys) => schema[network][name];
export const signer = new Wallet(WEB3_PRIVATE_KEY, provider);
