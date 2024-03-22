import { Box, Typography, Button, Stack, Grid } from '@mui/material';

import CustomTextField from '@/app/home/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '@/app/home/components/forms/theme-elements/CustomFormLabel';

import { OTPConfirmViewProps } from './types';

export default function ConfirmView({
    values,
    errors,
    handleSubmit,
    handleChange,
    handleResendCode,
}: OTPConfirmViewProps) {
    return (
        <Grid height="70vh" alignContent="center" display="grid" minWidth={{ xl: '400px', lg: '400px', sm: '500px' }}>
            <Typography fontWeight="700" variant="h3" mb={1}>
                Verification Code
            </Typography>
            Please enter your code to verify your email.
            <form onSubmit={handleSubmit}>
                <Stack my={1}>
                    <Box>
                        <CustomFormLabel htmlFor="code">Code</CustomFormLabel>
                        <CustomTextField
                            id="code"
                            disabled={values.disableSubmitButton}
                            inputProps={{ maxLength: 6 }}
                            error={!!errors.code}
                            value={values.code}
                            variant="outlined"
                            onChange={handleChange}
                            helperText={errors.code}
                            fullWidth
                        />
                    </Box>
                </Stack>
                <Box my={2} mt={3}>
                    <Button
                        color="primary"
                        disabled={values.disableSubmitButton}
                        variant="contained"
                        size="large"
                        fullWidth
                        href=""
                        type="submit"
                    >
                        {values.disableSubmitButton ? 'Verifying…' : 'Verify'}
                    </Button>
                </Box>
            </form>
            <Stack alignItems="baseline" direction="row" spacing={1} mt={2}>
                <Typography color="textSecondary" variant="h6" fontWeight="500">
                    Did not receive your code?
                </Typography>
                <Button type="reset" disabled={values.disableSubmitButton} onClick={handleResendCode}>
                    Resend code
                </Button>
            </Stack>
        </Grid>
    );
}
