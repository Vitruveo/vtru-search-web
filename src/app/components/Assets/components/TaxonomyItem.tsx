import { ReactNode } from 'react';
import { Badge, Box, Typography } from '@mui/material';
import Async from 'react-select/async';
import { useI18n } from '@/app/hooks/useI18n';
import { InputSelect } from './InputSelect';
import { InputText } from './InputText';
import type { TaxonomyItem, Option } from '../types';
import { api } from '@/services/api';
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

interface CountOptionLabelProps {
    label: string;
    count: number;
}

const CountOptionLabel = ({ label, count }: CountOptionLabelProps) => {
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography>{label.toLowerCase()}</Typography> <Badge badgeContent={count} color="primary" sx={{ mr: 1 }} />
        </Box>
    );
};

export function TaxonomyItem({
    title,
    values,
    tags,
    hidden,
    type,
    options,
    onChange,
    loadOptionsEndpoint,
}: TaxonomyItem) {
    const { language } = useI18n();
    const taxonomy = 'search.assetFilter.taxonomy';

    // Verificar por quê o componente fica carregando quando usamos o debounce
    const debouncedLoadOptions = debounce(async (inputValue: string) => {
        if (!loadOptionsEndpoint || inputValue.length < 3) {
            return [];
        }

        try {
            const res = await api.get<LoadItemResponse>(loadOptionsEndpoint, {
                params: { name: inputValue },
            });

            const { data } = res.data;

            if ((data[0] as CollectionItem).collection) {
                const collectionItems = (data as CollectionItem[]).map((item) => ({
                    value: item.collection,
                    label: <CountOptionLabel count={item.count} label={item.collection} />,
                }));
                return collectionItems;
            } else if ((data[0] as SubjectItem).subject) {
                const subjectItems = (data as SubjectItem[]).map((item) => ({
                    value: item.subject,
                    label: <CountOptionLabel count={item.count} label={item.subject} />,
                }));
                return subjectItems;
            }

            return [];
        } catch (error) {
            return [];
        }
    }, 500);


    return (
        <Box mb={2}>
            {!hidden && (
                <Typography fontSize="0.85rem" fontWeight="700" mb={1}>
                    {language[`${taxonomy}.title.${title}`] as ReactNode}
                </Typography>
            )}

            {type === 'radios' && (
                <InputSelect
                    value={(values['taxonomy'][title] as string[]).map((item) => ({
                        value: item,
                        label: item,
                    }))}
                    options={options.map((item) => ({
                        value: item,
                        label: item,
                    }))}
                    onChange={(option: Option[]) => onChange(option.map((item) => item.value))}
                />
            )}

            {type === 'checkboxes' && (
                <InputSelect
                    value={(values['taxonomy'][title] as string[]).map((item) => ({
                        value: item,
                        label: item,
                    }))}
                    options={options.map((item) => ({
                        value: item,
                        label: item,
                    }))}
                    onChange={(option: Option[]) => onChange(option.map((item) => item.value))}
                />
            )}

            {type === 'textarea' && (
                <InputText
                    name={title}
                    value={values['taxonomy'][title] as string}
                    onChange={(event) => onChange(event.target.value)}
                />
            )}

            {type === 'tags' && (
                <InputSelect
                    value={(values['taxonomy'][title] ? (values['taxonomy'][title] as string[]) : []).map(
                        (item: string) => ({
                            value: item,
                            label: item,
                        })
                    )}
                    options={tags.map((item) => ({
                        label: <CountOptionLabel count={item.count} label={item.tag} />,
                        value: item.tag,
                    }))}
                    onChange={(option: Option[]) => onChange(option.map((item) => item.value))}
                />
            )}

            {type === 'text' && (
                <InputText
                    name={title}
                    value={values['taxonomy'][title] as string}
                    onChange={(event) => onChange(event.target.value)}
                />
            )}

            {type === 'async-select' && (
                <Async
                    isMulti
                    loadOptions={debouncedLoadOptions as any}
                    onChange={(opt) => {
                        onChange(opt.map((item) => item.value));
                    }}
                    defaultValue={(values['taxonomy'][title] ? (values['taxonomy'][title] as string[]) : []).map(
                        (item: string) => ({
                            value: item,
                            label: item,
                        })
                    )}
                />
            )}
        </Box>
    );
}
