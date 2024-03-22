import React from 'react';

import Box from '@mui/material/Box';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { IconTrash } from '@tabler/icons-react';
import { Avatar } from '@mui/material';
import { GENERAL_STORAGE_URL } from '@/constants/asset';

interface Props {
    onApplicationClick: (event: React.MouseEvent<HTMLElement>) => void;
    onDeleteClick: React.MouseEventHandler<SVGElement>;
    image: string;
    name: string;
    active: any;
}

export default function RoleListItem({ onApplicationClick, onDeleteClick, name, active, image }: Props) {
    const customizer = {
        activeDir: 'ltr',
        activeMode: 'light',
        activeTheme: 'BLUE_THEME',
        SidebarWidth: 270,
        MiniSidebarWidth: 87,
        TopbarHeight: 70,
        isLayout: 'full',
        isCollapse: false,
        isSidebarHover: false,
        isMobileSidebar: false,
        isHorizontal: false,
        isLanguage: 'en',
        isCardShadow: true,
        borderRadius: 7,
    };
    const br = `${customizer.borderRadius}px`;

    const theme = useTheme();

    const warningColor = theme.palette.warning.main;

    return (
        <Box display="flex" alignItems="center">
            <ListItemButton onClick={onApplicationClick} sx={{ mb: 1 }} selected={active}>
                <ListItemText>
                    <Stack direction="row" gap="10px" alignItems="center">
                        <Avatar
                            src={`${GENERAL_STORAGE_URL}/${image}`}
                            alt={'user1'}
                            sx={{
                                width: 35,
                                height: 35,
                            }}
                        />
                        <Box mr="auto">
                            <Typography variant="subtitle1" noWrap fontWeight={600} sx={{ maxWidth: '150px' }}>
                                {name}
                            </Typography>
                        </Box>
                    </Stack>
                </ListItemText>
                <IconTrash
                    onClick={(event) => {
                        event.stopPropagation();
                        onDeleteClick(event);
                    }}
                    size="16"
                    stroke={1.5}
                />
            </ListItemButton>
        </Box>
    );
}
