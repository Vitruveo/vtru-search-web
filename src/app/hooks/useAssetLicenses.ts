import { useEffect, useState } from 'react';
import { Contract, Wallet } from 'ethers';

import schema from '../../services/web3/contracts.json';
import { getContractAddress, signer } from '@/services/web3';
import { BigNumber } from '@ethersproject/bignumber';

export const useAssetLicenses = (assetKey: string | null) => {
    const [signerInstance, setSignerInstance] = useState<Wallet>();
    const [licenses, setLicenses] = useState<{ available: boolean; credits: number } | null>(null);
    const licenseRegistry = new Contract(
        getContractAddress('LicenseRegistry'),
        schema.abi.LicenseRegistry,
        signerInstance
    );

    useEffect(() => {
        const fetchSigner = async () => {
            const wallet = await signer();
            setSignerInstance(wallet);
        };
        if (assetKey) {
            licenseRegistry
                .getAvailableLicense(assetKey, 1, 1)
                .then((result) => {
                    if (Array.isArray(result) && result.length >= 8) {
                        const amount = BigNumber.from(result[7]).toNumber();
                        const credits = BigNumber.from(result[3]).toNumber();

                        setLicenses({
                            available: amount > 0,
                            credits: credits,
                        });
                    } else {
                        setLicenses({
                            available: false,
                            credits: 0,
                        });
                    }
                })
                .catch(() => {
                    setLicenses({
                        available: false,
                        credits: 0,
                    });
                });
        }
        fetchSigner();
    }, [assetKey, signerInstance]);

    return licenses;
};
