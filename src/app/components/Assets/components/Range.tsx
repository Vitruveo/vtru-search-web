import { useSelector } from '@/store/hooks';
import { Box, Slider, Stack, Typography } from '@mui/material';
import { useRef } from 'react';
import { formatPrice } from '@/utils/assets';

interface RangeProps {
    afterChange?: (minValue: number, maxValue: number) => void;
}

export const Range = ({ afterChange }: RangeProps) => {
    const price = useSelector((state) => state.filters.price);
    const max = useSelector((state) => state.assets.maxPrice);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const onChange = (event: Event, newValue: number | number[]) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        if (newValue instanceof Array) {
            timeoutRef.current = setTimeout(() => {
                afterChange?.(newValue[0], newValue[1]);
            }, 1000);
        }
    };

    const marks = [
        {
            value: 0,
            label: '',
        },
        {
            value: max,
            label: '',
        },
    ];

    return (
        <Box>
            <Slider
                key={Date.now()} // Remontando o componente para que ele utilize o defaulValue como se fosse um value
                defaultValue={[price.min, price.max]}
                step={10}
                onChange={onChange}
                valueLabelDisplay="auto"
                min={0}
                max={max}
                marks={marks}
            />
            <Stack direction="row" justifyContent="space-between" p={0}>
                <Typography fontSize={11}>{formatPrice(0)}</Typography>
                <Typography fontSize={11}>{formatPrice(max)}</Typography>
            </Stack>
        </Box>
    );
};
