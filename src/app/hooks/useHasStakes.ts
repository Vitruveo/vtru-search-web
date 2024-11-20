import { JsonRpcProvider, Contract, Wallet } from 'ethers';

import { WEB3_NETWORK_RPC_ADDRESS, WEB3_PRIVATE_KEY } from '@/constants/web3';
import schema from '../../services/web3/contracts.json';

const provider = new JsonRpcProvider(WEB3_NETWORK_RPC_ADDRESS);
const signer = new Wallet(WEB3_PRIVATE_KEY, provider);

const getCreatorVaultByAddress = (vaultAddress: string) => new Contract(vaultAddress, schema.abi.CreatorVault, signer);

const mapper = new Map();

export const useHasStakes = (vaultAddress: string | null) => {
    if (!vaultAddress) return false;

    if (mapper.has(vaultAddress)) {
        return mapper.get(vaultAddress);
    }

    const creatorVault = getCreatorVaultByAddress(vaultAddress);

    return creatorVault
        .hasStakes()
        .then((result) => {
            mapper.set(vaultAddress, result);
            return result;
        })
        .catch((error) => {
            return false;
        });
};
