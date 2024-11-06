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
    Theme,
    Typography,
    useMediaQuery,
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
            value: string;
        };
        balanceVUSD: {
            symbol: string;
            value: number;
        };
        currentChain?: string;
        isConnected: boolean;
        selectedValue: string;
        usdcConverted: number;
        vtruConverted: number;
        insufficientBalance: boolean;
        disabled: boolean;
        loading: boolean;
    };
    actions: {
        handleChangeQuantity: (event: React.ChangeEvent<HTMLInputElement>) => void;
        handleBlurQuantity: (event: React.FocusEvent<HTMLInputElement>) => void;
        handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        handleBuy: () => void;
    };
}

const BuyVUSDModal = ({ isOpen, onClose, data, actions }: Props) => {
    const {
        balance,
        balanceVUSD,
        currentChain,
        isConnected,
        selectedValue,
        usdcConverted,
        vtruConverted,
        insufficientBalance,
        disabled,
        loading,
    } = data;
    const { handleChangeQuantity, handleBlurQuantity, handleRadioChange, handleBuy } = actions;

    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
    const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

    const buttonMessage = () => {
        if (!isConnected) return 'Connect Wallet';
        if (insufficientBalance) return 'Insufficient Balance';
        if (loading) return 'Loading...';
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
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    flexDirection={smUp ? 'row' : 'column-reverse'}
                    gap={3}
                    alignItems={'center'}
                    paddingInline={lgUp ? 14 : 0}
                >
                    <Box>
                        <Typography variant="h2">
                            Balance: {isConnected ? `${balance.value} ${balance.symbol}` : 'Connect Wallet'}
                        </Typography>
                        <Typography variant="h2">
                            Balance: {isConnected ? `${balanceVUSD.value} ${balanceVUSD.symbol}` : 'Connect Wallet'}
                        </Typography>
                    </Box>
                    <Typography variant="h1" fontWeight={'900'} sx={{ fontSize: '3rem' }}>
                        Buy VUSD
                    </Typography>
                    <Box display={'flex'}>
                        <ConnectWallet size={'large'} rounded />
                        <IconButton aria-label="close" onClick={onClose} sx={{ color: 'white' }}>
                            <IconX size={'2rem'} />
                        </IconButton>
                    </Box>
                </Box>

                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} height={'90%'}>
                    <Box
                        display={'flex'}
                        flexDirection={smUp ? 'row' : 'column'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        gap={3}
                    >
                        <Typography variant="h1" width={'100%'} fontSize={'4rem'} textAlign={smUp ? 'end' : 'center'}>
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
                                width: lgUp ? '70%' : '100%',
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
                        <Typography variant="h1" width={'100%'} fontSize={'4rem'} textAlign={smUp ? 'start' : 'center'}>
                            VUSD
                        </Typography>
                    </Box>

                    <Box display={'flex'} marginBlock={6} width={'100%'} justifyContent={'center'}>
                        <FormControl sx={{ width: lgUp ? '25.5%' : mdUp ? '52%' : '100%' }}>
                            <RadioGroup sx={{ gap: 6 }} value={selectedValue} onChange={handleRadioChange}>
                                <Box display={'flex'} justifyContent={'space-between'}>
                                    <FormControlLabel
                                        value="USDC"
                                        control={<Radio disabled sx={{ '& .MuiSvgIcon-root': { fontSize: '2rem' } }} />}
                                        label="USDC"
                                        sx={{
                                            width: smUp ? '52%' : '100%',
                                            margin: currentChain?.toLowerCase().includes('vitruveo') ? '' : 0,
                                            '& .MuiFormControlLabel-label': { fontSize: '2rem' },
                                        }}
                                    />
                                    <Box bgcolor={'#1a1a1a'} width={'100%'}>
                                        <Typography variant="h1" fontSize={'2rem'} paddingBlock={1} paddingInline={2}>
                                            {usdcConverted}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box display={'flex'} justifyContent={'space-between'}>
                                    <FormControlLabel
                                        value="VTRU"
                                        control={<Radio checked sx={{ '& .MuiSvgIcon-root': { fontSize: '2rem' } }} />}
                                        label="VTRU"
                                        sx={{
                                            width: smUp ? '52%' : '100%',
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
                            sx={{ fontSize: '2rem', width: lgUp ? '25.5%' : mdUp ? '52%' : '100%' }}
                            disabled={disabled}
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
