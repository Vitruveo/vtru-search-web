import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';
import { IconMenu2 } from '@tabler/icons-react';
import Language from './Language';

import MobileRightSidebar from './MobileRightSidebar';
import { useDispatch } from 'react-redux';
import { toggleMobileSidebar, toggleSidebar } from '@/features/customizer/slice';
import { useSelector } from '@/store/hooks';
import Logo from '../../shared/logo/Logo';

const Header = () => {
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
    const lgDown = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));

    const dispatch = useDispatch();

    // drawer
    const customizer = useSelector((state) => state.customizer);

    const AppBarStyled = styled(AppBar)(({ theme }) => ({
        boxShadow: 'none',
        background: theme.palette.background.paper,
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
        [theme.breakpoints.up('lg')]: {
            minHeight: customizer.TopbarHeight,
        },
    }));
    const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
        width: '100%',
        color: theme.palette.text.secondary,
    }));

    return (
        <AppBarStyled position="sticky" color="default">
            <ToolbarStyled>
                {/* ------------------------------------------- */}
                {/* Logo */}
                {/* ------------------------------------------- */}
                <Box px={3}>
                    <Logo />
                </Box>

                <Box flexGrow={1} />
                <Stack spacing={1} direction="row" alignItems="center">
                    <Language />
                    {/* ------------------------------------------- */}
                    {/* Ecommerce Dropdown */}
                    {/* ------------------------------------------- */}

                    {/* ------------------------------------------- */}
                    {/* End Ecommerce Dropdown */}

                    {/* ------------------------------------------- */}
                    {/* Toggle Right Sidebar for mobile */}
                    {/* ------------------------------------------- */}
                </Stack>
            </ToolbarStyled>
        </AppBarStyled>
    );
};

export default Header;
