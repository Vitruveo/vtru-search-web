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
import { defaultVusdAmount } from './modalHOC';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    data: {
        balance: {
            symbol?: string;
            value: number;
        };
        currentChain?: string;
        isConnected: boolean;
        selectedValue: string;
        usdcConverted: number;
        vtruConverted: number;
    };
    actions: {
        handleChangeQuantity: (event: React.ChangeEvent<HTMLInputElement>) => void;
        handleBlurQuantity: (event: React.FocusEvent<HTMLInputElement>) => void;
        handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        handleBuy: () => void;
    };
}

const BuyVUSDModal = ({ isOpen, onClose, data, actions }: Props) => {
    const { balance, currentChain, isConnected, selectedValue, usdcConverted, vtruConverted } = data;
    const { handleChangeQuantity, handleBlurQuantity, handleRadioChange, handleBuy } = actions;

    const buttonMessage = () => {
        if (!isConnected) return 'Connect Wallet';
        if (balance.value < (selectedValue === 'VTRU' ? vtruConverted : usdcConverted)) return 'Insufficient Balance';
        return 'BUY';
    };

    return (
        <Modal open={isOpen} onClose={onClose} sx={{ zIndex: 9999 }}>
            <Box
                sx={{
                    position: 'relative',
                    bgcolor: '#6C3BAF',
                    opacity: 1,
                    p: 4,
                    height: '100%',
                }}
            >
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 50,
                        top: 40,
                        color: 'white',
                        zIndex: 1,
                    }}
                >
                    <IconX size={'2rem'} />
                </IconButton>

                <Box display={'flex'} justifyContent={'space-between'} paddingInline={14}>
                    <Typography variant="h2">
                        Balance: {isConnected ? `${balance.value} ${balance.symbol}` : 'Connect Wallet'}
                    </Typography>
                    <Typography variant="h1" fontWeight={'900'} sx={{ fontSize: '3rem' }}>
                        Buy VUSD
                    </Typography>
                    <ConnectWallet size="large" rounded />
                </Box>

                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} height={'90%'}>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={3}>
                        <Typography variant="h1" width={'8%'} fontSize={'4rem'} textAlign={'end'}>
                            BUY
                        </Typography>
                        <TextField
                            type="number"
                            inputProps={{ min: 1 }}
                            defaultValue={defaultVusdAmount}
                            onChange={handleChangeQuantity}
                            onBlur={handleBlurQuantity}
                            autoComplete="off"
                            sx={{
                                width: '24%',
                                '& .MuiInputBase-input': {
                                    textAlign: 'end',
                                    fontSize: '3rem',
                                    fontWeight: 'bold',
                                    paddingInline: 4,
                                    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                                        display: 'none',
                                    },
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'white',
                                    },
                                },
                            }}
                        />
                        <Typography variant="h1" width={'8%'} fontSize={'4rem'}>
                            VUSD
                        </Typography>
                    </Box>

                    <Box display={'flex'} marginBlock={6} width={'100%'} justifyContent={'center'}>
                        <FormControl sx={{ width: '24%' }}>
                            <RadioGroup sx={{ gap: 6 }} value={selectedValue} onChange={handleRadioChange}>
                                <Box display={'flex'} justifyContent={'space-between'}>
                                    <FormControlLabel
                                        value="USDC"
                                        control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: '2rem' } }} />}
                                        label="USDC"
                                        sx={{
                                            width: '52%',
                                            margin: currentChain?.toLowerCase().includes('vitruveo') ? '' : 0,
                                            '& .MuiFormControlLabel-label': { fontSize: '2rem' },
                                            '& .MuiRadio-root': {
                                                display: currentChain?.toLowerCase().includes('vitruveo')
                                                    ? 'block'
                                                    : 'none',
                                            },
                                        }}
                                    />
                                    <Box bgcolor={'#1a1a1a'} width={'100%'}>
                                        <Typography variant="h1" fontSize={'2rem'} paddingBlock={1} paddingInline={2}>
                                            {usdcConverted}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    display={currentChain?.toLowerCase()?.includes('vitruveo') ? 'flex' : 'none'}
                                    justifyContent={'space-between'}
                                >
                                    <FormControlLabel
                                        value="VTRU"
                                        control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: '2rem' } }} />}
                                        label="VTRU"
                                        sx={{
                                            width: '52%',
                                            '& .MuiFormControlLabel-label': { fontSize: '2rem' },
                                        }}
                                    />
                                    <Box bgcolor={'#1a1a1a'} width={'100%'}>
                                        <Typography variant="h1" fontSize={'2rem'} paddingBlock={1} paddingInline={2}>
                                            {vtruConverted}
                                        </Typography>
                                    </Box>
                                </Box>
                            </RadioGroup>
                        </FormControl>
                    </Box>

                    <Box display={'flex'} justifyContent={'center'}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ fontSize: '2rem', width: '24%' }}
                            disabled={balance.value < (selectedValue === 'VTRU' ? vtruConverted : usdcConverted)}
                            onClick={handleBuy}
                        >
                            {buttonMessage()}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default BuyVUSDModal;
