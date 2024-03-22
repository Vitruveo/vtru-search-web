import React from 'react';
import { styled } from '@mui/material/styles';
import { TextField, TextFieldProps } from '@mui/material';

const CustomTextField = styled((props: TextFieldProps) => <TextField {...props} />)(({ theme }) => ({
    '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
        color: theme.palette.text.secondary,
        opacity: '0.8',
    },
    '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
        color: theme.palette.text.secondary,
        opacity: '1',
    },
    '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.grey[200],
    },
}));

export const CustomTextFieldYellow = styled((props: TextFieldProps) => <TextField {...props} />)(({ theme }) => ({
    borderColor: `yellow !important`,
    '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
        color: theme.palette.text.secondary,
        borderColor: `yellow !important`,
        opacity: '0.8',
    },
    '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
        color: theme.palette.text.secondary,
        borderColor: `yellow !important`,
        opacity: '1',
    },
    '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
        borderColor: `yellow !important`,
    },
}));

export default CustomTextField;
