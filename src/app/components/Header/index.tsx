import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { useTheme, Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IconMoon, IconSun, IconMenu2 } from '@tabler/icons-react';
import { customizerActionsCreators } from '@/features/customizer';
import { useSelector } from '@/store/hooks';
import AllProjectsMenu from '../AllProjectsMenu';
import { Language } from '../Language';
import { Rss } from '../Rss';
import Logo from '../Shared/Logo';
import BuyVUSDModal from '../BuyVUSD/modalHOC';

interface Props {
    rssOptions: {
        flagname: string;
        value: string;
    }[];
    isStore?: boolean;
    hasSettings?: boolean;
    isPersonalizedStore?: boolean;
    showProjects?: boolean;
}

const Header = ({
    rssOptions,
    isStore,
    hasSettings = true,
    isPersonalizedStore = false,
    showProjects = true,
}: Props) => {
    const dispatch = useDispatch();
    const isMobile = useMediaQuery('(max-width: 900px)');

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
    const storesName = useSelector((state) => state.stores.currentDomain?.organization?.name);
    // const packIsLoading = useSelector((state) => state.assets.packLoading);

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

    // const generatePack = () => {
    //     dispatch(actions.getPack());
    // };

    if (isHidden) return null;

    return (
        <AppBar
            position="sticky"
            color="default"
            elevation={0}
            sx={{
                background: themeStyle.palette.background.paper,
                justifyContent: 'center',
                backdropFilter: 'blur(4px)',
                [themeStyle.breakpoints.up('lg')]: {
                    minHeight: customizer.TopbarHeight,
                },
            }}
        >
            <Toolbar
                sx={{
                    margin: '0 auto',
                    width: '100%',
                    color: `${themeStyle.palette.text.secondary} !important`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
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
                <Typography
                    sx={{
                        paddingInline: isMobile ? 0 : isStore ? 4.5 : 8,
                        color: themeStyle.palette.text.primary,
                        fontSize: isMobile ? 20 : 50,
                        display: 'block',
                        lineHeight: 1,
                    }}
                >
                    {storesName}
                </Typography>
                <Box flexGrow={1} display="flex" alignItems="center" justifyContent="center">
                    {paused && <Typography variant="h3">⚠️ Store currently undergoing maintenance</Typography>}
                </Box>
                {!lgDown && showProjects && <AllProjectsMenu />}
                <IconButton sx={{ marginRight: hasSettings ? 8.5 : 0 }} size="small" onClick={handleOpen}>
                    <IconMenu2 width={29} height={29} />
                </IconButton>
                <Menu
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    sx={{
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
                    {/* {isPersonalizedStore && (
                        <MenuItem onClick={generatePack} disabled={packIsLoading}>
                            {packIsLoading ? <CircularProgress size="1.6rem" /> : 'Gallery Pack'}
                        </MenuItem>
                    )} */}
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
            </Toolbar>
            <BuyVUSDModal isOpen={modalState} onClose={handleCloseModal} />
        </AppBar>
    );
};

export default Header;
