import Async from 'react-select/async';
import { ActionMeta, GroupBase, OptionProps, StylesConfig } from 'react-select';
import { api } from '@/services/api';
import { CountOptionLabel } from './CountOptionLabel';
import { Option } from '../types';
import { MultiValue } from 'react-select';
import { debounce } from 'lodash';
import { CSSProperties } from 'react';
import { useTheme } from '@mui/material/styles';

interface CollectionItem {
    count: number;
    collection: string;
}

interface SubjectItem {
    count: number;
    subject: string;
}

interface LoadItemResponse {
    data: CollectionItem[] | SubjectItem[];
}

interface AsyncSelectProps {
    onChange: (newValue: MultiValue<Option>, actionMeta: ActionMeta<Option>) => void;
    endpoint?: string;
    defaultValue?: Option[];
    showAdditionalAssets?: boolean;
}

export const AsyncSelect = ({ onChange, defaultValue, endpoint, showAdditionalAssets = false }: AsyncSelectProps) => {
    const theme = useTheme();
    const fetchOptions = async (inputValue: string): Promise<Option[]> => {
        if (inputValue.length < 3 || !endpoint) {
            return [];
        }

        try {
            const res = await api.get<LoadItemResponse>(endpoint, {
                params: { name: inputValue, showAdditionalAssets },
            });

            const { data } = res.data;

            if ((data[0] as CollectionItem)?.collection) {
                const collectionItems = (data as CollectionItem[]).map((item) => ({
                    value: item.collection,
                    label: item.collection,
                    count: item.count,
                }));
                return collectionItems;
            }

            const subjectItems = (data as SubjectItem[]).map((item) => ({
                value: item.subject,
                label: item.subject,
                count: item.count,
            }));
            return subjectItems;
        } catch (error) {
            return [];
        }
    };

    // implentação foi feita usando callback para que o debounce funcione corretamente.
    const loadOptions = (inputValue: string, callback: (options: Option[]) => void) => {
        fetchOptions(inputValue).then((options) => {
            callback(options);
        });
    };

    const debouncedLoadOptions = debounce(loadOptions, 500);

    return (
        <Async
            components={{ Option: AsyncSelectOption }}
            onChange={onChange}
            // defaultValue={defaultValue}
            value={defaultValue}
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
                multiValue: (base) => ({
                    ...base,
                    backgroundColor: theme.palette.action.selected,
                }),
                multiValueLabel: (base) => ({
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
            isMulti
            defaultOptions
            loadOptions={endpoint ? debouncedLoadOptions : undefined}
        />
    );
};

const AsyncSelectOption = (props: OptionProps<Option>) => {
    const { data, getStyles, innerRef, innerProps } = props;

    return (
        <div style={getStyles('option', props) as CSSProperties}>
            <CountOptionLabel ref={innerRef} count={data.count} label={data.label as string} {...innerProps} />
        </div>
    );
};
