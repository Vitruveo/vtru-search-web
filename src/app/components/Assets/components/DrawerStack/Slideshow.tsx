import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Input,
    Radio,
    RadioGroup,
    TextField,
} from '@mui/material';

import { Asset } from '@/features/assets/types';
import { useDispatch, useSelector } from '@/store/hooks';
import { actions } from '@/features/assets';
import { useState } from 'react';
import { ShareButton } from './ShareButton';

interface VideoStackProps {
    selectedAssets: Asset[];
    title: string;
}

export default function Slideshow({ selectedAssets, title }: VideoStackProps) {
    const dispatch = useDispatch();

    const slideshow = useSelector((state) => state.assets.slideshow);

    const [display, setDisplay] = useState('Alternate');
    const [interval, setInterval] = useState(10);

    const handleSubmit = () => {
        dispatch(
            actions.generateSlideshow({
                assets: selectedAssets.map((asset) => asset._id.toString()),
                title,
                fees: 10,
                display,
                interval,
            })
        );
    };

    if (slideshow) {
        return (
            <>
                <Box mt={2}>
                    <a
                        style={{ color: '#00d6f4', textDecoration: 'underline' }}
                        href={`http://localhost:5173?slideshow=${slideshow}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Open slideshow
                    </a>
                </Box>

                <Box display={'flex'} justifyContent={'center'} mt={2}>
                    <ShareButton twitterURL={''} url={''} downloadable contentToCopy={''} title={title} />
                </Box>
            </>
        );
    }

    return (
        <>
            <Box mb={2}>
                <FormControl>
                    <FormLabel>Interval (seconds)</FormLabel>
                    <TextField
                        type="number"
                        value={interval}
                        onChange={(event) => setInterval(parseInt(event.target.value))}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />
                </FormControl>
            </Box>
            <FormControl>
                <FormLabel>Info Bar</FormLabel>
                <RadioGroup
                    name="radio-buttons-group"
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 2,
                    }}
                    value={display}
                    onChange={(event) => setDisplay(event.target.value)}
                >
                    <FormControlLabel value="Alternate" control={<Radio />} label="Alternate" />
                    <FormControlLabel value="Left/Up" control={<Radio />} label="Left/Up" />
                    <FormControlLabel value="Right/Down" control={<Radio />} label="Right/Down" />
                    <FormControlLabel value="Hide" control={<Radio />} label="Hide" />
                </RadioGroup>
            </FormControl>
            <Button disabled={false} variant="contained" fullWidth onClick={handleSubmit}>
                Generate slideshow
            </Button>
        </>
    );
}
