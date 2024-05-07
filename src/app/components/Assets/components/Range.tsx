import { useSelector } from '@/store/hooks';
import { Slider } from '@mui/material';
import { useRef } from 'react';
import { store } from '@/store';

interface RangeProps {
    afterChange?: (minValue: number, maxValue: number) => void;
}

const max = store.getState().assets.maxPrice;
const min = 0;
const half = max / 2;
const step = 10;

const marks = [
    {
        value: min,
        label: `$ ${min}`,
    },
    {
        value: half,
        label: `$ ${half}`,
    },

    {
        value: max,
        label: `$ ${max}`,
    },
];

export const Range = ({ afterChange }: RangeProps) => {
    const price = useSelector((state) => state.filters.price);
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

    return (
        <Slider
            key={Date.now()} // Remontando o componente para que ele utilize o defaulValue como se fosse um value
            defaultValue={[price.min, price.max]}
            step={step}
            onChange={onChange}
            valueLabelDisplay="auto"
            min={min}
            max={max}
            marks={marks}
        />
    );
};
