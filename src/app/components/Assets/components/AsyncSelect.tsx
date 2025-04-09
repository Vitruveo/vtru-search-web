import Async from 'react-select/async';
import { ActionMeta, OptionProps } from 'react-select';
import { api } from '@/services/api';
import { CountOptionLabel } from './CountOptionLabel';
import { Option, Tag } from '../types';
import { MultiValue } from 'react-select';
import { debounce } from 'lodash';
import { CSSProperties, useEffect, useState } from 'react';
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
    data: CollectionItem[] | SubjectItem[] | Tag[];
}

interface AsyncSelectProps {
    onChange: (newValue: MultiValue<Option>, actionMeta: ActionMeta<Option>) => void;
    endpoint?: string;
    defaultValue?: Option[];
    showAdditionalAssets?: boolean;
    fixedOptions?: string[];
    defaultOptions: Option[];
}

export const AsyncSelect = ({
    onChange,
    defaultValue,
    endpoint,
    showAdditionalAssets = false,
    fixedOptions,
    defaultOptions,
}: AsyncSelectProps) => {
    const theme = useTheme();
    const [orderedValues, setOrderedValues] = useState(defaultValue);

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

            if ((data[0] as Tag)?.tag) {
                const tagItems = (data as Tag[]).map((item) => ({
                    value: item.tag,
                    label: item.tag,
                    count: item.count,
                }));
                return tagItems;
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

    useEffect(() => {
        if (defaultValue) {
            setOrderedValues(
                [...defaultValue].sort((a, b) => {
                    if (typeof a.label === 'string' && typeof b.label === 'string') {
                        return a.label.localeCompare(b.label);
                    }
                    return 0;
                })
            );
        }
    }, [defaultValue]);

    return (
        <Async
            components={{ Option: AsyncSelectOption }}
            onChange={onChange}
            value={orderedValues}
            styles={{
                control: (base, state) => ({
                    ...base,
                    minWidth: '240px',
                    maxHeight: '200px',
                    overflow: 'auto',
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
                    display: fixedOptions?.includes(state.data.value) ? 'none' : 'inherit',
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
            defaultOptions={defaultOptions}
            loadOptions={endpoint ? debouncedLoadOptions : undefined}
            isClearable={defaultValue?.some((item) => !fixedOptions?.includes(item.value))}
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
