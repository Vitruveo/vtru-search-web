import { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

import { useI18n } from '@/app/hooks/useI18n';
import { InputSelect } from './InputSelect';
import { InputText } from './InputText';
import type { CreatorsItem, Option } from '../types';

export function CreatorsItem({ title, values, hidden, type, options, onChange }: CreatorsItem) {
    const { language } = useI18n();
    const creators = 'studio.assetFilter.creators';

    return (
        <Box mb={2}>
            {!hidden && (
                <Typography fontSize="0.85rem" fontWeight="700" mb={1}>
                    {language[`${creators}.title.${title}`] as ReactNode}
                </Typography>
            )}

            {type === 'radios' && (
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
        </Box>
    );
}
