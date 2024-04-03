import Link from 'next/link';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import { Box, useTheme } from '@mui/material';
import VtruTitle from '@/app/home/components/vtruTitle';
import { useSelector } from '@/store/hooks';

const LogoNormalDark = () => (
    <Box display="flex" marginTop={2} alignItems="center">
        <Image
            style={{ marginRight: '5px' }}
            src={'/images/logos/newlogo.png'}
            alt="logo"
            height={35}
            width={100}
            priority
        />
        <Image
            style={{ marginRight: '5px' }}
            src={'/images/logos/newFullLogo.png'}
            alt="logo"
            height={25}
            width={150}
            priority
        />
    </Box>
);

const LogoNormalLight = () => (
    <Box display="flex" marginTop={2} alignItems="center">
        <Image
            style={{ marginRight: '5px' }}
            src={'/images/logos/newlogo.png'}
            alt="logo"
            height={35}
            width={100}
            priority
        />
        <Image
            style={{ marginRight: '5px' }}
            src={'/images/logos/newFullLogo.png'}
            alt="logo"
            height={25}
            width={150}
            priority
        />
    </Box>
);

const LogoLtrDark = () => (
    <Box display="flex" marginTop={2} alignItems="center">
        <Image
            style={{ marginRight: '5px' }}
            src={'/images/logos/newlogo.png'}
            alt="logo"
            height={35}
            width={100}
            priority
        />
    </Box>
);

const LogoLtrLight = () => (
    <Box display="flex" marginTop={2} alignItems="center">
        <Image src={'/images/logos/newlogo.png'} alt="logo" height={35} width={35} priority />
        <Box marginLeft={1}>
            <VtruTitle vtruRem="1.2rem" studioRem="1.2rem" />
        </Box>
    </Box>
);

const Logo = () => {
    const customizer = useSelector((state) => state.customizer);
    const theme = useTheme();
    const LinkStyled = styled(Link)(() => ({
        height: customizer.TopbarHeight,
        width: customizer.isMobileSidebar
            ? '190px'
            : customizer.isCollapse && !customizer.isSidebarHover
              ? '40px'
              : '190px',
        overflow: 'hidden',
        display: 'block',
        color: theme.palette.text.primary,
    }));

    const dice =
        customizer.activeDir === 'ltr'
            ? {
                  style: { textDecoration: 'none' },
                  light: LogoLtrLight,
                  dark: LogoLtrDark,
              }
            : {
                  style: {},
                  light: LogoNormalLight,
                  dark: LogoNormalDark,
              };

    return (
        <LinkStyled style={dice.style} href="/home">
            {customizer.activeMode === 'dark' ? <dice.dark /> : <dice.light />}
        </LinkStyled>
    );
};

export default Logo;
