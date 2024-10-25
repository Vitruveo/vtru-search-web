import { Box, Slider, Stack, Typography } from '@mui/material';
import { formatPrice } from '@/utils/assets';
import { useSelector } from '@/store/hooks';
import { useTheme } from '@mui/material/styles';

interface RangeProps {
    afterChange?: (minValue: number, maxValue: number) => void;
}

export const minPrice = 0;
export const maxPrice = 10000;

export const Range = ({ afterChange }: RangeProps) => {
    const theme = useTheme();
    const max = useSelector((state) => state.assets.maxPrice);
    const { reseted, price } = useSelector((state) => state.filters);

    const onChange = (_event: Event | null, newValue: number | number[]) => {
        if (!Array.isArray(newValue)) return;

        const [start, end] = newValue;

        afterChange?.(start, end);
    };

    return (
        <Box>
            <Slider
                key={reseted}
                defaultValue={[minPrice, minPrice]}
                value={[price.min, price.max === max ? minPrice : price.max]}
                step={10}
                onChange={onChange}
                valueLabelDisplay="auto"
                min={minPrice}
                max={maxPrice}
                sx={{
                    color: theme.palette.primary.main,
                    '& .MuiSlider-valueLabel': {
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.common.white,
                    },
                }}
            />
            <Stack direction="row" justifyContent="space-between" p={0}>
                <Typography fontSize={11}>{formatPrice({ price: minPrice })}</Typography>
                <Typography fontSize={11}>{formatPrice({ price: maxPrice })}</Typography>
            </Stack>
        </Box>
    );
};
