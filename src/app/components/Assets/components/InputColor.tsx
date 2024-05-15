import { useSelector } from '@/store/hooks';
import { Box, Button, Slider, Stack, Typography } from '@mui/material';
import { useRef } from 'react';
interface Props {
    name: string;
    onClick: (color: string) => void;
    afterPrecisionChange?: (value: number) => void;
}

const min = 0;
const max = 100;

const marks = [
    {
        value: min,
        label: '',
    },
    {
        value: max,
        label: '',
    },
];

export function InputColor({ name, onClick, afterPrecisionChange }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const defaultPrecisionValue = useSelector((state) => state.filters.colorPrecision.value);

    const handleAddColor = () => {
        if (inputRef.current) {
            onClick(inputRef.current.value);
        }
    };

    const onChange = (event: Event, newValue: number | number[]) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            afterPrecisionChange?.((newValue as number) / 100);
        }, 1000);
    };

    return (
        <Stack gap={2}>
            <Box>
                <Typography>Precision</Typography>
                <Box px={1}>
                    <Slider
                        key={Date.now()}
                        onChange={onChange}
                        min={min}
                        max={max}
                        defaultValue={defaultPrecisionValue * 100}
                        marks={marks}
                        step={10}
                        valueLabelDisplay="auto"
                    />
                    <Box display="flex" justifyContent="space-between">
                        <Typography fontSize={11}>{min + '%'}</Typography>
                        <Typography fontSize={11}>{max + '%'}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box width="100%" display="flex" justifyContent="space-between">
                <input ref={inputRef} type="color" id={name} name={name} />
                <Button onClick={handleAddColor}>Add Color</Button>
            </Box>
        </Stack>
    );
}
