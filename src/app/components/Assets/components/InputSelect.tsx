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
    return (
        <Select
            isMulti
            styles={{
                control: (base, state) => ({
                    ...base,
                    width: '100%',
                    borderColor: state.isFocused ? '#763EBD' : '#E0E0E0',
                    boxShadow: '#763EBD',
                    '&:hover': {
                        borderColor: '#763EBD',
                    },
                }),
            }}
            value={value}
            options={options}
            onChange={onChange}
        />
    );
}
