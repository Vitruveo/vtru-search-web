import { TextField } from '@mui/material';

interface Props {
    name: string;
    value: string;
    onChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
}

export function InputText({ name, value, onChange }: Props) {
    return <TextField fullWidth type="text" id={name} name={name} value={value} onChange={onChange} />;
}
