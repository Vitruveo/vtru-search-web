import { Button, Divider, IconButton, Menu, MenuItem, Switch, Tooltip, Typography } from '@mui/material';
import { IconCopy, IconSettings } from '@tabler/icons-react';
import { MouseEvent, useState } from 'react';

export default function StyleElements() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

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
                    <Switch /> Hide Filters
                </MenuItem>
                <MenuItem>
                    <Switch /> Hide Order
                </MenuItem>
                <MenuItem>
                    <Switch /> Hide Header
                </MenuItem>
                <MenuItem>
                    <Switch /> Hide Recently Sold
                </MenuItem>
                <Divider />
                <MenuItem>
                    <Button startIcon={<IconCopy size={18} />} fullWidth variant="contained">
                        <Typography variant="caption">Copy URL</Typography>
                    </Button>
                </MenuItem>
            </Menu>
        </>
    );
}
