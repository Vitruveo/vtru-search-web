import { Box, Slider, Stack, Typography } from '@mui/material';
import { formatPrice } from '@/utils/assets';
import { useSelector } from '@/store/hooks';
import { useEffect, useState } from 'react';

interface RangeProps {
    afterChange?: (minValue: number, maxValue: number) => void;
}

export const minPrice = 0;
export const maxPrice = 10000;

export const Range = ({ afterChange }: RangeProps) => {
    const max = useSelector((state) => state.assets.maxPrice);
    const price = useSelector((state) => state.filters.price);
    const [key, setKey] = useState(0);

    useEffect(() => {
        if (price.min === minPrice && price.max === maxPrice) setKey((prev) => prev + 1);
    }, [price.min, price.max]);

    const onChange = (_event: Event | null, newValue: number | number[]) => {
        if (!Array.isArray(newValue)) return;

        const [start, end] = newValue;
        const isReset = start === minPrice && end === minPrice;
        afterChange?.(isReset ? minPrice : start, isReset ? max : end);
    };

    return (
        <Box>
            <Slider
                key={key}
                defaultValue={[minPrice, maxPrice]}
                step={10}
                onChange={onChange}
                valueLabelDisplay="auto"
                min={minPrice}
                max={maxPrice}
            />
            <Stack direction="row" justifyContent="space-between" p={0}>
                <Typography fontSize={11}>{formatPrice(minPrice)}</Typography>
                <Typography fontSize={11}>{formatPrice(maxPrice)}</Typography>
            </Stack>
        </Box>
    );
};
