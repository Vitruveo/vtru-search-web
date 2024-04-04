import Select from 'react-select';
import { InputSelect } from '../assetsFilter/types';

export function InputSelect({ value, options, onChange }: InputSelect) {
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
