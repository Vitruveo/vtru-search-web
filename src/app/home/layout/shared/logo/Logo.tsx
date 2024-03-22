import { FC } from 'react';
import Link from 'next/link';
import { styled } from '@mui/material/styles';

import Image from 'next/image';
import { Box, useTheme } from '@mui/material';
import VtruTitle from '@/app/home/components/vtruTItle';
import { useSelector } from '@/store/hooks';

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

    if (customizer.activeDir === 'ltr') {
        return (
            <LinkStyled style={{ textDecoration: 'none' }} href="/home">
                {customizer.activeMode === 'dark' ? (
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
                ) : (
                    <Box display="flex" marginTop={2} alignItems="center">
                        <Image src={'/images/logos/newlogo.png'} alt="logo" height={35} width={35} priority />
                        <Box marginLeft={1}>
                            <VtruTitle vtruRem="1.2rem" studioRem="1.2rem" />
                        </Box>
                    </Box>
                )}
            </LinkStyled>
        );
    }

    return (
        <LinkStyled href="/home">
            {customizer.activeMode === 'dark' ? (
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
            ) : (
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
            )}
        </LinkStyled>
    );
};

export default Logo;
