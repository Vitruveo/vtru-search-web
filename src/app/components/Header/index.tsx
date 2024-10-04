import { useDispatch } from 'react-redux';
import { AppBar, Box, IconButton, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IconMenu2, IconMoon, IconSun } from '@tabler/icons-react';
import { useSelector } from '@/store/hooks';
import { actions } from '@/features/layout';
import Language from '../Language';
import { AvatarProfile } from '../AvatarProfile';
import Logo from '../Shared/Logo';
import { Rss } from '../Rss';
import AllProjectsMenu from '../AllProjectsMenu';
import { customizerActionsCreators } from '@/features/customizer';

const Header = () => {
    const dispatch = useDispatch();
    const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

    const customizer = useSelector((state) => state.customizer);
    const paused = useSelector((state) => state.assets.paused);
    const isLogged = useSelector((state) => state.creator.token !== '');
    const isHidden = useSelector((state) => state.customizer.hidden?.header);
    if (isHidden) return null;

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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    }));

    const onMenuClick = () => {
        dispatch(actions.toggleSidebar());
    };

    const handleToggleTheme = () => {
        dispatch(customizerActionsCreators.setTheme(customizer.activeMode === 'light'));
    };

    return (
        <AppBarStyled position="sticky" color="default" elevation={0}>
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

                <Box flexGrow={1} display="flex" alignItems="center" justifyContent="center">
                    {paused && <Typography variant="h3">⚠️ Store currently undergoing maintenance</Typography>}
                </Box>

                <Stack
                    spacing={2}
                    height={40}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    style={{
                        marginRight: '70px',
                    }}
                >
                    {!lgDown && <AllProjectsMenu />}
                    <Rss />
                    <Language />
                    {isLogged && <AvatarProfile />}
                    <IconButton size="small" sx={{ padding: 0 }} onClick={handleToggleTheme}>
                        {customizer.activeMode === 'dark' ? (
                            <IconSun width={29} height={29} />
                        ) : (
                            <IconMoon width={29} height={29} />
                        )}
                    </IconButton>
                </Stack>
            </ToolbarStyled>
        </AppBarStyled>
    );
};

export default Header;
