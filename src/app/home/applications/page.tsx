'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Drawer, useMediaQuery, Theme, Box, Button, Container } from '@mui/material';
import * as Yup from 'yup';
import PageContainer from '../components/container/PageContainer';
import Breadcrumb from '../layout/shared/breadcrumb/Breadcrumb';
import AppCard from '../components/shared/AppCard';
import AddList from './components/addList';
import List from './components/list';
import Search from './components/search';
import Details from './components/details';

import CustomizedSnackbar, { CustomizedSnackbarState } from '@/app/common/toastr';
import { Application, ApplicationList } from '@/features/applications/types';
import { list } from '@/services/apiEventSource';
import {
    createNewApplicationReq,
    deleteApplicationReq,
    requestDeleteFiles,
    updateApplicationReq,
} from '@/features/applications/requests';
import { useSelector } from '@/store/hooks';

const drawerWidth = 240;
const secdrawerWidth = 320;

const emailSchema = Yup.string().email().required();

export default function Applications() {
    const [toastr, setToastr] = useState<CustomizedSnackbarState>({
        type: 'success',
        open: false,
        message: '',
    });
    const [applications, setApplications] = useState<ApplicationList>({});
    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
    const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
    const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
    const [activeApplication, setActiveApplication] = useState<Application>();
    const [search, setSearch] = useState('');

    const customizer = useSelector((state) => state.customizer);

    const handleGetApplications = async () => {
        await list<Application>({
            path: 'applications',
            callback: (application) => {
                setApplications((prevState) => {
                    const updatedApplications = { ...prevState, [application._id!]: application };

                    const applicationsArray = Object.values(updatedApplications);

                    applicationsArray.sort(
                        (a, b) =>
                            new Date(b.framework?.createdAt || '').getTime() -
                            new Date(a.framework?.createdAt || '').getTime()
                    );

                    const sortedApplications = applicationsArray.reduce((obj, item) => {
                        return {
                            ...obj,
                            [item._id!]: item,
                        };
                    }, {});

                    return sortedApplications;
                });
            },
        });
    };

    const handleAddNewApplication = async (params: Application) => {
        const res = await createNewApplicationReq(params);
        if (res.code === 'vitruveo.truID.api.applications.create.success') {
            setToastr({ type: 'success', open: true, message: 'Application created successfully' });
            handleGetApplications();
        }
    };

    const onDeleteClick = async (params: Application) => {
        const res = await deleteApplicationReq({ _id: params._id! });
        if (res.code === 'vitruveo.truID.api.application.delete.success') {
            if (params._id === activeApplication?._id) {
                setActiveApplication(undefined);
            }
            if (params.logo) {
                await requestDeleteFiles({ deleteKeys: [params.logo] });
            }

            setToastr({ type: 'success', open: true, message: 'Application deleted successfully' });
            setApplications((prevState) => {
                const updatedApplications = { ...prevState };
                delete updatedApplications[params._id!];
                return updatedApplications;
            });
        }
    };

    const handleUpdateApplication = async (params: Application) => {
        const res = await updateApplicationReq(params);
        if (res.code === 'vitruveo.truID.api.application.update.success') {
            setToastr({ type: 'success', open: true, message: 'Application updated successfully' });
            handleGetApplications();
        }
    };

    const BCrumb = [
        {
            to: '/home',
            title: 'Home',
        },
        {
            title: 'Applications',
        },
    ];

    const applicationsFiltered = useMemo(() => {
        return search.length > 0
            ? Object.values(applications).filter((v) => v.name.toLowerCase().includes(search.toLowerCase()))
            : [];
    }, [search, applications]);

    const applicationList = search.length > 0 ? applicationsFiltered : Object.values(applications);

    useEffect(() => {
        handleGetApplications();
    }, []);

    return (
        <Container
            sx={{
                maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
            }}
        >
            <PageContainer title="Applications">
                <Box margin="auto 0" marginBottom={10} display="relative">
                    <Breadcrumb title="Applications" items={BCrumb} />

                    <AppCard>
                        <Drawer
                            open={isLeftSidebarOpen}
                            onClose={() => setLeftSidebarOpen(false)}
                            sx={{
                                width: drawerWidth,
                                [`& .MuiDrawer-paper`]: {
                                    width: drawerWidth,
                                    position: 'relative',
                                    zIndex: 2,
                                },
                                flexShrink: 0,
                            }}
                            variant={lgUp ? 'permanent' : 'temporary'}
                        >
                            <AddList handleAddNewApplication={handleAddNewApplication} />
                        </Drawer>
                        <Box
                            sx={{
                                minWidth: secdrawerWidth,
                                width: {
                                    xs: '100%',
                                    md: secdrawerWidth,
                                    lg: secdrawerWidth,
                                },
                                flexShrink: 0,
                            }}
                        >
                            <Search onClick={() => setLeftSidebarOpen(true)} search={search} setSearch={setSearch} />
                            <List
                                activeApplication={activeApplication}
                                applications={applicationList}
                                onDeleteClick={onDeleteClick}
                                onApplicationClick={(application) => setActiveApplication(application)}
                            />
                        </Box>
                        <Drawer
                            anchor="right"
                            open={isRightSidebarOpen}
                            onClose={() => setRightSidebarOpen(false)}
                            variant={mdUp ? 'permanent' : 'temporary'}
                            sx={{
                                width: mdUp ? secdrawerWidth : '100%',
                                zIndex: lgUp ? 0 : 1,
                                flex: mdUp ? 'auto' : '',
                                [`& .MuiDrawer-paper`]: {
                                    width: '100%',
                                    position: 'relative',
                                },
                            }}
                        >
                            {mdUp ? (
                                ''
                            ) : (
                                <Box sx={{ p: 3 }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        onClick={() => setRightSidebarOpen(false)}
                                        sx={{
                                            mb: 3,
                                            display: {
                                                xs: 'block',
                                                md: 'none',
                                                lg: 'none',
                                            },
                                        }}
                                    >
                                        Back{' '}
                                    </Button>
                                </Box>
                            )}
                            <Details
                                setActiveApplication={setActiveApplication}
                                activeApplication={activeApplication}
                                handleUpdateApplication={handleUpdateApplication}
                            />
                        </Drawer>
                    </AppCard>
                    <CustomizedSnackbar
                        type={toastr.type}
                        open={toastr.open}
                        message={toastr.message}
                        setOpentate={setToastr}
                    />
                </Box>
            </PageContainer>
        </Container>
    );
}
