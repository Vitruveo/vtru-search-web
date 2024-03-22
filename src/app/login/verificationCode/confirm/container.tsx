'use client';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

import { useDispatch, useSelector } from '@/store/hooks';
import { userLoginThunk, userOTPConfirmThunk } from '@/features/user/thunks';
import { connectWebSocketThunk, loginWebSocketThunk } from '@/features/ws/slice';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';

import ConfirmView from './view';
import { otpSchemaValidation } from './formSchema';
import { codesVtruApi } from '@/services/codes';

export default function ConfirmContainer() {
    const [toastr, setToastr] = useState<CustomizedSnackbarState>({ type: 'success', open: false, message: '' });

    const dispatch = useDispatch();

    const login = useSelector((state) => state.user.login);

    const router = useRouter();

    const { handleSubmit, handleChange, values, errors, submitForm, validateForm, setFieldValue, setFieldError } =
        useFormik({
            initialValues: {
                code: '',
                disableSubmitButton: false,
            },
            validateOnChange: false,
            validationSchema: otpSchemaValidation,
            onSubmit: async (formValues) => {
                try {
                    await validateForm();
                    setFieldValue('disableSubmitButton', true);

                    const resOTPConfirm = await dispatch(
                        userOTPConfirmThunk({ code: formValues.code, email: login?.email })
                    );

                    if (codesVtruApi.success.login.includes(resOTPConfirm.code)) {
                        await dispatch(connectWebSocketThunk());
                        await dispatch(loginWebSocketThunk());
                        setToastr({ open: true, type: 'success', message: 'OTP confirmed!' });
                        router.push('/home');
                        return;
                    } else {
                        setFieldValue('disableSubmitButton', false);
                        setToastr({ open: true, type: 'error', message: 'Login failed: invalid code' });
                    }
                } catch (error) {
                    setFieldValue('disableSubmitButton', false);
                    setToastr({ open: true, type: 'error', message: 'Login failed: invalid code' });
                }
            },
        });

    const handleCustomChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e);

        if (e.target.value.length === 6) {
            await validateForm();
            submitForm();
        }
    };

    const handleResendCode = async () => {
        const resUserLogin = await dispatch(userLoginThunk({ email: login?.email }));
        if (codesVtruApi.success.login.includes(resUserLogin.code)) {
            setToastr({ open: true, type: 'success', message: 'Code sent to your email!' });
        } else setToastr({ open: true, type: 'error', message: 'Something went wrong! Try again later.' });
    };

    return (
        <>
            <ConfirmView
                values={values}
                errors={errors}
                setFieldError={setFieldError}
                setFieldValue={setFieldValue}
                handleResendCode={handleResendCode}
                handleChange={handleCustomChange}
                handleSubmit={handleSubmit}
            />
            <CustomizedSnackbar
                type={toastr.type}
                open={toastr.open}
                message={toastr.message}
                setOpentate={setToastr}
            />
        </>
    );
}
