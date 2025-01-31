import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppBar, Box, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IconMoon, IconSun, IconMenu2, IconArrowBarToLeft, IconArrowBarToRight } from '@tabler/icons-react';
import { customizerActionsCreators } from '@/features/customizer';
import { actions as layoutActions } from '@/features/layout';
import { useSelector } from '@/store/hooks';
import AllProjectsMenu from '../AllProjectsMenu';
import { Language } from '../Language';
import { Rss } from '../Rss';
import Logo from '../Shared/Logo';
import BuyVUSDModal from '../BuyVUSD/modalHOC';
import { useTheme } from '@mui/material/styles';

interface Props {
    rssOptions: {
        flagname: string;
        value: string;
    }[];
    hasSettings?: boolean;
    isPersonalizedStore?: boolean;
    showProjects?: boolean;
}

const Header = ({ rssOptions, hasSettings = true, isPersonalizedStore = false, showProjects = true }: Props) => {
    const dispatch = useDispatch();
    const themeStyle = useTheme();
    const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
    const smUp = useMediaQuery((mediaQuery: Theme) => mediaQuery.breakpoints.up('sm'));
    const [modalState, setModalState] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const rssRef = useRef<any>(null);
    const languageRef = useRef<any>(null);

    const customizer = useSelector((state) => state.customizer);
    const paused = useSelector((state) => state.assets.paused);
    const isHidden = useSelector((state) => state.customizer.hidden?.header);
    const isSidebarOpen = useSelector((state) => state.layout.isSidebarOpen);
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

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleToggleTheme = () => {
        dispatch(customizerActionsCreators.setTheme(customizer.activeMode === 'light'));
    };
    const handleClick = () => {
        window.open('https://about.xibit.app', '_blank');
    };
    const handleOpenModal = () => {
        setModalState(true);
    };
    const handleCloseModal = () => {
        setModalState(false);
    };
    const handleOpenRSS = (event: any) => {
        if (rssRef.current) {
            rssRef.current.handleClick(event);
        }
    };
    const handleOpenLanguage = (event: any) => {
        if (languageRef.current) {
            languageRef.current.handleClick(event);
        }
    };
    const onMenuClick = () => dispatch(layoutActions.toggleSidebar());

    return (
        <AppBarStyled position="sticky" color="default" elevation={0}>
            <ToolbarStyled
                sx={{
                    maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
                }}
            >
                {lgDown ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                            sx={{ display: 'flex', width: smUp ? 'auto' : '40px', overflow: 'hidden', marginRight: 2 }}
                        >
                            <Logo isPersonalizedStore={isPersonalizedStore} />
                        </Box>
                        {showProjects && <AllProjectsMenu />}
                    </Box>
                ) : (
                    <Box sx={{ width: 'auto', overflow: 'hidden' }}>
                        <Logo isPersonalizedStore={isPersonalizedStore} />
                    </Box>
                )}

                <Box paddingInline={8}>
                    <IconButton sx={{ color: themeStyle.palette.grey[300] }} aria-label="menu" onClick={onMenuClick}>
                        {isSidebarOpen ? <IconArrowBarToLeft /> : <IconArrowBarToRight />}
                    </IconButton>
                </Box>

                <Box flexGrow={1} display="flex" alignItems="center" justifyContent="center">
                    {paused && <Typography variant="h3">⚠️ Store currently undergoing maintenance</Typography>}
                </Box>
                {!lgDown && showProjects && <AllProjectsMenu />}
                <Stack
                    spacing={2}
                    height={40}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    style={{
                        marginRight: hasSettings ? 70 : 0,
                    }}
                >
                    <IconButton
                        onClick={handleOpen}
                        sx={{ position: 'relative', left: !showProjects ? '30%' : 'inherit' }}
                    >
                        <IconMenu2 width={29} height={29} />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        sx={{
                            position: 'absolute',
                            left: '86%',
                            top: '4%',
                            '& .MuiMenu-paper': {
                                width: '150px',
                            },
                        }}
                    >
                        <MenuItem onClick={handleClick}>About Xibit</MenuItem>
                        <MenuItem onClick={handleOpenModal}>Buy VUSD</MenuItem>
                        <MenuItem onClick={handleOpenRSS}>
                            RSS Feed
                            <Rss options={rssOptions} showIcon={false} ref={rssRef} onClose={handleClose} />
                        </MenuItem>
                        <Box display={'flex'} justifyContent={'space-around'}>
                            <MenuItem onClick={handleOpenLanguage}>
                                <Language ref={languageRef} onClose={handleClose} />
                            </MenuItem>
                            <MenuItem onClick={handleToggleTheme}>
                                <IconButton size="small" sx={{ padding: 0 }} onClick={handleToggleTheme}>
                                    {customizer.activeMode === 'dark' ? (
                                        <IconSun width={29} height={29} />
                                    ) : (
                                        <IconMoon width={29} height={29} />
                                    )}
                                </IconButton>
                            </MenuItem>
                        </Box>
                    </Menu>
                </Stack>
            </ToolbarStyled>
            <BuyVUSDModal isOpen={modalState} onClose={handleCloseModal} />
        </AppBarStyled>
    );
};

export default Header;
