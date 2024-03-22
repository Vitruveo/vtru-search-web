'use client';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { useDispatch } from '@/store/hooks';
import { userLoginThunk } from '@/features/user/thunks';

import LoginView from './view';
import { loginSchemaValidation } from './formSchema';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';
import { codesVtruApi } from '@/services/codes';
import { userActionsCreators } from '@/features/user/slice';
import { connectWebSocketThunk, loginWebSocketThunk } from '@/features/ws/thunks';

const LoginContainer = () => {
    const [disabled, setDiabled] = useState<boolean>(false);
    const [toastr, setToastr] = useState<CustomizedSnackbarState>({ type: 'success', open: false, message: '' });

    const router = useRouter();
    const dispatch = useDispatch();

    const { handleSubmit, handleChange, resetForm, setFieldValue, setFieldError, validateForm, values, errors } =
        useFormik({
            initialValues: {
                loginType: 'email',
                email: undefined,
                wallet: undefined,
            },
            validateOnChange: false,
            validationSchema: loginSchemaValidation,
            onSubmit: async (formValues) => {
                await validateForm();

                setDiabled(true);

                const resUserLogin = await dispatch(
                    userLoginThunk(
                        formValues.loginType === 'wallet' ? { wallet: formValues.wallet } : { email: formValues.email }
                    )
                );

                if (resUserLogin.code === 'vitruveo.truID.api.users.login.wallet.success') {
                    await dispatch(connectWebSocketThunk());
                    await dispatch(loginWebSocketThunk());
                    await dispatch(userActionsCreators.loginSuccess(resUserLogin));

                    router.push('/home');
                    return;
                } else if (codesVtruApi.success.login.includes(resUserLogin.code)) {
                    router.push('/login/verificationCode');
                    return;
                } else {
                    setDiabled(false);
                    setToastr({ open: true, type: 'error', message: 'Something went wrong! Try again later.' });
                }
            },
        });

    useEffect(() => {
        dispatch(userActionsCreators.logout());
    }, []);

    return (
        <>
            <LoginView
                values={values}
                errors={errors}
                disabled={disabled}
                validateForm={validateForm}
                setFieldError={setFieldError}
                setFieldValue={setFieldValue}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
            />
            <CustomizedSnackbar
                type={toastr.type}
                open={toastr.open}
                message={toastr.message}
                setOpentate={setToastr}
            />
        </>
    );
};

export default LoginContainer;
