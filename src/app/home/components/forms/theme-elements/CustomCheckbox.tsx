import * as React from 'react';
import { styled } from '@mui/material/styles';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: 3,
    width: 19,
    height: 19,
    marginLeft: '4px',
    boxShadow:
        theme.palette.mode === 'dark'
            ? `0 0 0 1px ${theme.palette.grey[200]}`
            : `inset 0 0 0 1px ${theme.palette.grey[300]}`,
    backgroundColor: 'transparent',

    '.Mui-focusVisible &': {
        outline:
            theme.palette.mode === 'dark'
                ? `0px auto ${theme.palette.grey[200]}`
                : `0px auto  ${theme.palette.grey[300]}`,
        outlineOffset: 2,
    },
    'input:hover ~ &': {
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary : theme.palette.primary,
    },
    'input:disabled ~ &': {
        boxShadow: 'none',
        background: theme.palette.grey[100],
    },
}));

const BpCheckedIcon = styled(BpIcon)<{ width?: number; height?: number }>(({ width = 19, height = 19 }) => ({
    boxShadow: 'none',
    width,
    height,
    '&:before': {
        display: 'block',
        width,
        height,
        backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
            " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
            "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
        content: '""',
    },
}));

interface CustomCheckboxProps extends CheckboxProps {
    width?: number;
    height?: number;
}

// Inspired by blueprintjs
function CustomCheckbox(props: CustomCheckboxProps) {
    const { width, height, ...checkboxProps } = props;
    return (
        <Checkbox
            disableRipple
            color={props.color ? props.color : 'default'}
            checkedIcon={
                <BpCheckedIcon
                    width={width}
                    height={height}
                    sx={{
                        backgroundColor: props.color ? `${props.color}.main` : 'primary.main',
                    }}
                />
            }
            icon={
                <BpIcon
                    sx={{
                        width: width || 19,
                        height: height || 19,
                        backgroundColor: 'white',
                    }}
                />
            }
            inputProps={{ 'aria-label': 'Checkbox demo' }}
            {...props}
        />
    );
}

export default CustomCheckbox;
