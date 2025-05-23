import { Box } from '@mui/material';
import { IconTrash } from '@tabler/icons-react';

interface Props {
    colors: string[];
    onRemove(color: string): void;
}

export function Colors({ colors = [], onRemove }: Props) {
    return colors.map((color, index) => {
        let bgcolor;
        if (Array.isArray(color)) {
            bgcolor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        } else {
            bgcolor = color;
        }

        return (
            <Box mt={1} key={index} display="flex" alignItems="center" justifyContent="space-between">
                <Box width="1rem" height="1rem" borderRadius="50%" bgcolor={bgcolor}></Box>
                {Array.isArray(color) && (
                    <IconTrash cursor="pointer" color="red" width={20} onClick={() => onRemove(color)} />
                )}
            </Box>
        );
    });
}
