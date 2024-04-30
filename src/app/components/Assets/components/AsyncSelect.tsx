import Async from 'react-select/async';
import { ActionMeta, GroupBase, StylesConfig } from 'react-select';
import { api } from '@/services/api';
import { CountOptionLabel } from './CountOptionLabel';
import { Option } from '../types';
import { MultiValue, Props } from 'react-select';
import { debounce } from 'lodash';

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
}

const styles: StylesConfig<Option, true, GroupBase<Option>> = {
    control: (base, state) => ({
        ...base,
        width: '100%',
        borderColor: state.isFocused ? '#00d6f4' : '#E0E0E0',
        boxShadow: '#00d6f4',
        '&:hover': {
            borderColor: '#00d6f4',
        },
    }),
};

export const AsyncSelect = ({ onChange, defaultValue, endpoint }: AsyncSelectProps) => {
    const fetchOptions = async (inputValue: string): Promise<Option[]> => {
        if (inputValue.length < 3 || !endpoint) {
            return [];
        }

        try {
            const res = await api.get<LoadItemResponse>(endpoint, {
                params: { name: inputValue },
            });

            const { data } = res.data;

            if ((data[0] as CollectionItem)?.collection) {
                const collectionItems = (data as CollectionItem[]).map((item) => ({
                    value: item.collection,
                    label: <CountOptionLabel count={item.count} label={item.collection} />,
                }));
                return collectionItems;
            }

            const subjectItems = (data as SubjectItem[]).map((item) => ({
                value: item.subject,
                label: <CountOptionLabel count={item.count} label={item.subject} />,
            }));
            return subjectItems;
        } catch (error) {
            return [];
        }
    };

    // implentação foi feita usando callback para que o debounce funcione corretamente.
    const loadOptions = (inputValue: string, callback: any) => {
        fetchOptions(inputValue).then((options) => {
            callback(options);
        });
    };

    const debouncedLoadOptions = debounce(loadOptions, 500);

    return (
        <Async
            onChange={onChange}
            defaultValue={defaultValue}
            styles={styles}
            isMulti
            defaultOptions
            loadOptions={endpoint ? debouncedLoadOptions : undefined}
        />
    );
};
