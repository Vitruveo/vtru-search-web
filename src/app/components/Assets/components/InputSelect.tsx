import { useTheme } from '@mui/material/styles';
import Select from 'react-select';

interface Props {
    value: {
        value: string;
        label: string;
    }[];
    options: any[];
    onChange(option: any): void;
    fixed?: string[];
}

export function InputSelect({ value, options, onChange, fixed }: Props) {
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
                    boxShadow: theme.palette.primary.main,
                    '&:hover': { borderColor: theme.palette.primary.main },
                }),
                menu: (base) => ({
                    ...base,
                    zIndex: 1000,
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.paper,
                }),
                multiValue: (base) => ({
                    ...base,
                    backgroundColor: theme.palette.action.selected,
                }),
                multiValueLabel: (base) => ({
                    ...base,
                    color: theme.palette.text.primary,
                }),
                multiValueRemove: (base, state) => ({
                    ...base,
                    display: fixed?.includes(state.data.value) ? 'none' : 'inherit',
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
            isClearable={value.some((item) => !fixed?.includes(item.value))}
        />
    );
}
