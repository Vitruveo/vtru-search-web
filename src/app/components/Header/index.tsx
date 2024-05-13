import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { Theme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';
import { IconMenu2 } from '@tabler/icons-react';
import { useSelector } from '@/store/hooks';
import { useDispatch } from 'react-redux';
import Logo from '../Shared/Logo';
import Language from '../Language';
import { AvatarProfile } from '../AvatarProfile';
import { Rss } from '../Rss';
import { actions } from '@/features/layout';

const Header = () => {
    const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

    const customizer = useSelector((state) => state.customizer);
    const isLogged = useSelector((state) => state.creator.token !== '');
    const dispatch = useDispatch();

    const AppBarStyled = styled(AppBar)(({ theme }) => ({
        background: theme.palette.background.paper,
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',

        [theme.breakpoints.up('lg')]: {
            minHeight: customizer.TopbarHeight,
        },
    }));

    const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
        margin: '0 auto',
        width: '100%',
        color: `${theme.palette.text.secondary} !important`,
    }));

    const onMenuClick = () => {
        dispatch(actions.toggleSidebar());
    };

    return (
        <AppBarStyled position="sticky" color="default" elevation={8}>
            <ToolbarStyled
                sx={{
                    maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
                }}
            >
                {lgDown ? (
                    <IconButton color="inherit" aria-label="menu" onClick={onMenuClick}>
                        <IconMenu2 />
                    </IconButton>
                ) : (
                    <Box sx={{ width: lgDown ? '45px' : 'auto', overflow: 'hidden' }}>
                        <Logo />
                    </Box>
                )}

                <Box flexGrow={1} />
                <Stack spacing={1} direction="row" alignItems="center">
                    {/** <Rss /> */}
                    <Language />
                    {isLogged && <AvatarProfile />}
                </Stack>
            </ToolbarStyled>
        </AppBarStyled>
    );
};

export default Header;
