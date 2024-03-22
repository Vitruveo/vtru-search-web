import List from '@mui/material/List';

import Item from './item';
import Scrollbar from '@/app/home/components/custom-scroll/Scrollbar';
import { Application } from '@/features/applications/types';

type Props = {
    activeApplication?: Application;
    applications: Application[];
    onApplicationClick(params: Application): void;
    onDeleteClick(params: Application): void;
};

export default function EmailsList({ activeApplication, applications, onApplicationClick, onDeleteClick }: Props) {
    return (
        <Scrollbar
            sx={{
                height: {
                    lg: 'calc(100vh - 360px)',
                    md: '100vh',
                },
            }}
        >
            <List>
                {applications.map((v, key) => (
                    <Item
                        key={key}
                        name={v.name}
                        active={activeApplication?.name === v.name}
                        image={v.logo}
                        onApplicationClick={() => onApplicationClick(v)}
                        onDeleteClick={() => onDeleteClick(v)}
                    />
                ))}
            </List>
        </Scrollbar>
    );
}
