import { Box } from '@mui/material';
import { IconTrash } from '@tabler/icons-react';

interface Props {
    colors: string[];
    onRemove(color: string): void;
}

export function Colors({ colors = [], onRemove }: Props) {
    return colors.map((color) => {
        return (
            <Box mt={1} key={color} display="flex" alignItems="center" justifyContent="space-between">
                <Box width="1rem" height="1rem" borderRadius="50%" bgcolor={color}></Box>
                <IconTrash cursor="pointer" color="red" width={20} onClick={() => onRemove(color)} />
            </Box>
        );
    });
}
