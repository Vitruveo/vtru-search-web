import { Switch } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { IconBucket, IconFolder, IconMail, IconSend } from '@tabler/icons-react';

import Scrollbar from '../../custom-scroll/Scrollbar';
import UserAdd from './userAdd/container';
import { useSelector } from '@/store/hooks';

interface DataType {
    id: number;
    name?: string;
    sort?: string;
    icon?: any;
    filterbyTitle?: string;
    devider?: boolean;
    color?: string;
}

export default function UserFilter() {
    const active = 'show_all';
    const customizer = useSelector((state) => state.customizer);

    const br = `${customizer.borderRadius}px`;

    const filterData: DataType[] = [
        {
            id: 2,
            name: 'All Users',
            sort: 'show_all',
            icon: IconMail,
        },
        {
            id: 3,
            name: 'Starred',
            sort: 'frequent_user',
            icon: IconSend,
        },
        {
            id: 4,
            name: 'Pending Approval',
            sort: 'starred_user',
            icon: IconBucket,
        },
        {
            id: 5,
            name: 'Blocked',
            sort: 'starred_user',
            icon: IconBucket,
        },
        {
            id: 6,
            devider: true,
        },
        {
            id: 7,
            filterbyTitle: 'Filter',
        },
        {
            id: 8,
            name: 'Online',
            sort: 'engineering_department',
            icon: IconFolder,
            color: 'primary.main',
        },
    ];

    return (
        <>
            <UserAdd />
            <List>
                <Scrollbar
                    sx={{
                        height: {
                            lg: 'calc(100vh - 100px)',
                            md: '100vh',
                        },
                        maxHeight: '800px',
                    }}
                >
                    {filterData.map((filter, index) => {
                        if (filter.filterbyTitle) {
                            return (
                                <Typography variant="subtitle1" fontWeight={600} pl={5.1} mt={1} pb={2} key={filter.id}>
                                    {filter.filterbyTitle}
                                </Typography>
                            );
                        } else if (filter.devider) {
                            return <Divider key={filter.id} sx={{ mb: 3 }} />;
                        }

                        return (
                            <ListItemButton
                                sx={{
                                    mb: 1,
                                    mx: 3,
                                    borderRadius: br,
                                }}
                                selected={active === `${filter.sort}`}
                                onClick={() => {}}
                                key={filter.id}
                            >
                                {filter.id === 8 ? (
                                    <Switch />
                                ) : (
                                    <ListItemIcon
                                        sx={{
                                            minWidth: '30px',
                                            color: filter.color,
                                        }}
                                    >
                                        <filter.icon stroke="1.5" size={19} />
                                    </ListItemIcon>
                                )}
                                <ListItemText>{filter.name}</ListItemText>
                            </ListItemButton>
                        );
                    })}
                </Scrollbar>
            </List>
        </>
    );
}
