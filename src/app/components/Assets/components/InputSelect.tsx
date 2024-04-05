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
                    borderColor: state.isFocused ? '#00d6f4' : '#E0E0E0',
                    boxShadow: '#00d6f4',
                    '&:hover': {
                        borderColor: '#00d6f4',
                    },
                }),
            }}
            value={value}
            options={options}
            onChange={onChange}
        />
    );
}
