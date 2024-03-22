import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { ValidationError } from 'yup';

import Box from '@mui/material/Box';
import { Button, Divider, Stack, Typography } from '@mui/material';

import { WalletProvider } from '@/app/home/components/apps/wallet';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';
import { addCreatorEmailThunk, verifyCodeThunk } from '@/features/user/thunks';

import { AccountSettingsProps } from './types';

import { sendEmailThunk } from '@/features/user/thunks';
import { useDispatch } from '@/store/hooks';
import { checkCreatorEmailExist } from '@/features/user/requests';
import { codesVtruApi } from '@/services/codes';
import { AxiosError } from 'axios';
import { CreatorEmailExistApiRes } from '@/features/user/types';
import { validateEmailFormValue } from './helpers';

import CustomTextField, { CustomTextFieldYellow } from '../components/forms/theme-elements/CustomTextField';
import Wallet from './wallet';
import { useI18n } from '@/app/hooks/useI18n';

const AccountSettings = ({
    values,
    errors,
    handleChange,
    handleSubmit,
    setErrors,
    setFieldValue,
    setFieldError,
}: AccountSettingsProps) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [toastr, setToastr] = useState<CustomizedSnackbarState>({
        type: 'success',
        open: false,
        message: '',
    });

    const { language } = useI18n();

    const texts = {
        emailsTitle: language['studio.myProfile.form.emails.title'],
        deleteButton: language['studio.myProfile.form.delete.button'],
        verifyButton: language['studio.myProfile.form.verify.button'],
        addEmailsPlaceholder: language['studio.myProfile.form.addEmails.placeholder'],
        walletsTitle: language['studio.myProfile.form.wallets.title'],
        codePlaceholder: language['studio.myProfile.form.code.placeholder'],
        emailsExistError: language['studio.myProfile.form.emailsExists.error'],
        verificationCodeSuccess: language['studio.myProfile.verificationCodeSentMessageSuccess'],
        verificationCodeError: language['studio.myProfile.verificationCodeSentMessageError'],
        emailVerificationSuccess: language['studio.myProfile.emailVerificationMessageSuccess'],
        emailVerificationError: language['studio.myProfile.emailVerificationMessageError'],
    } as { [key: string]: string };

    const dispatch = useDispatch();

    const handleSendCodeEmail = useCallback(
        async (emailSend: string) => {
            const res = await dispatch(sendEmailThunk({ email: emailSend }));

            if (codesVtruApi.success.user.includes(res.code)) {
                setFieldValue(
                    'emails',
                    values.emails.map((item) => (item.email === emailSend ? { ...item, sentCode: true } : item))
                );
                setToastr({
                    open: true,
                    type: 'success',
                    message: texts.verificationCodeSuccess,
                });
            } else {
                setToastr({
                    open: true,
                    type: 'error',
                    message: texts.verificationCodeError,
                });
            }
        },
        [values.emails]
    );

    const handleVerifyCode =
        (emailVerify: string) => async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            try {
                if (e.target.value.length === 6) {
                    const res = await dispatch(verifyCodeThunk({ code: e.target.value, email: emailVerify }));
                    if (codesVtruApi.success.user.includes(res.code)) {
                        setFieldValue(
                            'emails',
                            values.emails.map((item) =>
                                item.email === emailVerify ? { ...item, checkedAt: new Date() } : item
                            )
                        );
                        setToastr({
                            open: true,
                            type: 'success',
                            message: texts.emailVerificationSuccess,
                        });
                    }
                }
            } catch (error) {
                setToastr({
                    open: true,
                    type: 'error',
                    message: texts.emailVerificationError,
                });
            }
        };

    const handleChangeEmailInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.toLowerCase();
        setEmail(e.target.value);
    }, []);

    const handleAddEmail = useCallback(async () => {
        if (values.emails.some((item) => item.email === email)) {
            setEmailError(texts.emailsExistError);
            return;
        }
        try {
            await validateEmailFormValue.validate({ email });
        } catch (error) {
            setEmailError((error as ValidationError).errors[0]);
            return;
        }
        try {
            await checkCreatorEmailExist({ email });
            setEmailError(texts.emailsExistError);
        } catch (error) {
            if (
                codesVtruApi.notfound.user.includes(
                    (error as AxiosError<CreatorEmailExistApiRes>).response?.data?.code as string
                )
            ) {
                await dispatch(addCreatorEmailThunk({ email }));
                setFieldValue('emails', [...values.emails, { email, checkedAt: null, sentCode: true }]);
                setEmail('');
                setEmailError('');
            }
        }
    }, [setFieldValue, values.emails, email]);

    const handleDeleteEmail = useCallback(
        (emailDelet: string) => {
            setFieldValue(
                `emails`,
                values.emails.filter((v) => v.email !== emailDelet)
            );
        },
        [setFieldValue, values.emails]
    );

    return (
        <Stack sx={{ width: '100%' }}>
            <Box display="flex" flexDirection="column" gap={1}>
                <Box maxWidth={450} display="flex" flexDirection="column" my={2}>
                    <Typography mb={2} variant="subtitle1" fontWeight={600} component="label">
                        {texts.emailsTitle}
                    </Typography>

                    {values.emails.slice().map((item, index) => (
                        <Box
                            key={item.email}
                            flexWrap="wrap"
                            display="flex"
                            alignItems={'center'}
                            justifyContent="space-between"
                            mb={2}
                            gap={1}
                        >
                            <Box display="flex" alignItems="center" width="100%">
                                <Box width="100%">
                                    <Typography
                                        color="GrayText"
                                        title={item.email}
                                        style={{
                                            maxWidth: '70%',
                                            minWidth: '200px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {item.email}
                                    </Typography>
                                </Box>

                                <Box>
                                    {(values.emails.filter((v) => v.checkedAt).length !== 1 || !item.checkedAt) && (
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            style={{ width: '122px', marginLeft: '10px' }}
                                            onClick={() => handleDeleteEmail(item.email)}
                                        >
                                            {texts.deleteButton}
                                        </Button>
                                    )}
                                </Box>
                            </Box>
                            {!item.checkedAt && (
                                <Box marginTop={1} width="100%" display="flex" alignItems="center">
                                    <CustomTextFieldYellow
                                        // style={{ marginLeft: '20px' }}
                                        fullWidth
                                        onChange={handleVerifyCode(item.email)}
                                        size="small"
                                        id="verificationCode"
                                        variant="outlined"
                                        placeholder={texts.codePlaceholder}
                                    />
                                    <Box>
                                        <Button
                                            color="warning"
                                            style={{ width: '122px', marginLeft: '10px' }}
                                            size="small"
                                            variant="contained"
                                            onClick={() => handleSendCodeEmail(item.email)}
                                        >
                                            Send new code
                                        </Button>
                                    </Box>
                                </Box>
                            )}
                            <Divider style={{ width: '100%' }} />
                        </Box>
                    ))}

                    <Box marginTop={1} width="100%" display="flex" alignItems="center">
                        <CustomTextField
                            type="email"
                            value={email}
                            onChange={handleChangeEmailInput}
                            size="small"
                            fullWidth
                            FormHelperTextProps={{
                                style: {
                                    position: 'absolute',
                                    bottom: '-22px',
                                    left: 0,
                                    fontSize: '0.75rem',
                                },
                            }}
                            variant="outlined"
                            placeholder={texts.addEmailsPlaceholder}
                            error={!!emailError}
                            helperText={emailError}
                        />
                        <Box>
                            <Button
                                style={{ marginLeft: '10px', width: '122px' }}
                                size="small"
                                variant="contained"
                                onClick={handleAddEmail}
                            >
                                {texts.verifyButton}
                            </Button>
                        </Box>
                    </Box>
                </Box>

                <Box my={1} display="flex" flexDirection="column">
                    <Typography mb={2} variant="subtitle1" fontWeight={600} component="label">
                        {texts.walletsTitle}
                    </Typography>

                    <WalletProvider>
                        <Wallet
                            values={values}
                            errors={errors}
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            setFieldValue={setFieldValue}
                            setErrors={setErrors}
                            setFieldError={setFieldError}
                        />
                    </WalletProvider>
                </Box>
            </Box>
            <CustomizedSnackbar
                type={toastr.type}
                open={toastr.open}
                message={toastr.message}
                setOpentate={setToastr}
            />
        </Stack>
    );
};

export default AccountSettings;
