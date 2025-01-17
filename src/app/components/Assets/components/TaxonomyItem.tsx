import { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { useI18n } from '@/app/hooks/useI18n';
import { InputSelect } from './InputSelect';
import { InputText } from './InputText';
import { CountOptionLabel } from './CountOptionLabel';
import type { TaxonomyItem, Option } from '../types';
import { AsyncSelect } from './AsyncSelect';
import { useSelector } from '@/store/hooks';

export function TaxonomyItem({
    title,
    values,
    tags,
    hidden,
    type,
    options,
    onChange,
    loadOptionsEndpoint,
    fixedOptions,
}: TaxonomyItem) {
    const { language } = useI18n();
    const taxonomy = 'search.assetFilter.taxonomy';
    const showAdditionalAssets = useSelector((state) => state.filters.showAdditionalAssets.value);

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
                    fixed={fixedOptions}
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
                    fixed={fixedOptions}
                />
            )}

            {typeof values['taxonomy'][title] === 'string' && type === 'textarea' && (
                <InputText
                    name={title}
                    value={values['taxonomy'][title] as unknown as string}
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
                    fixed={fixedOptions}
                />
            )}

            {typeof values['taxonomy'][title] === 'string' && type === 'text' && (
                <InputText
                    name={title}
                    value={values['taxonomy'][title] as unknown as string}
                    onChange={(event) => onChange(event.target.value)}
                />
            )}

            {type === 'async-select' && (
                <AsyncSelect
                    endpoint={loadOptionsEndpoint}
                    onChange={(items) => {
                        onChange(items.map((item) => item.value));
                    }}
                    defaultValue={(values['taxonomy'][title] ? (values['taxonomy'][title] as string[]) : []).map(
                        (item: string) => ({
                            value: item,
                            label: item,
                        })
                    )}
                    showAdditionalAssets={showAdditionalAssets}
                    fixedOptions={fixedOptions}
                />
            )}
        </Box>
    );
}
