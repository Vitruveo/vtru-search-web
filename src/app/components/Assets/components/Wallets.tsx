import { Box, Typography } from '@mui/material';
import { IconTrash } from '@tabler/icons-react';

interface Props {
    wallets: string[];
    onRemove(value: string): void;
}

export function Wallets({ wallets = [], onRemove }: Props) {
    return wallets.map((wallet, index) => {
        return (
            <Box mt={1} key={index} display="flex" alignItems="center" justifyContent="space-between">
                <Box width="1rem" height="1rem" borderRadius="50%">
                    <Typography variant="inherit">{wallet}</Typography>
                </Box>
                <IconTrash cursor="pointer" color="red" width={20} onClick={() => onRemove(wallet)} />
            </Box>
        );
    });
}
