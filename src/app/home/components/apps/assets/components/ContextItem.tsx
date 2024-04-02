import { Box, Typography } from '@mui/material';
import { InputSelect } from './InputSelect';
import { InputText } from './InputText';
import { InputColor } from './InputColor';
import { Colors } from './Colors';
import { debounce } from 'lodash';
import { useState } from 'react';

interface Props {
    context: string;
    title: string;
    type: string;
    values: {
        context: {
            [key: string]: any;
        };
    };
    tags: string[];
    hidden: boolean;
    options: string[];
    onChange: (value: any) => void;
    onRemove: (color: string) => void;
}

interface Option {
    value: string;
    label: string;
}

export function ContextItem({ context, title, values, tags, hidden, type, options, onChange, onRemove }: Props) {
    const [color, setColor] = useState('#000000');

    const debounceColor = debounce((value) => {
        setColor(value);
    }, 500);

    return (
        <Box mb={2}>
            {!hidden && (
                <Typography fontSize="0.85rem" fontWeight="700" mb={1}>
                    {title?.charAt(0).toUpperCase() + title?.slice(1)}
                </Typography>
            )}

            {type === 'radios' && (
                <InputSelect
                    value={values[context][title]?.map((item: string) => ({
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
                    value={values[context][title]?.map((item: string) => ({
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
                    value={values[context][title]}
                    onChange={(event) => onChange(event.target.value)}
                />
            )}

            {type === 'color' && (
                <Box>
                    <InputColor
                        name={title}
                        onChange={(event) => debounceColor(event.target.value)}
                        onClick={() => onChange([...values[context][title], color])}
                    />

                    <Colors colors={values[context][title]} onRemove={(color) => onRemove(color)} />
                </Box>
            )}

            {type === 'tags' && (
                <InputSelect
                    value={(values[context][title] ? values[context][title] : []).map((item: string) => ({
                        value: item,
                        label: item,
                    }))}
                    options={tags.map((item) => ({
                        label: `${item.tag} - ${item.count}`,
                        value: item.tag,
                    }))}
                    onChange={(option: Option[]) => onChange(option.map((item) => item.value))}
                />
            )}

            {type === 'text' && (
                <InputText
                    name={title}
                    value={values[context][title]}
                    onChange={(event) => onChange(event.target.value)}
                />
            )}
        </Box>
    );
}
