import { JsonRpcProvider, Contract, Wallet } from 'ethers';

import { WEB3_PRIVATE_KEY } from '@/constants/web3';
import { NODE_ENV } from '@/constants/api';
import schema from '../../services/web3/contracts.json';
import { useSelector } from '@/store/hooks';

const mapper = new Map();

export const useHasStakes = (vaultAddress: string | null) => {
    const web3NetworkRpc = useSelector((state) => state.redirects.data[NODE_ENV].vitruveo.web3_network_rpc);
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
