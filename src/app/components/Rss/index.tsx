import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Avatar, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';

interface Props {
    options: {
        flagname: string;
        value: string;
    }[];
    showIcon?: boolean;
    onClose?: () => void;
}

export interface RssRef {
    handleClick: (event: any) => void;
}

const RssRef = (props: Props, ref: any) => {
    const { ...rest } = props;
    const theme = useTheme();

    const [queryString, setQueryString] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const searchParams = new URLSearchParams(window.location.search);
            const fullQueryString = `?${searchParams.toString()}`;
            setQueryString(fullQueryString);
        }
    }, [window.location.search]);

    const handleClose = () => {
        setAnchorEl(null);
        if (rest.onClose) {
            rest.onClose();
        }
    };
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    useImperativeHandle(ref, () => ({
        handleClick,
    }));

    return (
        <>
            <IconButton
                sx={{ padding: 0 }}
                aria-label="more"
                id="long-button"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <Avatar
                    src="/images/icons/rss.png"
                    sx={{
                        width: 29,
                        height: 29,
                        margin: 0,
                        padding: 0,
                        lineHeight: '1',
                        display: rest.showIcon ? 'block' : 'none',
                    }}
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
                {rest.options.map((option, index) => (
                    <MenuItem
                        key={index}
                        sx={{ py: 2, px: 3 }}
                        onClick={() => {
                            if (option.value) {
                                window.open(`${option.value}/${queryString}`, '_blank');
                            }
                        }}
                    >
                        <Link
                            href={option.value}
                            target="_blank"
                            style={{
                                color: theme.palette.text.primary,
                            }}
                        >
                            <Typography>{option.flagname}</Typography>
                        </Link>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};
export const Rss = forwardRef<RssRef, Props>(RssRef);
