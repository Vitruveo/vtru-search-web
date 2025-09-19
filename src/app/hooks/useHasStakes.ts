import { JsonRpcProvider, Contract, Wallet } from 'ethers';

import { WEB3_PRIVATE_KEY } from '@/constants/web3';
import { NODE_ENV } from '@/constants/api';
import { REDIRECTS_JSON } from '@/constants/vitruveo';
import schema from '../../services/web3/contracts.json';
import axios from 'axios';

let web3_network_rpc_adress = '';
const fetchData = async () => {
    const rowData = await axios.get(REDIRECTS_JSON);
    return rowData.data[NODE_ENV].vitruveo.web3_network_rpc;
};
fetchData().then((address) => {
    web3_network_rpc_adress = address;
});

const provider = new JsonRpcProvider(web3_network_rpc_adress);
const signer = new Wallet(WEB3_PRIVATE_KEY, provider);

const getCreatorVaultByAddress = (vaultAddress: string) => new Contract(vaultAddress, schema.abi.CreatorVault, signer);

const mapper = new Map();

export const useHasStakes = (vaultAddress: string | null) => {
    if (!vaultAddress) return false;

    if (mapper.has(vaultAddress)) {
        return mapper.get(vaultAddress);
    }

    const creatorVault = getCreatorVaultByAddress(vaultAddress);

    return false;

    // return creatorVault
    //     .hasStakes()
    //     .then((result) => {
    //         mapper.set(vaultAddress, result);
    //         return result;
    //     })
    //     .catch((error) => {
    //         return false;
    //     });
};
