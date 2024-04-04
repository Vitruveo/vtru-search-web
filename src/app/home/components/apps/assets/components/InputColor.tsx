import { Box, Button } from '@mui/material';
import '../assetsFilter/InputColor.css';

interface Props {
    name: string;
    onClick(): void;
    onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

export function InputColor({ name, onClick, onChange }: Props) {
    return (
        <Box width="100%" display="flex" justifyContent="space-between">
            <input className="inputColor" type="color" id={name} name={name} onChange={onChange} />
            <Button onClick={onClick}>Add Color</Button>
        </Box>
    );
}
