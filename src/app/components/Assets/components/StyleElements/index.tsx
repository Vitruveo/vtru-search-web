import { reset, setHidden, StateKeys } from '@/features/customizer/slice';
import { useDispatch, useSelector } from '@/store/hooks';
import generateQueryParam from '@/utils/generate.queryParam';
import { Box, Button, Divider, IconButton, Menu, MenuItem, Switch, Tooltip, Typography } from '@mui/material';
import { IconCode, IconCopy, IconSettingsFilled } from '@tabler/icons-react';
import { MouseEvent, useEffect, useReducer, useState } from 'react';
import { initialState, reducer, TypeAction } from './slice';
import { IconRestore } from '@tabler/icons-react';

export default function StyleElements() {
    const params = new URLSearchParams(window.location.search);
    const paramsHidden: { [key: string]: string } = {};
    params.forEach((value, key) => {
        if (key.includes('_hidden')) {
            paramsHidden[key] = value;
        }
    });

    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => {
        setAnchorEl(null);
        setCopyUrl('Copy URL');
        setCopyEmbed('Copy Embed');
    };

    const hiddenElement = useSelector((state) => state.customizer.hidden);
    const [state, dispatchAction] = useReducer(reducer, initialState);
    const [copyUrl, setCopyUrl] = useState('Copy URL');
    const [copyEmbed, setCopyEmbed] = useState('Copy Embed');

    const generateIframe = () => {
        const url = window.location.href;
        const iframeTag = `<iframe src="${url}" style="width: 100%; height: 100%"></iframe>`;
        navigator.clipboard.writeText(iframeTag);
        setCopyEmbed('Copied!');
    };

    const handleChange = (key: StateKeys, action: TypeAction) => {
        dispatchAction({ type: action });
        generateQueryParam(`${key}_hidden`, !state[key] ? 'yes' : 'no');
        dispatch(setHidden({ key, hidden: !state[key] }));
    };

    useEffect(() => {
        if (hiddenElement) {
            Object.entries(hiddenElement).forEach((item) => {
                const [key, _value] = item as [StateKeys, boolean];
                if (state[key] !== hiddenElement[key])
                    dispatchAction({ type: `SET_${key.toUpperCase()}` as TypeAction });
            });
        }
    }, [hiddenElement]);

    useEffect(() => {
        if (Object.keys(paramsHidden).length === 0) dispatch(reset());
        else
            Object.entries(paramsHidden).forEach(([key, value]) => {
                dispatch(setHidden({ key: key.replace('_hidden', '') as StateKeys, hidden: value === 'yes' }));
            });
    }, []);

    return (
        <Box>
            <Tooltip
                title="Settings"
                arrow
                componentsProps={{
                    tooltip: {
                        sx: { fontSize: '0.8rem' },
                    },
                }}
            >
                <IconButton onClick={handleClick}>
                    <IconSettingsFilled />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                sx={{ marginTop: '1rem' }}
            >
                <MenuItem>
                    <Switch onChange={() => handleChange('filter', TypeAction.SET_FILTER)} checked={state.filter} />
                    Hide Filters
                </MenuItem>
                <MenuItem>
                    <Switch onChange={() => handleChange('order', TypeAction.SET_ORDER)} checked={state.order} />
                    Hide Order
                </MenuItem>
                <MenuItem>
                    <Switch onChange={() => handleChange('header', TypeAction.SET_HEADER)} checked={state.header} />
                    Hide Header
                </MenuItem>
                <MenuItem>
                    <Switch
                        onChange={() => handleChange('recentlySold', TypeAction.SET_RECENTLYSOLD)}
                        checked={state.recentlySold}
                    />
                    Hide Recently Sold
                </MenuItem>
                <MenuItem>
                    <Switch
                        onChange={() => handleChange('pageNavigation', TypeAction.SET_PAGENAVIGATION)}
                        checked={state.pageNavigation}
                    />
                    Hide Page Navigation
                </MenuItem>
                <MenuItem>
                    <Switch
                        onChange={() => handleChange('cardDetail', TypeAction.SET_CARDDETAIL)}
                        checked={state.cardDetail}
                    />
                    Hide Card Detail
                </MenuItem>
                <Divider />
                <MenuItem>
                    <Button
                        startIcon={<IconCopy size={18} />}
                        fullWidth
                        variant="contained"
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            setCopyUrl('Copied!');
                        }}
                    >
                        <Typography variant="caption">{copyUrl}</Typography>
                    </Button>
                </MenuItem>
                <MenuItem>
                    <Button startIcon={<IconCode size={18} />} fullWidth variant="contained" onClick={generateIframe}>
                        <Typography variant="caption">{copyEmbed}</Typography>
                    </Button>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <Button
                        startIcon={<IconRestore size={18} />}
                        fullWidth
                        variant="contained"
                        onClick={() => dispatch(reset())}
                    >
                        <Typography variant="caption">Reset</Typography>
                    </Button>
                </MenuItem>
            </Menu>
        </Box>
    );
}
