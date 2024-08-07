import { useI18n } from '@/app/hooks/useI18n';
import { useDispatch } from '@/store/hooks';
import { Modal, Box, Typography, TextField, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState, useEffect, useMemo } from 'react';
import audios from '../../../../../../public/data/sounds.json';
import { actions as assetActions } from '@/features/assets';
import { Asset } from '@/features/assets/types';
import VideoStack from './VideoStack';
import GridStack from './GridStack';

interface PublishStackModalProps {
    selectedAssets: Asset[];
    isOpen: boolean;
    onClose: () => void;
}

export const PublishStackModal = ({ selectedAssets, isOpen, onClose }: PublishStackModalProps) => {
    const dispatch = useDispatch();
    const { language } = useI18n();
    const [title, setTitle] = useState('');
    const [tabValue, setTabValue] = useState('1');
    const [selectedAudio, setSelectedAudio] = useState(audios[0].value);

    const audio = useMemo(() => new Audio(`/audios/${selectedAudio}`), [selectedAudio]);

    const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    useEffect(() => {
        if (isOpen) {
            audio.pause();
            dispatch(assetActions.setVideoUrl(''));
            setTitle('');
        }
    }, [isOpen]);

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    backgroundColor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Box width="100%" display="flex" justifyContent="center" mb={4}>
                    <Typography variant="h4">{language['search.drawer.stack.publishStack'] as string}</Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={3}>
                    <Typography width={120}>
                        {language['search.drawer.stack.title'] as string}
                        <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <TextField rows={4} value={title} fullWidth onChange={onTitleChange} />
                </Box>

                <Box display="flex" alignItems="center" mb={3}>
                    <Typography width={120}>Curator Fee</Typography>
                    <TextField rows={4} value={'10% (feature not yet supported)'} fullWidth disabled />
                </Box>

                <TabContext value={tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={(_e, value) => setTabValue(value)} variant="scrollable" scrollButtons="auto">
                            <Tab label="Video" value="1" />
                            <Tab label="Grid" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <VideoStack
                            selectedAssets={selectedAssets}
                            audio={audio}
                            selectedAudio={selectedAudio}
                            setSelectedAudio={setSelectedAudio}
                            title={title}
                        />
                    </TabPanel>
                    <TabPanel value="2">
                        <GridStack selectedAssets={selectedAssets} title={title} />
                    </TabPanel>
                </TabContext>
            </Box>
        </Modal>
    );
};
