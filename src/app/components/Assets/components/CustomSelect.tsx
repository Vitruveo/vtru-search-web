import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Select, { Props as ReactSelectProps } from 'react-select';

interface OptionType {
    value: string;
    label: string;
}

interface Props extends ReactSelectProps<OptionType, true> {
    value: OptionType[];
    options: OptionType[];
    onChange(option: any): void;
    fixed?: string[];
}

export function CustomSelect({ value, options, onChange, fixed, ...props }: Props) {
    const theme = useTheme();
    const [orderedValues, setOrderedValues] = useState(value);

    useEffect(() => {
        setOrderedValues([...value].sort((a, b) => a.label.localeCompare(b.label)));
    }, [value]);

    return (
        <Select
            {...props}
            styles={{
                control: (base, state) => ({
                    ...base,

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
                menuList: (base) => ({
                    ...base,
                    '::-webkit-scrollbar-thumb': {
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: '4px',
                    },
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
            value={orderedValues}
            options={options}
            onChange={onChange}
            isClearable={value.some((item) => !fixed?.includes(item.value))}
        />
    );
}
