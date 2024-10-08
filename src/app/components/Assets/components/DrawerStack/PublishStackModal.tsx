import { useI18n } from '@/app/hooks/useI18n';
import { useDispatch } from '@/store/hooks';
import { Modal, Box, Typography, TextField, Tab, Slider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState, useEffect, useMemo } from 'react';
import audios from '../../../../../../public/data/sounds.json';
import { actions as assetActions } from '@/features/assets';
import { Asset } from '@/features/assets/types';
import VideoStack from './VideoStack';
import GridStack from './GridStack';
import Slideshow from './Slideshow';

interface PublishStackModalProps {
    selectedAssets: Asset[];
    isOpen: boolean;
    onClose: () => void;
}

const curatorFeeProps = {
    min: 0,
    max: 25,
    value: 10,
};

export const PublishStackModal = ({ selectedAssets, isOpen, onClose }: PublishStackModalProps) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { language } = useI18n();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tabValue, setTabValue] = useState('1');
    const [selectedAudio, setSelectedAudio] = useState(audios[0].value);
    const [generating, setGenerating] = useState(false);
    const [curatorFeeValue, setCuratorFeeValue] = useState(curatorFeeProps.value);

    const audio = useMemo(() => new Audio(`/audios/${selectedAudio}`), [selectedAudio]);

    const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };
    const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleChangeCuratorFee = (_event: Event, newValue: number | number[]) => {
        if (Array.isArray(newValue)) return;

        setCuratorFeeValue(newValue);
    };

    useEffect(() => {
        if (isOpen) {
            audio.pause();
            dispatch(assetActions.setVideoUrl(''));
            setTitle('');
            dispatch(assetActions.setSlideshow(''));
        }
    }, [isOpen]);

    return (
        <Modal
            open={isOpen}
            onClose={!generating ? onClose : () => {}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Box
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    p: { xs: 2, sm: 4 },
                    width: { xs: '85%', sm: '60%', md: '45%', lg: '30%' },
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    borderRadius: 2,
                }}
            >
                <Box width="100%" display="flex" justifyContent="center" mb={4}>
                    <Typography variant="h4" noWrap>
                        {language['search.drawer.stack.publishStack'] as string}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={3} flexDirection={{ xs: 'column', sm: 'row' }}>
                    <Typography width={{ xs: '100%', sm: 120 }} mb={{ xs: 1, sm: 0 }}>
                        {language['search.drawer.stack.title'] as string}
                        <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <TextField rows={4} value={title} fullWidth onChange={onTitleChange} />
                </Box>

                <Box display="flex" alignItems="center" mb={3} flexDirection={{ xs: 'column', sm: 'row' }}>
                    <Typography width={{ xs: '100%', sm: 120 }} mb={{ xs: 1, sm: 0 }}>
                        Curator Fee
                    </Typography>
                    <Box width={'100%'} display={'flex'} gap={2} alignItems={'center'}>
                        <Typography>{curatorFeeValue}%</Typography>
                        <Typography>0</Typography>
                        <Slider
                            defaultValue={[curatorFeeProps.min, curatorFeeProps.max]}
                            value={curatorFeeValue}
                            min={curatorFeeProps.min}
                            max={curatorFeeProps.max}
                            onChange={handleChangeCuratorFee}
                            disabled
                        />
                        <Typography>25</Typography>
                    </Box>
                </Box>

                <Box display="flex" alignItems="center" mb={3} flexDirection={{ xs: 'column', sm: 'row' }}>
                    <Box>
                        <Typography width={{ xs: '100%', sm: 120 }} mb={{ xs: 1, sm: 0 }}>
                            Description
                        </Typography>
                        <Typography variant="caption" width={{ xs: '100%', sm: 120 }} mb={{ xs: 1, sm: 0 }}>
                            (Limit 200 characters)
                        </Typography>
                    </Box>
                    <TextField multiline value={description} fullWidth onChange={onDescriptionChange} />
                </Box>

                <TabContext value={tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList
                            onChange={(_e, value) => (!generating ? setTabValue(value) : () => {})}
                            variant="scrollable"
                            scrollButtons="auto"
                        >
                            <Tab label="Video" value="1" />
                            <Tab label="Grid" value="2" />
                            <Tab label="Slideshow" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <VideoStack
                            selectedAssets={selectedAssets}
                            audio={audio}
                            selectedAudio={selectedAudio}
                            setSelectedAudio={setSelectedAudio}
                            title={title.trim()}
                            description={description.trim()}
                            fees={curatorFeeValue}
                            setGenerating={setGenerating}
                        />
                    </TabPanel>
                    <TabPanel value="2">
                        <GridStack
                            selectedAssets={selectedAssets}
                            title={title.trim()}
                            description={description.trim()}
                            fees={curatorFeeValue}
                        />
                    </TabPanel>
                    <TabPanel value="3">
                        <Slideshow
                            selectedAssets={selectedAssets}
                            title={title.trim()}
                            description={description.trim()}
                            fees={curatorFeeValue}
                        />
                    </TabPanel>
                </TabContext>
            </Box>
        </Modal>
    );
};
