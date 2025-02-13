import { useEffect, useState } from 'react';
import { Contract } from 'ethers';

import schema from '../../services/web3/contracts.json';
import { getContractAddress, signer } from '@/services/web3';
import { BigNumber } from '@ethersproject/bignumber';

const licenseRegistry = new Contract(getContractAddress('LicenseRegistry'), schema.abi.LicenseRegistry, signer);

export const useAssetLicenses = (assetKey: string | null) => {
    const [licenses, setLicenses] = useState<{ available: boolean; credits: number } | null>(null);

    useEffect(() => {
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
    }, [assetKey]);

    return licenses;
};
