import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { AppBar, Box, Button, IconButton, Stack, Toolbar, Tooltip } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IconMenu2, IconMoon, IconPlus, IconSun } from '@tabler/icons-react';
import { useSelector } from '@/store/hooks';
import { actions } from '@/features/layout';
import { customizerActionsCreators } from '@/features/customizer';
import { STUDIO_BASE_URL } from '@/constants/api';
import Language from '../Language';
import { AvatarProfile } from '../AvatarProfile';
import Logo from '../Shared/Logo';
import { Rss } from '../Rss';

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

    const handleToggleTheme = () => {
        dispatch(customizerActionsCreators.setTheme(customizer.activeMode === 'light'));
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
                    <IconButton onClick={handleToggleTheme}>
                        {customizer.activeMode === 'dark' ? <IconSun /> : <IconMoon />}
                    </IconButton>
                    <Tooltip
                        title="Join Vitruveo"
                        arrow
                        componentsProps={{
                            tooltip: {
                                sx: { fontSize: '0.8rem' },
                            },
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={() => window.open(`${STUDIO_BASE_URL}/login`, '_blank')}
                            sx={{ borderRadius: 0.5, display: 'flex', gap: 1.2, padding: '0.35rem 0.4rem' }}
                        >
                            <IconPlus size={16} />
                            <Image src="/images/logos/VTRU_Studio.png" width={18} height={18} alt="studio logo" />
                        </Button>
                    </Tooltip>
                    <Rss />
                    <Language />
                    {isLogged && <AvatarProfile />}
                </Stack>
            </ToolbarStyled>
        </AppBarStyled>
    );
};

export default Header;
