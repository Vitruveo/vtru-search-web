import { resetStack, setHiddenStack, StateKeysStack } from '@/features/customizer/slice';
import { useDispatch, useSelector } from '@/store/hooks';
import generateQueryParam from '@/utils/generateQueryParam';
import { Box, Button, Divider, IconButton, Menu, MenuItem, Switch, Tooltip, Typography } from '@mui/material';
import { IconRestore, IconSettingsFilled } from '@tabler/icons-react';
import { MouseEvent, useEffect, useReducer, useState } from 'react';
import { initialState, reducer, TypeAction } from './slice';

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
    const handleClose = () => setAnchorEl(null);

    const hiddenElement = useSelector((state) => state.customizer.hiddenStack);
    const [state, dispatchAction] = useReducer(reducer, initialState);

    const handleChange = (key: StateKeysStack, action: TypeAction) => {
        dispatchAction({ type: action });
        generateQueryParam(`${key}_hidden`, !state[key] ? 'yes' : 'no');
        dispatch(setHiddenStack({ key, hidden: !state[key] }));
    };

    const handleReset = () => {
        dispatch(resetStack());
        Object.keys(paramsHidden).forEach((key) => generateQueryParam(key, ''));
    };

    useEffect(() => {
        if (hiddenElement) {
            Object.entries(hiddenElement).forEach((item) => {
                const [key, _value] = item as [StateKeysStack, boolean];
                if (state[key] !== hiddenElement[key])
                    dispatchAction({ type: `SET_${key.toUpperCase()}` as TypeAction });
            });
        }
    }, [hiddenElement]);

    useEffect(() => {
        if (Object.keys(paramsHidden).length === 0) dispatch(resetStack());
        else
            Object.entries(paramsHidden).forEach(([key, value]) => {
                dispatch(
                    setHiddenStack({ key: key.replace('_hidden', '') as StateKeysStack, hidden: value === 'yes' })
                );
            });
    }, []);

    return (
        <Box>
            <Box sx={{ height: 29, paddingLeft: 0.5, display: 'flex' }}>
                <Tooltip
                    title="Settings"
                    arrow
                    componentsProps={{
                        tooltip: {
                            sx: { fontSize: '0.8rem' },
                        },
                    }}
                >
                    <IconButton size="small" sx={{ padding: 0, marginLeft: 0.5 }} onClick={handleClick}>
                        <IconSettingsFilled height={29} />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                sx={{ marginTop: '1rem' }}
            >
                <MenuItem>
                    <Switch onChange={() => handleChange('header', TypeAction.SET_HEADER)} checked={state.header} />
                    Hide Header
                </MenuItem>
                <MenuItem>
                    <Switch onChange={() => handleChange('curate', TypeAction.SET_CURATE)} checked={state.curate} />
                    Hide Curate Stack
                </MenuItem>
                <MenuItem>
                    <Switch
                        onChange={() => handleChange('spotlight', TypeAction.SET_SPOTLIGHT)}
                        checked={state.spotlight}
                    />
                    Hide Spotlight
                </MenuItem>
                <MenuItem>
                    <Switch
                        onChange={() => handleChange('navigation', TypeAction.SET_NAVIGATION)}
                        checked={state.navigation}
                    />
                    Hide Navigation
                </MenuItem>
                <Divider />
                <MenuItem>
                    <Button startIcon={<IconRestore size={18} />} fullWidth variant="contained" onClick={handleReset}>
                        <Typography variant="caption">Reset</Typography>
                    </Button>
                </MenuItem>
            </Menu>
        </Box>
    );
}
