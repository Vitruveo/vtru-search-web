import { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

import { useI18n } from '@/app/hooks/useI18n';
import { InputSelect } from './InputSelect';
import { InputText } from './InputText';
import type { CreatorsItem, Option } from '../types';
import { AsyncSelect } from './AsyncSelect';
import countriesMapper from '@/utils/countries/mapper';
import { useSelector } from '@/store/hooks';

export function CreatorsItem({ title, values, hidden, type, options, onChange, loadOptionsEndpoint }: CreatorsItem) {
    const { language } = useI18n();
    const showAdditionalAssets = useSelector((state) => state.filters.showAdditionalAssets.value);
    const creators = 'search.assetFilter.creators';

    return (
        <Box mb={2}>
            {!hidden && (
                <Typography fontSize="0.85rem" fontWeight="700" mb={1}>
                    {language[`${creators}.title.${title}`] as ReactNode}
                </Typography>
            )}

            {type === 'radios' && Array.isArray(values['creators'][title]) && (
                <InputSelect
                    value={(values['creators'][title] as string[]).map((item) => ({
                        value: item,
                        label: countriesMapper[item as keyof typeof countriesMapper],
                    }))}
                    options={options.map((item) => ({
                        value: item,
                        label: countriesMapper[item as keyof typeof countriesMapper],
                    }))}
                    onChange={(option: Option[]) => onChange(option.map((item) => item.value))}
                />
            )}

            {type === 'checkboxes' && (
                <InputSelect
                    value={(values['creators'][title] as string[]).map((item) => ({
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
                    value={values['creators'][title] as string}
                    onChange={(event) => onChange(event.target.value)}
                />
            )}

            {type === 'text' && (
                <InputText
                    name={title}
                    value={values['creators'][title] as string}
                    onChange={(event) => onChange(event.target.value)}
                />
            )}

            {type === 'async-select' && (
                <AsyncSelect
                    endpoint={loadOptionsEndpoint}
                    onChange={(items) => {
                        onChange(items.map((item) => item.value));
                    }}
                    defaultValue={(values['creators'][title] ? (values['creators'][title] as string[]) : []).map(
                        (item: string) => ({
                            value: item,
                            label: item,
                        })
                    )}
                    showAdditionalAssets={showAdditionalAssets}
                />
            )}
        </Box>
    );
}
