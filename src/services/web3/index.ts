import { JsonRpcProvider, Wallet } from 'ethers';
import schema from './contracts.json';
import { WEB3_NETWORK_TYPE, WEB3_PRIVATE_KEY } from '@/constants/web3';
import axios from 'axios';
import { REDIRECTS_JSON } from '@/constants/vitruveo';
import { NODE_ENV } from '@/constants/api';

export const isTestNet = WEB3_NETWORK_TYPE === 'testnet';
export const network = isTestNet ? 'testnet' : 'mainnet';

let web3_netowrk_rpc = '';
let _provider: JsonRpcProvider | null = null;
let _signer: Wallet | null = null;

const fetchData = async () => {
    const rowData = await axios.get(REDIRECTS_JSON);
    return rowData.data[NODE_ENV].vitruveo.web3_network_rpc;
};

const initPromise = fetchData().then((data) => {
    web3_netowrk_rpc = data;
    _provider = new JsonRpcProvider(web3_netowrk_rpc);
    _signer = new Wallet(WEB3_PRIVATE_KEY, _provider);
});

const getProvider = async () => {
    await initPromise;
    return _provider!;
};

const getSigner = async () => {
    await initPromise;
    return _signer!;
};

type MainnetKeys = keyof (typeof schema)['mainnet'];
type TestnetKeys = keyof (typeof schema)['testnet'];

export const getContractAddress = (name: MainnetKeys | TestnetKeys) => schema[network][name];
export { getProvider as provider, getSigner as signer };
