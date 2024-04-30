import Async from 'react-select/async';
import { api } from '@/services/api';
import { CountOptionLabel } from './CountOptionLabel';
import { Option } from '../types';
import { MultiValue } from 'react-select';
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
    onChange: (option: MultiValue<Option>) => void;
    endpoint?: string;
    defaultValue?: Option[];
}

export const AsyncSelect = (props: AsyncSelectProps) => {
    const { endpoint } = props;

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

    const loadOptions = (inputValue: string, callback: any) => {
        fetchOptions(inputValue).then((options) => {
            callback(options);
        });
    };

    const debouncedLoadOptions = debounce(loadOptions, 500);

    return <Async {...props} isMulti defaultOptions loadOptions={props.endpoint ? debouncedLoadOptions : undefined} />;
};
