import React, { useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { LoginViewProps } from '../types';

export interface WalletLoginProps extends Pick<LoginViewProps, 'values' | 'setFieldValue' | 'handleSubmit'> {
    disabled: boolean;
}

const WalletLogin = ({ values, disabled, setFieldValue, handleSubmit }: WalletLoginProps) => {
    const [connectWallet, setConnectWallet] = useState(false);

    const { openConnectModal } = useConnectModal();
    const { isConnected, address } = useAccount();
    const { disconnectAsync } = useDisconnect();

    const handleAddWallet = async () => {
        if (isConnected) await disconnectAsync();
        setConnectWallet(true);
    };

    const handleSubmitWallet = async () => {
        if (address) {
            await setFieldValue('wallet', address);
            await setFieldValue('loginType', 'wallet');
        }
    };

    useEffect(() => {
        if (openConnectModal && connectWallet) {
            openConnectModal();
            setConnectWallet(false);
        }
        return () => {
            disconnectAsync();
        };
    }, [connectWallet, openConnectModal]);

    useEffect(() => {
        handleSubmitWallet();
    }, [address]);

    useEffect(() => {
        if (values.loginType === 'wallet') {
            handleSubmit();
            setFieldValue('loginType', 'email');
        }
    }, [values.loginType]);

    return (
        <>
            <Box>
                <Button
                    color="info"
                    onClick={handleAddWallet}
                    disabled={disabled}
                    variant="contained"
                    size="large"
                    fullWidth
                >
                    {disabled && values.loginType === 'wallet' ? 'Processing...' : 'Wallet'}
                </Button>
            </Box>
        </>
    );
};

export default WalletLogin;
