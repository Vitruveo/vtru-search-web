'use client';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    FormControl,
    Grid,
    useMediaQuery,
    Theme,
    Divider,
} from '@mui/material';

import CustomCheckbox from '@/app/home/components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '@/app/home/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '@/app/home/components/forms/theme-elements/CustomFormLabel';

import { LoginViewProps } from './types';
import VtruTitle from '@/app/home/components/vtruTItle';
import WalletLogin from './wallet';
import { WalletProvider } from '@/app/home/components/apps/wallet';

function LoginView({
    values,
    errors,
    disabled,
    handleChange,
    setFieldValue,
    handleSubmit,
    validateForm,
}: LoginViewProps) {
    const lgUp = useMediaQuery((th: Theme) => th.breakpoints.up('lg'));

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value = event.target.value.toLowerCase();
        handleChange(event);
    };

    const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await setFieldValue('loginType', 'email');
        handleSubmit();
    };

    return (
        <Grid height="70vh" alignContent="center" display="grid" minWidth={{ xl: '400px', lg: '400px', sm: '500px' }}>
            <Box display="flex" alignItems="baseline">
                <Typography
                    whiteSpace="nowrap"
                    alignSelf="center"
                    fontWeight="700"
                    fontSize={lgUp ? '1.7rem' : '1.5rem'}
                >
                    Welcome to <VtruTitle vtruRem={lgUp ? '1.7rem' : '1.5rem'} studioRem={lgUp ? '1.7rem' : '1.5rem'} />
                </Typography>
            </Box>

            <form onSubmit={handleEmailSubmit}>
                <Stack>
                    <Box>
                        <FormControl fullWidth error={!!errors.email}>
                            <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                            <CustomTextField
                                id="email"
                                disabled={disabled}
                                error={!!errors.email}
                                value={values.email}
                                variant="outlined"
                                onChange={handleEmailChange}
                                helperText={errors.email}
                                fullWidth
                            />
                        </FormControl>
                    </Box>

                    <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                        <FormGroup>
                            <FormControlLabel
                                control={<CustomCheckbox disabled={disabled} defaultChecked />}
                                label="Remember this Device"
                            />
                        </FormGroup>
                    </Stack>
                </Stack>
                <Box>
                    <Button
                        color="primary"
                        disabled={disabled}
                        variant="contained"
                        size="large"
                        fullWidth
                        type="submit"
                    >
                        {disabled && values.loginType === 'email' ? 'Processing...' : 'Sign In / Register'}
                    </Button>
                </Box>

                <Box marginBottom={5} marginTop={5}>
                    <Divider>or sign in / register with</Divider>
                </Box>

                <WalletProvider>
                    <WalletLogin
                        values={values}
                        disabled={disabled}
                        setFieldValue={setFieldValue}
                        handleSubmit={handleSubmit}
                    />
                </WalletProvider>
            </form>
        </Grid>
    );
}

export default LoginView;
