import { reset, setHidden } from '@/features/customizer/slice';
import { useDispatch, useSelector } from '@/store/hooks';
import generateQueryParam from '@/utils/generate.queryParam';
import { Button, Divider, IconButton, Menu, MenuItem, Switch, Tooltip, Typography } from '@mui/material';
import { IconCopy, IconSettings } from '@tabler/icons-react';
import { MouseEvent, useEffect, useState } from 'react';

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
        setCopyMessage('Copy URL');
    };

    const hiddenElement = useSelector((state) => state.customizer.hidden);

    const [filterCheck, setFilterCheck] = useState(false);
    const [orderCheck, setOrderCheck] = useState(false);
    const [headerCheck, setHeaderCheck] = useState(false);
    const [recentlySoldCheck, setRecentlySoldCheck] = useState(false);
    const [pageNavigationCheck, setPageNavigationCheck] = useState(false);
    const [cardDetailCheck, setCardDetailCheck] = useState(false);
    const [copyMessage, setCopyMessage] = useState('Copy URL');

    const handleChange = (key: string, hidden: boolean) => {
        if (key === 'filter') setFilterCheck(hidden);
        if (key === 'order') setOrderCheck(hidden);
        if (key === 'header') setHeaderCheck(hidden);
        if (key === 'recentlySold') setRecentlySoldCheck(hidden);
        if (key === 'pageNavigation') setPageNavigationCheck(hidden);
        if (key === 'cardDetail') setCardDetailCheck(hidden);

        generateQueryParam(`${key}_hidden`, hidden ? 'yes' : 'no');
        dispatch(setHidden({ key, hidden }));
    };

    useEffect(() => {
        if (hiddenElement) {
            setFilterCheck(hiddenElement.filter);
            setOrderCheck(hiddenElement.order);
            setHeaderCheck(hiddenElement.header);
            setRecentlySoldCheck(hiddenElement.recentlySold);
            setPageNavigationCheck(hiddenElement.pageNavigation);
            setCardDetailCheck(hiddenElement.cardDetail);
        }
    }, [hiddenElement]);

    useEffect(() => {
        if (Object.keys(paramsHidden).length === 0) dispatch(reset());
        else
            Object.entries(paramsHidden).forEach(([key, value]) => {
                dispatch(setHidden({ key: key.replace('_hidden', ''), hidden: value === 'yes' }));
            });
    }, []);

    return (
        <>
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
                    <IconSettings />
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
                    <Switch onChange={(e) => handleChange('filter', e.target.checked)} checked={filterCheck} />
                    Hide Filters
                </MenuItem>
                <MenuItem>
                    <Switch onChange={(e) => handleChange('order', e.target.checked)} checked={orderCheck} />
                    Hide Order
                </MenuItem>
                <MenuItem>
                    <Switch onChange={(e) => handleChange('header', e.target.checked)} checked={headerCheck} />
                    Hide Header
                </MenuItem>
                <MenuItem>
                    <Switch
                        onChange={(e) => handleChange('recentlySold', e.target.checked)}
                        checked={recentlySoldCheck}
                    />
                    Hide Recently Sold
                </MenuItem>
                <MenuItem>
                    <Switch
                        onChange={(e) => handleChange('pageNavigation', e.target.checked)}
                        checked={pageNavigationCheck}
                    />
                    Hide Page Navigation
                </MenuItem>
                <MenuItem>
                    <Switch onChange={(e) => handleChange('cardDetail', e.target.checked)} checked={cardDetailCheck} />
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
                            setCopyMessage('Copied!');
                        }}
                    >
                        <Typography variant="caption">{copyMessage}</Typography>
                    </Button>
                </MenuItem>
            </Menu>
        </>
    );
}
