import { ChangeEvent, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Image from 'next/image';
import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { IconPencil, IconStar, IconTrash } from '@tabler/icons-react';

import applicationIcon from 'public/images/breadcrumb/ChatBc.png';

import { useDispatch, useSelector } from '@/store/hooks';
import { Avatar, Button, Chip, FormLabel, Grid, TextField } from '@mui/material';
import BlankCard from '@/app/home/components/shared/BlankCard';
import Scrollbar from '@/app/home/components/custom-scroll/Scrollbar';
import CustomFormLabel from '@/app/home/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '@/app/home/components/forms/theme-elements/CustomTextField';
import { Application } from '@/features/applications/types';
import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';
import { applicationsActionsCreators } from '@/features/applications/slice';
import { assetStorageThunk, sendRequestUploadThunk } from '@/features/applications/thunks';
import { nanoid } from '@reduxjs/toolkit';
import { GENERAL_STORAGE_URL } from '@/constants/asset';

interface Props {
    activeApplication?: Application;
    setActiveApplication(params?: Application): void;
    handleUpdateApplication(params: Application): void;
}

export default function Details({ activeApplication, handleUpdateApplication, setActiveApplication }: Props) {
    const [submitLoading, setSubmitLoading] = useState(false);
    const [toastr, setToastr] = useState<CustomizedSnackbarState>({
        type: 'success',
        open: false,
        message: '',
    });
    const [changeAvatarFile, setChangeAvatarFile] = useState<File>();
    const [newScope, setNewScope] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [starred, setStarred] = useState(false);

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

    const { values, errors, setFieldValue, handleSubmit, handleChange } = useFormik({
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
                await handleUpdateApplication({ ...activeApplication, ...payload });
                setActiveApplication();
                setIsEditing(false);
            }
        },
    });

    const isNewAvatar =
        changeAvatarFile instanceof File
            ? URL.createObjectURL(changeAvatarFile)
            : `${GENERAL_STORAGE_URL}/${values.logo}`;

    const handleClose = () => {
        setActiveApplication();
        setIsEditing(false);
        setSubmitLoading(false);
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
        setFieldValue('name', activeApplication?.name);
        setFieldValue('description', activeApplication?.description);
        setFieldValue('scopes', activeApplication?.scopes);
        setFieldValue('logo', activeApplication?.logo);
    }, [activeApplication]);

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

                handleUpdateApplication({ ...activeApplication, ...values, logo: responseUpload[0].path });
                handleClose();
            };

            if (requestUploadReady.length) uploadAsset();
        }
    }, [applications.requestAssetUpload]);

    return (
        <>
            {activeApplication ? (
                <>
                    <Box>
                        <>
                            <BlankCard sx={{ p: 0 }}>
                                <Box pt={1}>
                                    <form onSubmit={handleSubmit}>
                                        <Box width={350} p={3}>
                                            <Typography variant="h6" mb={0.5}>
                                                Editing application
                                            </Typography>
                                            <Grid marginTop={1} spacing={3} container>
                                                <Grid item xs={12} lg={12}>
                                                    <Box
                                                        display="flex"
                                                        justifyContent="center"
                                                        flexDirection="column"
                                                        alignItems="center"
                                                    >
                                                        <FormLabel style={{ marginBottom: 10 }}>Logo</FormLabel>
                                                        <Avatar
                                                            src={isNewAvatar}
                                                            alt={'user1'}
                                                            sx={{
                                                                width: 90,
                                                                height: 90,
                                                            }}
                                                        />
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
                                                <Grid item xs={12} lg={12}>
                                                    <FormLabel>Name</FormLabel>
                                                    <Box>
                                                        <TextField
                                                            id="name"
                                                            placeholder="Enter email address"
                                                            name="name"
                                                            size="small"
                                                            variant="outlined"
                                                            fullWidth
                                                            value={values.name}
                                                            error={!!errors?.name}
                                                            helperText={errors?.name}
                                                            disabled={submitLoading}
                                                            onChange={handleChange}
                                                        />
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} lg={12}>
                                                    <FormLabel>Description</FormLabel>
                                                    <Box>
                                                        <TextField
                                                            id="description"
                                                            placeholder="Enter email address"
                                                            name="description"
                                                            size="small"
                                                            variant="outlined"
                                                            fullWidth
                                                            value={values.description}
                                                            onChange={handleChange}
                                                            error={!!errors?.description}
                                                            disabled={submitLoading}
                                                            helperText={errors?.description}
                                                        />
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} lg={12}>
                                                    <FormLabel>Scopes</FormLabel>
                                                    <Box display="flex" alignItems="center">
                                                        <TextField
                                                            size="small"
                                                            variant="outlined"
                                                            fullWidth
                                                            placeholder="Add new scope"
                                                            value={newScope}
                                                            error={!!errors?.scopes}
                                                            helperText={errors?.scopes}
                                                            disabled={submitLoading}
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
                                                        {values.scopes?.map((scope, index) => (
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
                                                    <Button
                                                        disabled={submitLoading}
                                                        variant="outlined"
                                                        color="error"
                                                        onClick={handleClose}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        disabled={submitLoading}
                                                        variant="contained"
                                                        color="primary"
                                                        type="submit"
                                                    >
                                                        Save
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </Box>
                                    </form>
                                </Box>
                            </BlankCard>
                        </>
                    </Box>
                </>
            ) : (
                <Box p={3} display={'flex'} justifyContent="center" alignItems={'center'}>
                    <Box>
                        <Typography variant="h4">Please select a application</Typography>
                        <br />
                        <Image src={applicationIcon} alt={'emailIcon'} width="250" />
                    </Box>
                </Box>
            )}
            <CustomizedSnackbar
                type={toastr.type}
                open={toastr.open}
                message={toastr.message}
                autoClose={toastr.autoClose}
                setOpentate={setToastr}
            />
        </>
    );
}
