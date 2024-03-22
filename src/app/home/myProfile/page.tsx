'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// components
import { useDispatch, useSelector } from '@/store/hooks';
import Breadcrumb from '@/app/home/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '../components/container/PageContainer';
import BlankCard from '../components/shared/BlankCard';
import AccountSettings from './accountSettings';

import { Stack } from '@mui/system';
import { FooterForm } from '../components/footerForm';
import {
    changeAvatarThunk,
    generalStorageAvatarThunk,
    saveProfileThunk,
    sendRequestUploadThunk,
} from '@/features/user/thunks';
import { userSelector } from '@/features/user';
import { AccountSettingsFormValues } from './types';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';
import CustomTextField from '../components/forms/theme-elements/CustomTextField';
import { debouncedUsernameValidation } from './helpers';
import PageContainerFooter from '../components/container/PageContainerFooter';
import { useI18n } from '@/app/hooks/useI18n';
import { useAvatar } from './useAvatar';

export default function ProfileSettings() {
    const [resetAvatar, setResetAvatar] = useState(false);
    const [changeAvatarFile, setChangeAvatarFile] = useState<File>();
    const [usernameError, setUsernameError] = useState('');
    const [toastr, setToastr] = useState<CustomizedSnackbarState>({
        type: 'success',
        open: false,
        message: '',
    });

    const { profile, requestAvatarUpload } = useSelector(userSelector(['profile', 'requestAvatarUpload']));

    const { avatarSrc } = useAvatar();

    const dispatch = useDispatch();
    const router = useRouter();

    const { language } = useI18n();

    const texts = {
        title: language['studio.myProfile.title'],
        subtitle: language['studio.myProfile.subtitle'],
        home: language['studio.myProfile.home'],
        emailsTitle: language['studio.myProfile.form.emails.title'],
        walletsTitle: language['studio.myProfile.form.wallets.title'],
        usernameTitle: language['studio.myProfile.form.username.title'],
        usernamePlaceholder: language['studio.myProfile.form.username.placeholder'],
        saveMessage: language['studio.myProfile.saveMessage'],
        usernameRequiredError: language['studio.myProfile.form.usernameRequired.error'],
        accessConsignMessage: language['studio.myProfile.accessConsignMessage'],
        profileTitle: language['studio.myProfile.form.profile.title'],
        profileResetButton: language['studio.myProfile.form.profile.reset.button'],
        profileUploadButton: language['studio.myProfile.form.profile.upload.button'],
        profileDescription: language['studio.myProfile.form.profile.description'],
    } as { [key: string]: string };

    const BCrumb = [
        {
            to: '/home',
            title: texts.home,
        },
        {
            title: texts.title,
        },
    ];

    const { handleSubmit, handleChange, setFieldValue, setFieldError, setErrors, values, errors } =
        useFormik<AccountSettingsFormValues>({
            initialValues: {
                name: profile.name || '',
                emails: profile.emails || [],
                wallets: profile.wallets || [],
            },
            // validationSchema: stepsSchemaValidation,
            onSubmit: async (formValues) => {
                if (!formValues.name || formValues.name?.length === 0) setUsernameError(texts.usernameRequiredError);
                else {
                    dispatch(
                        saveProfileThunk({
                            name: formValues.name,
                            emails: formValues.emails,
                            wallets: formValues.wallets,
                        })
                    );
                    if (resetAvatar) {
                        dispatch(changeAvatarThunk({ fileId: '' }));
                        setToastr({
                            open: true,
                            type: 'success',
                            message: texts.saveMessage,
                        });
                    } else if (changeAvatarFile) {
                        dispatch(
                            sendRequestUploadThunk({
                                mimetype: changeAvatarFile!.type,
                                originalName: changeAvatarFile!.name,
                            })
                        );
                    } else {
                        setToastr({
                            open: true,
                            type: 'success',
                            message: texts.saveMessage,
                        });

                        // setTimeout(() => {
                        //     router.push('/home');
                        // }, 500);
                    }
                }
            },
        });

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (handleChange) handleChange(e);
        if (e.target.value === profile.name) return;
        debouncedUsernameValidation(e.target.value, setUsernameError);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (resetAvatar) setResetAvatar(false);

        const file = event.target.files?.[0];

        if (file) {
            const fileSize = file.size / 1024;
            if (fileSize > 800) {
                setToastr({
                    open: true,
                    type: 'warning',
                    message: 'File size is too big',
                });
            } else {
                setChangeAvatarFile(file);
            }
        }
    };

    const handleOnClickReset = () => {
        setResetAvatar(true);
    };

    useEffect(() => {
        if (requestAvatarUpload.status === 'ready') {
            dispatch(
                generalStorageAvatarThunk({
                    file: changeAvatarFile!,
                    path: requestAvatarUpload.path,
                    url: requestAvatarUpload.url,
                    transactionId: requestAvatarUpload.transactionId,
                })
            );

            setToastr({
                open: true,
                type: 'success',
                message: texts.saveMessage,
            });

            // setTimeout(() => {
            //     router.push('/home');
            // }, 500);
        }
    }, [requestAvatarUpload.status]);

    const isNewAvatar = resetAvatar
        ? '/images/profile/profileDefault.png'
        : changeAvatarFile instanceof File
          ? URL.createObjectURL(changeAvatarFile)
          : avatarSrc;

    return (
        <form onSubmit={handleSubmit}>
            <PageContainerFooter backPathRouter="/home" title={texts.title}>
                <Box margin="auto 0" marginBottom={10} display="relative">
                    <Breadcrumb title={texts.title} items={BCrumb} />

                    <Box my={3}>
                        <Typography variant="h5" fontWeight="normal" color="GrayText">
                            {texts.subtitle}
                        </Typography>
                    </Box>

                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={6}>
                            <BlankCard>
                                <CardContent sx={{ height: { xs: 'auto', lg: '500px' } }}>
                                    <Box my={2} maxWidth={250}>
                                        <Box mb={2}>
                                            <Typography variant="subtitle1" fontWeight={600} component="label">
                                                {texts.usernameTitle}
                                            </Typography>
                                        </Box>
                                        <CustomTextField
                                            placeholder={texts.usernamePlaceholder}
                                            size="small"
                                            id="name"
                                            variant="outlined"
                                            fullWidth
                                            value={values.name}
                                            onChange={handleUsernameChange}
                                            error={!!errors.name || !!usernameError}
                                            helperText={errors.name || usernameError}
                                        />
                                    </Box>
                                    <Box my={3}>
                                        <Typography variant="subtitle1" fontWeight={600} component="label" mb={3}>
                                            {texts.profileTitle}
                                        </Typography>
                                        <Box textAlign="center" display="flex" justifyContent="center">
                                            <Box>
                                                <Avatar
                                                    src={isNewAvatar}
                                                    alt={'user1'}
                                                    sx={{
                                                        width: 120,
                                                        height: 120,
                                                        margin: '0 auto',
                                                    }}
                                                />
                                                <Stack direction="row" justifyContent="center" spacing={2} my={3}>
                                                    <Button
                                                        onClick={handleOnClickReset}
                                                        variant="outlined"
                                                        color="error"
                                                    >
                                                        {texts.profileResetButton}
                                                    </Button>
                                                    <Button variant="contained" color="primary" component="label">
                                                        {texts.profileUploadButton}
                                                        <input
                                                            onChange={handleFileChange}
                                                            hidden
                                                            accept="image/*"
                                                            type="file"
                                                        />
                                                    </Button>
                                                </Stack>
                                                <Typography variant="subtitle1" color="textSecondary" mb={4}>
                                                    {texts.profileDescription}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </BlankCard>
                        </Grid>
                        <Grid item xs={12} lg={6} width="50%">
                            <BlankCard>
                                <CardContent
                                    sx={{ height: { xs: 'auto', lg: '500px' } }}
                                    style={{ overflowY: 'auto', maxHeight: '535px' }}
                                >
                                    <AccountSettings
                                        values={values}
                                        errors={errors}
                                        handleChange={handleChange}
                                        handleSubmit={handleSubmit}
                                        setErrors={setErrors}
                                        setFieldError={setFieldError}
                                        setFieldValue={setFieldValue}
                                    />
                                </CardContent>
                            </BlankCard>
                        </Grid>
                    </Grid>
                </Box>

                <CustomizedSnackbar
                    type={toastr.type}
                    open={toastr.open}
                    message={toastr.message}
                    autoClose={toastr.autoClose}
                    setOpentate={setToastr}
                />
            </PageContainerFooter>
        </form>
    );
}
