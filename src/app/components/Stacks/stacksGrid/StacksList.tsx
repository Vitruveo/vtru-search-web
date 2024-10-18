import { Stack, StackData } from '@/features/stacks/types';
import { Box, Button, Container, Grid, Pagination, Theme, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useRef } from 'react';
import Select, { SingleValue } from 'react-select';
import '../../Assets/assetsGrid/AssetScroll.css';
import Header from '../../Header';
import StackItem, { StackCardContainer } from './StackItem';

interface StacksProps {
    data: {
        stacks: StackData;
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
        handleCurateStack: () => void;
    };
}

const Stacks = ({ data, actions }: StacksProps) => {
    const theme = useTheme();
    const lgUp = useMediaQuery((mediaQuery: Theme) => mediaQuery.breakpoints.up('lg'));
    const mdUp = useMediaQuery((mediaQuery: Theme) => mediaQuery.breakpoints.up('md'));
    const smUp = useMediaQuery((mediaQuery: Theme) => mediaQuery.breakpoints.up('sm'));

    const topRef = useRef<HTMLDivElement>(null);

    const { onChangePage, onChangeSort, onChangeLimit, handleCurateStack } = actions;
    const { stacks, selectValues, optionsForSelectPage } = data;

    const handleScrollToTop = () => {
        if (topRef.current) {
            topRef.current.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        handleScrollToTop();
    }, [stacks.page]);

    return (
        <Box>
            <Header
                rssOptions={[
                    { flagname: 'JSON', value: 'stacks/json' },
                    { flagname: 'XML', value: 'stacks/xml' },
                ]}
            />
            <Grid container justifyContent="end" alignItems="center" spacing={!smUp ? 11 : 12} width="100%">
                <Grid item display={'flex'} alignItems={'center'} gap={2} mb={6} mt={2}>
                    <Typography variant="h5" color={theme.palette.primary.main} ml={2.5}>
                        Curation is fun and easy. Try it now!
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            width: '150px',
                        }}
                        onClick={handleCurateStack}
                    >
                        Curate Stack
                    </Button>
                </Grid>
            </Grid>
            <Box display="flex" flexWrap="wrap" justifyContent="center" overflow="auto" maxHeight="80vh" ref={topRef}>
                <Box m={2} display={mdUp ? 'flex' : 'none'} justifyContent="space-between" width="100%" mb={8}>
                    <Box display={'flex'} gap={1} alignItems={'center'} ml={1}>
                        <Typography variant="h5">Sort:</Typography>
                        <Select
                            placeholder="Sort"
                            options={[
                                { value: 'latest', label: 'Latest' },
                                { value: 'titleAZ', label: 'Title a-z' },
                                { value: 'titleZA', label: 'Title z-a' },
                                { value: 'CuratorAZ', label: 'Curator a-z' },
                                { value: 'CuratorZA', label: 'Curator z-a' },
                            ]}
                            value={selectValues.sort}
                            onChange={onChangeSort}
                            styles={{
                                control: (base, state) => ({
                                    ...base,
                                    width: '130px',
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
                    <Box display={'flex'} gap={1} alignItems={'center'} mr={9.5}>
                        <Typography variant="h5">Pagination:</Typography>
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
                                    minWidth: '100px',
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
                            placeholder="Select"
                            options={optionsForSelectPage}
                            value={selectValues.page}
                            onChange={onChangePage}
                            styles={{
                                control: (base, state) => ({
                                    ...base,
                                    minWidth: '100px',
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
                </Box>
                <Box
                    width={'100%'}
                    paddingInline={'calc(2vw + 1rem)'}
                    display={'grid'}
                    gridTemplateColumns={'repeat(auto-fill, minmax(250px, auto))'}
                    gap={3}
                >
                    {stacks.data.map((stack: Stack, index: number) => {
                        return (
                            <StackCardContainer key={index}>
                                <StackItem stack={stack} />
                            </StackCardContainer>
                        );
                    })}
                </Box>

                <Box mt={4} mb={2} display={'flex'} justifyContent="center" width="100%" alignItems="center">
                    <Pagination
                        count={stacks.totalPage}
                        page={stacks.page}
                        onChange={(_e, value) => onChangePage({ value: value.toString(), label: value.toString() })}
                        color="primary"
                        size={lgUp ? 'large' : 'medium'}
                    />
                </Box>
                <Box display={'flex'} justifyContent="flex-end" width="100%" mr={11} mb={lgUp ? 4 : 12}>
                    <Button variant="contained" onClick={handleScrollToTop}>
                        Scroll to top
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Stacks;
