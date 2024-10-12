import { Stack, StackData } from '@/features/stacks/types';
import { Box, Pagination, Typography } from '@mui/material';
import StackItem, { StackCardContainer } from './StackItem';
import { useTheme } from '@mui/material/styles';
import Select, { SingleValue } from 'react-select';
import { optionsForSelectSort } from '@/app/stacks/page';
import AllProjectsMenu from '../../AllProjectsMenu';
import Logo from '../../Shared/Logo';
import { Rss } from '../../Rss';

interface StacksProps {
    data: {
        stacks: any;
        selectValues: {
            limit: { value: string; label: string };
            page: { value: string; label: string };
            sort: { value: string; label: string };
        };
        optionsForSelectPage: { value: string; label: string }[];
    };
    actions: {
        onChangeSort: (
            e: SingleValue<{
                value: string;
                label: string;
            }>
        ) => void;
        onChangePage: (
            e: SingleValue<{
                value: string;
                label: string;
            }>
        ) => void;
        onChangeLimit: (
            e: SingleValue<{
                value: string;
                label: string;
            }>
        ) => void;
    };
}

const Stacks = ({ data, actions }: StacksProps) => {
    const theme = useTheme();
    const lgUp = theme.breakpoints.up('lg');

    const { onChangePage, onChangeSort, onChangeLimit } = actions;
    const { stacks, selectValues, optionsForSelectPage } = data;

    const tempData = stacks as unknown as StackData;
    return (
        <Box>
            <Logo />
            <Rss />
            <AllProjectsMenu />
            <Box display={'flex'} justifyContent={'space-between'}>
                <Box display={'flex'} alignItems={'center'} gap={2}>
                    <Typography variant="h4">Sort:</Typography>
                    <Select
                        placeholder="Sort"
                        options={optionsForSelectSort}
                        value={selectValues.sort}
                        onChange={onChangeSort}
                        styles={{
                            control: (base, state) => ({
                                ...base,
                                minWidth: '240px',
                                maxWidth: lgUp ? '' : '150px',
                                borderColor: state.isFocused ? theme.palette.primary.main : theme.palette.grey[200],
                                backgroundColor: theme.palette.background.paper,
                                boxShadow: '#FF0066',
                                '&:hover': { borderColor: '#FF0066' },
                            }),
                            menu: (base) => ({
                                ...base,
                                zIndex: 1000,
                                color: theme.palette.text.primary,
                                backgroundColor: theme.palette.background.paper,
                            }),
                            singleValue: (base) => ({
                                ...base,
                                color: theme.palette.text.primary,
                            }),
                            option: (base, state) => ({
                                ...base,
                                color: theme.palette.text.primary,
                                backgroundColor: state.isFocused ? theme.palette.action.hover : 'transparent',
                                '&:hover': { backgroundColor: theme.palette.action.hover },
                            }),
                            input: (base) => ({
                                ...base,
                                color: theme.palette.text.primary,
                            }),
                        }}
                    />
                </Box>
                <Typography variant="h4" sx={{ color: theme.palette.text.primary, fontWeight: 700 }}>
                    Curate Stack
                </Typography>
            </Box>
            <Box display={'flex'} gap={1} flexDirection={lgUp ? 'row' : 'column'}>
                <Select
                    placeholder="Page Items"
                    options={[
                        { value: '25', label: '25' },
                        { value: '50', label: '50' },
                        { value: '100', label: '100' },
                        { value: '150', label: '150' },
                        { value: '200', label: '200' },
                    ]}
                    value={selectValues.limit}
                    onChange={onChangeLimit}
                    styles={{
                        control: (base, state) => ({
                            ...base,
                            minWidth: '250px',
                            borderColor: state.isFocused ? theme.palette.primary.main : theme.palette.grey[200],
                            backgroundColor: theme.palette.background.paper,
                            boxShadow: '#FF0066',
                            '&:hover': { borderColor: '#FF0066' },
                        }),
                        menu: (base) => ({
                            ...base,
                            zIndex: 1000,
                            color: theme.palette.text.primary,
                            backgroundColor: theme.palette.background.paper,
                        }),
                        singleValue: (base) => ({
                            ...base,
                            color: theme.palette.text.primary,
                        }),
                        option: (base, state) => ({
                            ...base,
                            color: theme.palette.text.primary,
                            backgroundColor: state.isFocused ? theme.palette.action.hover : 'transparent',
                            '&:hover': { backgroundColor: theme.palette.action.hover },
                        }),
                        input: (base) => ({
                            ...base,
                            color: theme.palette.text.primary,
                        }),
                    }}
                />
                <Select
                    placeholder="Select Page"
                    options={optionsForSelectPage}
                    value={selectValues.page}
                    onChange={onChangePage}
                    styles={{
                        control: (base, state) => ({
                            ...base,
                            minWidth: '250px',
                            borderColor: state.isFocused ? theme.palette.primary.main : theme.palette.grey[200],
                            backgroundColor: theme.palette.background.paper,
                            boxShadow: '#FF0066',
                            '&:hover': { borderColor: '#FF0066' },
                        }),
                        menu: (base) => ({
                            ...base,
                            zIndex: 1000,
                            color: theme.palette.text.primary,
                            backgroundColor: theme.palette.background.paper,
                        }),
                        singleValue: (base) => ({
                            ...base,
                            color: theme.palette.text.primary,
                        }),
                        option: (base, state) => ({
                            ...base,
                            color: theme.palette.text.primary,
                            backgroundColor: state.isFocused ? theme.palette.action.hover : 'transparent',
                            '&:hover': { backgroundColor: theme.palette.action.hover },
                        }),
                        input: (base) => ({
                            ...base,
                            color: theme.palette.text.primary,
                        }),
                    }}
                />
            </Box>
            <Box
                display="flex"
                flexWrap="wrap"
                overflow={'auto'}
                justifyContent="center"
                alignItems="center"
                gap={4}
                p={2}
                maxHeight={'80vh'}
            >
                {tempData.data.map((stack: Stack, index) => {
                    return (
                        <StackCardContainer key={index}>
                            <StackItem stack={stack} />
                        </StackCardContainer>
                    );
                })}
                <Box mt={4} mb={2} justifyContent="center" width="100%" alignItems="center">
                    <Pagination
                        count={tempData.totalPage}
                        page={tempData.page}
                        onChange={(_e, value) => onChangePage({ value: value.toString(), label: value.toString() })}
                        color="primary"
                        size={lgUp ? 'large' : 'medium'}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Stacks;
