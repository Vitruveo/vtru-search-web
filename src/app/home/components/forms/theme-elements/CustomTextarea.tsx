import { TextareaAutosize, TextareaAutosizeProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CustomTextareaAutosize = styled(TextareaAutosize)(({ theme }) => ({
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
    '& .MuiInputBase-input': {
        color: theme.palette.text.secondary,
        opacity: '0.8',
    },
    '&.Mui-disabled .MuiInputBase-input': {
        color: theme.palette.text.secondary,
        opacity: '1',
    },
    '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.grey[200],
    },
}));
