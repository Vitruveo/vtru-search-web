import { useState } from 'react';
import { Avatar, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from '@/store/hooks';
import { actions as actionsCreator } from '@/features/creator';

export const AvatarProfile = () => {
    const dispatch = useDispatch();

    const username = useSelector((state) => state.creator.username);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <Avatar src="/images/profile/default.png" sx={{ width: 35, height: 35 }} />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                    '& .MuiMenu-paper': {
                        width: '200px',
                    },
                }}
            >
                <MenuItem sx={{ py: 2, px: 3 }}>
                    <Typography>{username || ''}</Typography>
                </MenuItem>
                <MenuItem sx={{ py: 2, px: 3 }} onClick={() => dispatch(actionsCreator.logout())}>
                    <Typography color="#00d6f4">Logout</Typography>
                </MenuItem>
            </Menu>
        </>
    );
};
