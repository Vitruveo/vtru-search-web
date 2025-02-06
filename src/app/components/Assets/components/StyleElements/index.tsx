import { reset, setHidden, StateKeys } from '@/features/customizer/slice';
import { useDispatch, useSelector } from '@/store/hooks';
import generateQueryParam from '@/utils/generateQueryParam';
import { Box, Button, Divider, IconButton, Menu, MenuItem, Switch, Tooltip, Typography } from '@mui/material';
import { IconCode, IconCopy, IconSettingsFilled } from '@tabler/icons-react';
import { MouseEvent, useEffect, useReducer, useState } from 'react';
import { initialState, reducer, TypeAction } from './slice';
import { IconRestore } from '@tabler/icons-react';
import { Stores } from '@/features/stores/types';

interface Props {
    initialHidden?: Stores['appearanceContent']['hideElements'];
    isPersonalizedStore?: boolean;
}

export default function StyleElements({ initialHidden, isPersonalizedStore = false }: Props) {
    const initialHiddenSerialized = initialHidden ? serialization(initialHidden) : initialState;

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
    const [state, dispatchAction] = useReducer(reducer, initialHiddenSerialized);
    const [copyUrl, setCopyUrl] = useState('Copy URL');
    const [copyEmbed, setCopyEmbed] = useState('Copy Embed');

    const handleGenerateIframeTag = () => {
        const url = window.location.href;
        const iframeTag = `<iframe src="${url}" style="width: 100%; height: 100%"></iframe>`;
        navigator.clipboard.writeText(iframeTag);
        setCopyEmbed('Copied!');
    };

    const handleChange = (key: StateKeys, action: TypeAction) => {
        dispatchAction({ type: action });
        if (isPersonalizedStore) return;
        generateQueryParam(`${key}_hidden`, !state[key] ? 'yes' : 'no');
        dispatch(setHidden({ key, hidden: !state[key] }));
    };

    const handleReset = () => {
        if (isPersonalizedStore) return;
        dispatch(reset());
        Object.keys(paramsHidden).forEach((key) => generateQueryParam(key, ''));
    };

    useEffect(() => {
        if (initialHiddenSerialized) {
            Object.entries(initialHiddenSerialized).forEach((item) => {
                const [key, _value] = item as [StateKeys, boolean];
                dispatch(setHidden({ key, hidden: initialHiddenSerialized[key] }));
            });
        }
    }, [initialHidden]);

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
                        disabled={state.spotlight && state.assets && state.artistSpotlight}
                    />
                    Hide Recently Sold
                </MenuItem>
                <MenuItem>
                    <Switch
                        onChange={() => handleChange('spotlight', TypeAction.SET_SPOTLIGHT)}
                        checked={state.spotlight}
                        disabled={state.recentlySold && state.assets && state.artistSpotlight}
                    />
                    Hide Artwork Spotlight
                </MenuItem>
                <MenuItem>
                    <Switch
                        onChange={() => handleChange('artistSpotlight', TypeAction.SET_ARTISTSPOTLIGHT)}
                        checked={state.artistSpotlight}
                        disabled={state.recentlySold && state.assets && state.spotlight}
                    />
                    Hide Artist Spotlight
                </MenuItem>
                <MenuItem>
                    <Switch
                        onChange={() => {
                            if (!state.assets) handleChange('pageNavigation', TypeAction.SET_PAGENAVIGATION);
                        }}
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
                <MenuItem>
                    <Switch
                        onChange={() => {
                            handleChange('assets', TypeAction.SET_ASSETS);
                            handleChange('pageNavigation', TypeAction.SET_PAGENAVIGATION);
                        }}
                        checked={state.assets}
                        disabled={state.recentlySold && state.spotlight}
                    />
                    Hide Digital Assets
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
                    <Button
                        startIcon={<IconCode size={18} />}
                        fullWidth
                        variant="contained"
                        onClick={handleGenerateIframeTag}
                    >
                        <Typography variant="caption">{copyEmbed}</Typography>
                    </Button>
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

const serialization = (
    initialHidden: Stores['appearanceContent']['hideElements']
): {
    assets: boolean;
    spotlight: boolean;
    artistSpotlight: boolean;
    filter: boolean;
    order: boolean;
    header: boolean;
    recentlySold: boolean;
    pageNavigation: boolean;
    cardDetail: boolean;
} => {
    return {
        assets: initialHidden.assets || false,
        spotlight: initialHidden.artworkSpotlight || false,
        artistSpotlight: initialHidden.artistSpotlight || false,
        filter: initialHidden.filters || false,
        order: initialHidden.order || false,
        header: initialHidden.header || false,
        recentlySold: initialHidden.recentlySold || false,
        pageNavigation: initialHidden.pageNavigation || false,
        cardDetail: initialHidden.cardDetails || false,
    };
};
