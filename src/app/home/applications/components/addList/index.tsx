import React, { ChangeEvent, Fragment, use, useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { useDispatch, useSelector } from '@/store/hooks';
import { Application } from '@/features/applications/types';
import { Autocomplete, Avatar, Chip, Stack, Typography } from '@mui/material';
import { CustomizedSnackbarState } from '@/app/common/toastr';
import { nanoid } from '@reduxjs/toolkit';
import { applicationsActionsCreators } from '@/features/applications/slice';
import { assetStorageThunk, sendRequestUploadThunk } from '@/features/applications/thunks';

interface Props {
    handleAddNewApplication(params: Application): void;
}

export default function AddList({ handleAddNewApplication }: Props) {
    const [submitLoading, setSubmitLoading] = useState(false);
    const [toastr, setToastr] = useState<CustomizedSnackbarState>({
        type: 'success',
        open: false,
        message: '',
    });

    const [modal, setModal] = useState(false);
    const [changeAvatarFile, setChangeAvatarFile] = useState<File>();
    const [newScope, setNewScope] = useState('');

    const fileInput = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();
    const applications = useSelector((state) => state.applications);

    const handleUploadFile = async ({ formatUpload, file }: { formatUpload: string; file: File }) => {
        const transactionId = nanoid();

        await dispatch(
            applicationsActionsCreators.requestAssetUpload({
                key: formatUpload,
                status: 'requested',
                transactionId,
            })
        );

        dispatch(
            sendRequestUploadThunk({
                mimetype: file!.type,
                metadata: {
                    formatUpload,
                },
                originalName: file!.name,
                transactionId,
            })
        );

        setFieldValue(`formats.${formatUpload}.transactionId`, transactionId);
    };

    const { handleSubmit, handleChange, resetForm, setFieldValue, values, errors } = useFormik({
        initialValues: {
            name: '',
            description: '',
            scopes: [],
            logo: '',
        },
        validateOnChange: false,
        validationSchema: yup.object().shape({
            name: yup.string().required('Name is required'),
            description: yup.string().required('Description is required'),
            scopes: yup.array().min(1, 'At least one scope is required'),
        }),
        onSubmit: async (payload) => {
            setSubmitLoading(true);
            if (changeAvatarFile) {
                handleUploadFile({ formatUpload: 'application', file: changeAvatarFile });
            } else {
                handleAddNewApplication(payload);
                toggle();
                resetForm();
            }
        },
    });

    const toggle = () => {
        setChangeAvatarFile(undefined);
        setSubmitLoading(false);
        setModal(!modal);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
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

    useEffect(() => {
        if (changeAvatarFile) {
            const requestAssetUploadNotUsed = Object.values(applications.requestAssetUpload)?.filter(
                (item) => item.transactionId && item.url && item.status === 'ready'
            );

            if (!requestAssetUploadNotUsed || !requestAssetUploadNotUsed?.length) return;

            const requestUploadReady = Object.values(requestAssetUploadNotUsed);

            const uploadAsset = async () => {
                const responseUpload = await Promise.all(
                    requestUploadReady.map(async (item) => {
                        const url = item.url;
                        dispatch(
                            applicationsActionsCreators.requestAssetUpload({
                                transactionId: item.transactionId,
                                status: 'uploading',
                            })
                        );

                        await dispatch(
                            assetStorageThunk({
                                transactionId: item.transactionId,
                                file: changeAvatarFile,
                                url,
                            })
                        );

                        return item;
                    })
                );

                handleAddNewApplication({ ...values, logo: responseUpload[0].path });
                toggle();
                resetForm();
            };

            if (requestUploadReady.length) uploadAsset();
        }
    }, [applications.requestAssetUpload]);

    const isNewAvatar = changeAvatarFile instanceof File ? URL.createObjectURL(changeAvatarFile) : '';

    return (
        <>
            <Box p={3} pb={1}>
                <Button color="primary" variant="contained" fullWidth onClick={toggle}>
                    Add new application
                </Button>
            </Box>
            <Dialog
                open={modal}
                onClose={toggle}
                maxWidth="sm"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" variant="h5">
                    Add new application
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <form onSubmit={handleSubmit}>
                            <Grid marginTop={1} spacing={3} container>
                                <Grid item xs={12} lg={9}>
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        flexDirection="column"
                                        alignItems="center"
                                    >
                                        <FormLabel style={{ marginBottom: 10 }}>Logo</FormLabel>
                                        <Avatar
                                            src={isNewAvatar}
                                            alt={'Logo'}
                                            sx={{
                                                width: 90,
                                                height: 90,
                                            }}
                                        >
                                            {isNewAvatar.length ? null : 'L'}
                                        </Avatar>
                                        <Box marginTop={1}>
                                            <Button
                                                disabled={submitLoading}
                                                size="small"
                                                variant="contained"
                                                color="primary"
                                                component="label"
                                            >
                                                upload
                                                <input
                                                    onChange={handleFileChange}
                                                    hidden
                                                    accept="image/*"
                                                    type="file"
                                                />
                                            </Button>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} lg={7}>
                                    <FormLabel>Name</FormLabel>
                                    <Box>
                                        <TextField
                                            id="name"
                                            placeholder="Enter email address"
                                            disabled={submitLoading}
                                            name="name"
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                            value={values.name}
                                            error={!!errors?.name}
                                            helperText={errors?.name}
                                            onChange={handleChange}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} lg={7}>
                                    <FormLabel>Description</FormLabel>
                                    <Box>
                                        <TextField
                                            id="description"
                                            placeholder="Enter email address"
                                            disabled={submitLoading}
                                            name="description"
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                            value={values.description}
                                            onChange={handleChange}
                                            error={!!errors?.description}
                                            helperText={errors?.description}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} lg={7}>
                                    <FormLabel>Scopes</FormLabel>
                                    <Box display="flex" alignItems="center">
                                        <TextField
                                            size="small"
                                            variant="outlined"
                                            disabled={submitLoading}
                                            fullWidth
                                            placeholder="Add new scope"
                                            value={newScope}
                                            error={!!errors?.scopes}
                                            helperText={errors?.scopes}
                                            onChange={(event) => setNewScope(event.target.value)}
                                        />
                                        <Button
                                            disabled={submitLoading}
                                            onClick={() => {
                                                setFieldValue('scopes', [...values.scopes, newScope]);
                                                setNewScope('');
                                            }}
                                        >
                                            Add
                                        </Button>
                                    </Box>
                                    <Box maxHeight={115} overflow="auto" marginTop={1}>
                                        {values.scopes.map((scope, index) => (
                                            <Chip
                                                key={index}
                                                label={scope}
                                                style={{ marginRight: 5, marginBottom: 5 }}
                                                onDelete={() => {
                                                    const newScopes = [...values.scopes];
                                                    newScopes.splice(index, 1);
                                                    setFieldValue('scopes', newScopes);
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </Grid>

                                <Box
                                    width="100%"
                                    marginTop={1}
                                    paddingY={3}
                                    gap={1}
                                    display="flex"
                                    justifyContent="flex-end"
                                >
                                    <Button disabled={submitLoading} variant="outlined" color="error" onClick={toggle}>
                                        Cancel
                                    </Button>
                                    <Button disabled={submitLoading} variant="contained" color="primary" type="submit">
                                        Save
                                    </Button>
                                </Box>
                            </Grid>
                        </form>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
}
