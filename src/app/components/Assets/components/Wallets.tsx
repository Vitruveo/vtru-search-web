import validateCryptoAddress from '@/utils/adressValidate';
import { Box, Typography } from '@mui/material';
import { IconWallet, IconWalletOff } from '@tabler/icons-react';
import { IconTrash } from '@tabler/icons-react';

interface Props {
    wallets: string[];
    onRemove(value: string): void;
}

export function Wallets({ wallets = [], onRemove }: Props) {
    return wallets.map((wallet, index) => {
        return (
            <Box mt={1} key={index} display="flex" alignItems="center" justifyContent="space-between">
                <Box display={'flex'} alignItems={'center'} gap={0.4}>
                    {validateCryptoAddress(wallet) ? (
                        <>
                            <IconWallet size={18} />
                            <Typography variant="inherit">
                                {wallet.slice(0, 6)}...{wallet.slice(-6)}
                            </Typography>
                        </>
                    ) : (
                        <>
                            <IconWalletOff color="red" size={18} />
                            <Typography variant="inherit" color="red">
                                {wallet.length > 10 ? `${wallet.slice(0, 10)}...` : wallet}
                            </Typography>
                        </>
                    )}
                </Box>
                <IconTrash cursor="pointer" color="red" width={20} onClick={() => onRemove(wallet)} />
            </Box>
        );
    });
}
