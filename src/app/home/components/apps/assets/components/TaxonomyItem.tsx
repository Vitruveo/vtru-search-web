import { Badge, Box, Typography } from '@mui/material';
import { InputSelect } from './InputSelect';
import { InputText } from './InputText';
import { TaxonomyItem, Option } from '../assetsFilter/types';
import { useI18n } from '@/app/hooks/useI18n';
import { ReactNode } from 'react';

export function TaxonomyItem({ title, values, tags, hidden, type, options, onChange }: TaxonomyItem) {
    const { language } = useI18n();
    const taxonomy = 'studio.assetFilter.taxonomy';

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
                    value={(values['taxonomy'][title] as string)}
                    onChange={(event) => onChange(event.target.value)}
                />
            )}

            {type === 'tags' && (
                <InputSelect
                    value={(values['taxonomy'][title] ? values['taxonomy'][title] as string[] : []).map((item: string) => ({
                        value: item,
                        label: item,
                    }))}
                    options={tags.map((item) => ({
                        label: (
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Typography>{item.tag}</Typography>{' '}
                                <Badge
                                    badgeContent={item.count}
                                    color="primary"
                                    sx={{ mr: 1 }}
                                />
                            </Box>
                        ),
                        value: item.tag,
                    }))}
                    onChange={(option: Option[]) => onChange(option.map((item) => item.value))}
                />
            )}

            {type === 'text' && (
                <InputText
                    name={title}
                    value={(values['taxonomy'][title] as string)}
                    onChange={(event) => onChange(event.target.value)}
                />
            )}
        </Box>
    );
}
