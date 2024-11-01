import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    IconButton,
    Modal,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from '@mui/material';
import { IconX } from '@tabler/icons-react';
import ConnectWallet from '../ConnectWallet';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    data: {
        balance: number;
    };
}

const BuyVUSDModal = ({ isOpen, onClose, data }: Props) => {
    const { balance } = data;

    const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value && parseInt(value) < 1) {
            event.target.value = '1';
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box
                sx={{
                    position: 'relative',
                    bgcolor: '#6C3BAF',
                    opacity: 0.9,
                    p: 4,
                    width: '100vw',
                    height: '100vh',
                }}
            >
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 80,
                        top: 15,
                        color: 'white',
                        zIndex: 1,
                    }}
                >
                    <IconX />
                </IconButton>
                <Box display={'flex'} justifyContent={'space-between'} paddingInline={14}>
                    <Typography variant="h5">Balance: {balance}</Typography>
                    <Typography variant="h5" fontWeight={'900'}>
                        Buy VUSD
                    </Typography>
                    <ConnectWallet />
                </Box>
                <Box display={'flex'} alignItems={'center'} gap={1} justifyContent={'center'}>
                    <Typography variant="h5">Buy </Typography>
                    <TextField type="number" inputProps={{ min: 1 }} onChange={handleChangeQuantity} />
                    <Typography variant="h5">VUSD </Typography>
                </Box>
                <Box display={'flex'} justifyContent={'center'}>
                    <FormControl>
                        <RadioGroup>
                            <FormControlLabel value="USDC" control={<Radio />} label="USDC" />
                            <FormControlLabel value="VTRU" control={<Radio />} label="VTRU" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box display={'flex'} justifyContent={'center'}>
                    <Button variant="contained" color="primary">
                        BUY
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default BuyVUSDModal;
