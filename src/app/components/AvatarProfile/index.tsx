import { useState } from 'react';
import { Avatar, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from '@/store/hooks';
import { actions as actionsCreator } from '@/features/creator';
import { disconnectWebSocket } from '@/services/socket';
import Image from 'next/image';

export const AvatarProfile = () => {
    const dispatch = useDispatch();

    const username = useSelector((state) => state.creator.username);
    const avatar = useSelector((state) => state.creator.avatar);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(actionsCreator.logout());
        disconnectWebSocket();
    };

    const checkAvatar = avatar != null && avatar !== '';
    const src = checkAvatar ? avatar : '/images/profile/default.png';

    return (
        <>
            <IconButton
                size="small"
                sx={{ padding: 0 }}
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                {checkAvatar ? (
                    <Avatar src={src} sx={{ width: 29, height: 29 }} />
                ) : (
                    <Image alt="" style={{ marginLeft: '5px' }} src={src} width={25} height={29} />
                )}
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
                <MenuItem sx={{ py: 2, px: 3 }} onClick={handleLogout}>
                    <Typography color="#FF0066">Logout</Typography>
                </MenuItem>
            </Menu>
        </>
    );
};
