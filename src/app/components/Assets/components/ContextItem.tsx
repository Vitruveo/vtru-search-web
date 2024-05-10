import { ReactNode, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { debounce } from 'lodash';

import { useI18n } from '@/app/hooks/useI18n';
import { InputSelect } from './InputSelect';
import { InputText } from './InputText';
import { InputColor } from './InputColor';
import { Colors } from './Colors';
import type { ContextItem, Option } from '../types';

export function ContextItem({ title, values, hidden, type, options, onChange, onRemove }: ContextItem) {
    const { language } = useI18n();
    const context = 'search.assetFilter.context';

    const [color, setColor] = useState('#000000');

    const debounceColor = debounce((value) => {
        setColor(value);
    }, 500);

    return (
        <Box mb={2}>
            {!hidden && (
                <Typography fontSize="0.85rem" fontWeight="700" mb={1}>
                    {language[`${context}.title.${title}`] as ReactNode}
                </Typography>
            )}

            {type === 'radios' && (
                <InputSelect
                    value={(values['context'][title] as string[]).map((item) => ({
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
                    value={(values['context'][title] as string[]).map((item) => ({
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
                    value={values['context'][title] as string}
                    onChange={(event) => onChange(event.target.value)}
                />
            )}

            {type === 'color' && (
                <Box>
                    <InputColor
                        name={title}
                        onChange={(event) => debounceColor(event.target.value)}
                        onClick={() => onChange([...(values['context'][title] as string[]), color])}
                    />

                    <Colors colors={values['context'][title] as string[]} onRemove={(item) => onRemove(item)} />
                </Box>
            )}

            {type === 'text' && (
                <InputText
                    name={title}
                    value={values['context'][title] as string}
                    onChange={(event) => onChange(event.target.value)}
                />
            )}
        </Box>
    );
}
