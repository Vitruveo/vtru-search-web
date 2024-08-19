import { useTheme } from '@mui/material/styles';
import Select from 'react-select';

interface Props {
    value: {
        value: string;
        label: string;
    }[];
    options: any[];
    onChange(option: any): void;
}

export function InputSelect({ value, options, onChange }: Props) {
    const theme = useTheme();
    return (
        <Select
            isMulti
            styles={{
                control: (base, state) => ({
                    ...base,
                    minWidth: '240px',
                    borderColor: state.isFocused ? theme.palette.primary.main : theme.palette.grey[200],
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: '#00d6f4',
                    '&:hover': { borderColor: '#00d6f4' },
                }),
                menu: (base) => ({
                    ...base,
                    zIndex: 1000,
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.paper,
                }),
                singleValue: (base) => ({
                    ...base,
                    color: theme.palette.text.primary,
                }),
                option: (base, state) => ({
                    ...base,
                    color: theme.palette.text.primary,
                    backgroundColor: state.isFocused ? theme.palette.action.hover : 'transparent',
                    '&:hover': { backgroundColor: theme.palette.action.hover },
                }),
                input: (base) => ({
                    ...base,
                    color: theme.palette.text.primary,
                }),
            }}
            value={value}
            options={options}
            onChange={onChange}
        />
    );
}
