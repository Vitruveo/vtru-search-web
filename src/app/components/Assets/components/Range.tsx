import { Slider } from '@mui/material';
import { useRef, useState } from 'react';

interface RangeProps {
    afterChange?: (minValue: number, maxValue: number) => void;
}

const max = 1000;
const min = 0;
const half = max / 2;
const step = 10;

const marks = [
    {
        value: min,
        label: `${min}`,
    },
    {
        value: half,
        label: `${half}`,
    },

    {
        value: max,
        label: `${max}`,
    },
];

export const Range = ({ afterChange }: RangeProps) => {
    const [minValue, setMinValue] = useState(300);
    const [maxValue, setMaxValue] = useState(700);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const onChange = (event: Event, newValue: number | number[]) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        if (Array.isArray(newValue)) {
            setMinValue(newValue[0]);
            setMaxValue(newValue[1]);
            timeoutRef.current = setTimeout(() => {
              afterChange?.(newValue[0], newValue[1]);
            }, 1000)
        }
    };

    return <Slider value={[minValue, maxValue]} step={step} onChange={onChange} valueLabelDisplay='auto' min={min} max={max} marks={marks} />;
};
