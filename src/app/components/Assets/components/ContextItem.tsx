import { Box, Typography } from '@mui/material';
import { useI18n } from '@/app/hooks/useI18n';
import { InputSelect } from './InputSelect';
import { InputText } from './InputText';
import { InputColor } from './InputColor';
import { Colors } from './Colors';
import type { ContextItem, Option } from '../types';
import { convertHEXtoRGB } from '@/utils/colors';
import { useDispatch } from '@/store/hooks';
import { actions } from '@/features/filters/slice';
import generateQueryParam from '@/utils/generateQueryParam';

export function ContextItem({
    title,
    values,
    hidden,
    type,
    options,
    onChange,
    onRemove,
    disabledPrecision = false,
    fixedOptions,
}: ContextItem) {
    const dispatch = useDispatch();
    const { language } = useI18n();
    const context = 'search.assetFilter.context';

    const afterColorPrecisionChange = (value: number) => {
        generateQueryParam('precision', value.toString());
        dispatch(actions.changeColorPrecision(value));
    };

    return (
        <Box mb={2}>
            {!hidden && (
                <Typography fontSize="0.85rem" fontWeight="700" mb={1}>
                    {language[`${context}.title.${title}`] as string}
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
                    fixed={fixedOptions}
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
                    fixed={fixedOptions}
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
                        onClick={(hex) => onChange([...(values['context'][title] as string[]), convertHEXtoRGB(hex)])}
                        afterPrecisionChange={afterColorPrecisionChange}
                        disabled={disabledPrecision}
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
