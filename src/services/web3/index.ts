import { JsonRpcProvider, Wallet } from 'ethers';
import schema from './contracts.json';
import { WEB3_NETWORK_TYPE, WEB3_PRIVATE_KEY } from '@/constants/web3';
import axios from 'axios';
import { REDIRECTS_JSON } from '@/constants/vitruveo';
import { NODE_ENV } from '@/constants/api';

export const isTestNet = WEB3_NETWORK_TYPE === 'testnet';
export const network = isTestNet ? 'testnet' : 'mainnet';

let web3_netowrk_rpc = '';
const fetchData = async () => {
    const rowData = await axios.get(REDIRECTS_JSON);
    return rowData.data[NODE_ENV].vitruveo.web3_network_rpc;
};
fetchData().then((data) => {
    web3_netowrk_rpc = data;
});
export const provider = new JsonRpcProvider(web3_netowrk_rpc);

type MainnetKeys = keyof (typeof schema)['mainnet'];
type TestnetKeys = keyof (typeof schema)['testnet'];

export const getContractAddress = (name: MainnetKeys | TestnetKeys) => schema[network][name];
export const signer = new Wallet(WEB3_PRIVATE_KEY, provider);
