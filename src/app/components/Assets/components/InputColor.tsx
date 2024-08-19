import { useSelector } from '@/store/hooks';
import { Box, Button, Slider, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRef } from 'react';
interface Props {
    name: string;
    onClick: (color: string) => void;
    afterPrecisionChange?: (value: number) => void;
}

export const minPrecision = 0;
export const maxPrecision = 100;

export function InputColor({ name, onClick, afterPrecisionChange }: Props) {
    const theme = useTheme();
    const inputRef = useRef<HTMLInputElement>(null);
    const defaultPrecisionValue = useSelector((state) => state.filters.colorPrecision.value);
    const reseted = useSelector((state) => state.filters.reseted);

    const handleAddColor = () => {
        if (inputRef.current) {
            onClick(inputRef.current.value);
        }
    };

    const onChange = (_event: Event, newValue: number | number[]) => {
        afterPrecisionChange?.((newValue as number) / 100);
    };

    return (
        <Stack gap={2}>
            <Box>
                <Typography>Precision</Typography>
                <Box px={1}>
                    <Slider
                        key={reseted}
                        defaultValue={defaultPrecisionValue * 100}
                        onChange={onChange}
                        min={minPrecision}
                        max={maxPrecision}
                        step={10}
                        valueLabelDisplay="auto"
                        sx={{
                            color: theme.palette.primary.main,
                            '& .MuiSlider-valueLabel': {
                                backgroundColor: theme.palette.secondary.main,
                                color: theme.palette.common.white,
                            },
                        }}
                    />
                    <Box display="flex" justifyContent="space-between">
                        <Typography fontSize={11}>{minPrecision + '%'}</Typography>
                        <Typography fontSize={11}>{maxPrecision + '%'}</Typography>
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
