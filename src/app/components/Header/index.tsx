import * as React from 'react';
import Image from 'next/image';
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
import { toggleMobileSidebar } from '@/features/customizer/slice';
import Logo from '../Shared/Logo';
import Language from '../Language';
import { AvatarProfile } from '../AvatarProfile';
import { GENERAL_STORAGE_URL } from '@/constants/aws';

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

    return (
        <AppBarStyled position="sticky" color="default" elevation={8}>
            <ToolbarStyled
                sx={{
                    maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
                }}
            >
                <Box sx={{ width: lgDown ? '45px' : 'auto', overflow: 'hidden' }}>
                    <Logo />
                </Box>

                {lgDown ? (
                    <IconButton color="inherit" aria-label="menu" onClick={() => dispatch(toggleMobileSidebar())}>
                        <IconMenu2 />
                    </IconButton>
                ) : (
                    ''
                )}

                <Box flexGrow={1} />
                <Stack spacing={1} direction="row" alignItems="center">
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-haspopup="true"
                        onClick={() => {
                            window.open(`${GENERAL_STORAGE_URL}/rss.xml`, '_blank');
                        }}
                    >
                        <Image
                            src="/images/icons/rss.png"
                            width={30}
                            height={30}
                            alt=""
                            style={{ borderRadius: 30, cursor: 'pointer' }}
                        />
                    </IconButton>

                    <Language />
                    {isLogged && <AvatarProfile />}
                </Stack>
            </ToolbarStyled>
        </AppBarStyled>
    );
};

export default Header;
