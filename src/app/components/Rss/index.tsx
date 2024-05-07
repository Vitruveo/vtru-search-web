import React from 'react';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import Image from 'next/image';
import { Stack } from '@mui/system';
import { GENERAL_STORAGE_URL } from '@/constants/aws';

const rss = [
    {
        flagname: 'Curate stack',
        value: `${GENERAL_STORAGE_URL}/curateStack.xml`,
    },
    {
        flagname: 'NFT',
        value: `${GENERAL_STORAGE_URL}/nft.xml`,
    },
    {
        flagname: 'Remix',
        value: `${GENERAL_STORAGE_URL}/remix.xml`,
    },
    {
        flagname: 'Print',
        value: `${GENERAL_STORAGE_URL}/print.xml`,
    },
    {
        flagname: 'Stream',
        value: `${GENERAL_STORAGE_URL}/stream.xml`,
    },
];

export const Rss = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    return (
        <>
            <IconButton aria-label="more" id="long-button" aria-haspopup="true" onClick={handleClick}>
                <Image
                    src="/images/icons/rss.png"
                    width={39}
                    height={39}
                    alt=""
                    style={{ borderRadius: '50%', cursor: 'pointer' }}
                />
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
                {rss.map((option, index) => (
                    <MenuItem
                        key={index}
                        sx={{ py: 2, px: 3 }}
                        onClick={() => {
                            if (option.value) {
                                window.open(option.value, '_blank');
                            }
                        }}
                    >
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography> {option.flagname}</Typography>
                        </Stack>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};
