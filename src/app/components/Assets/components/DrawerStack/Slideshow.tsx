import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';

import { Asset } from '@/features/assets/types';
import { useDispatch, useSelector } from '@/store/hooks';
import { actions } from '@/features/assets';
import { useState } from 'react';
import { ShareButton } from './ShareButton';
import { SLIDESHOW_BASE_URL } from '@/constants/api';
import { createTwitterIntent } from '@/utils/twitter';
import { useI18n } from '@/app/hooks/useI18n';

interface VideoStackProps {
    selectedAssets: Asset[];
    title: string;
    description: string;
    fees: number;
}

export default function Slideshow({ selectedAssets, title, description, fees }: VideoStackProps) {
    const dispatch = useDispatch();
    const { language } = useI18n();
    const slideshow = useSelector((state) => state.assets.slideshow);

    const [display, setDisplay] = useState('Alternate');
    const [interval, setInterval] = useState(10);

    const url = `${SLIDESHOW_BASE_URL}?slideshow=${slideshow}`;
    const twitterShareURL = createTwitterIntent({
        url,
        hashtags: 'Vitruveo,VTRUSuite',
        text: 'Check out this slideshow!',
    });

    const handleSubmit = () => {
        dispatch(
            actions.generateSlideshow({
                assets: selectedAssets.map((asset) => asset._id.toString()),
                title,
                description,
                fees,
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
                        style={{ color: '#FF0066', textDecoration: 'underline' }}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {language['search.drawer.stack.slideshow.open'] as string}
                    </a>
                </Box>

                <Box display={'flex'} justifyContent={'center'} mt={2}>
                    <ShareButton twitterURL={twitterShareURL} url={url} contentToCopy={url} title={title} />
                </Box>
            </>
        );
    }

    return (
        <>
            <Box mb={2}>
                <FormControl>
                    <FormLabel>{language['search.drawer.stack.slideshow.interval'] as string}</FormLabel>
                    <TextField
                        type="number"
                        value={interval}
                        onChange={(event) => setInterval(parseInt(event.target.value))}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />
                </FormControl>
            </Box>
            <FormControl>
                <FormLabel>{language['search.drawer.stack.slideshow.infobar'] as string}</FormLabel>
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
                    <FormControlLabel
                        value="Alternate"
                        control={<Radio />}
                        label={language['search.drawer.stack.slideshow.option.alternate'] as string}
                    />
                    <FormControlLabel
                        value="Left/Up"
                        control={<Radio />}
                        label={language['search.drawer.stack.slideshow.option.leftUp'] as string}
                    />
                    <FormControlLabel
                        value="Right/Down"
                        control={<Radio />}
                        label={language['search.drawer.stack.slideshow.option.RightDown'] as string}
                    />
                    <FormControlLabel
                        value="Hide"
                        control={<Radio />}
                        label={language['search.drawer.stack.slideshow.option.hide'] as string}
                    />
                </RadioGroup>
            </FormControl>
            <Button
                disabled={title.length === 0 || selectedAssets.length === 0}
                variant="contained"
                fullWidth
                onClick={handleSubmit}
            >
                {language['search.drawer.stack.slideshow.button.publish'] as string}
            </Button>
        </>
    );
}
