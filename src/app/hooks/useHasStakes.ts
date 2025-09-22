import { useEffect, useState } from 'react';
import axios from 'axios';
import { JsonRpcProvider, Contract, Wallet } from 'ethers';

import { WEB3_PRIVATE_KEY } from '@/constants/web3';
import { NODE_ENV } from '@/constants/api';
import { REDIRECTS_JSON } from '@/constants/vitruveo';
import schema from '../../services/web3/contracts.json';

const mapper = new Map();

export const useHasStakes = (vaultAddress: string | null) => {
    const [web3NetworkRpc, setWeb3NetworkRpc] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const rowData = await axios.get(REDIRECTS_JSON);
            setWeb3NetworkRpc(rowData.data[NODE_ENV].vitruveo.web3_network_rpc);
        };
        fetchData();
    }, []);

    if (!vaultAddress) return false;

    if (mapper.has(vaultAddress)) {
        return mapper.get(vaultAddress);
    }

    const provider = new JsonRpcProvider(web3NetworkRpc);
    const signer = new Wallet(WEB3_PRIVATE_KEY, provider);
    const getCreatorVaultByAddress = (value: string) => new Contract(value, schema.abi.CreatorVault, signer);

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
