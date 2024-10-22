import { Stack, StackData } from '@/features/stacks/types';
import { Box, Button, Grid, Pagination, Theme, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useRef } from 'react';
import Select, { SingleValue } from 'react-select';
import '../../Assets/assetsGrid/AssetScroll.css';
import Header from '../../Header';
import { StackCardContainer, StackItem } from './StackItem';

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
                hasSettings={false}
            />
            <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                overflow="auto"
                maxHeight={'100vh'}
                ref={topRef}
            >
                <Box
                    paddingInline="24px"
                    display="flex"
                    alignItems="center"
                    my={2}
                    justifyContent="flex-end"
                    gap={2}
                    width="100%"
                >
                    <Typography variant="h5" color={theme.palette.primary.main} ml={2.5}>
                        Curation is fun and easy. Try it now!
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            width: '150px',
                            whiteSpace: 'nowrap',
                        }}
                        onClick={handleCurateStack}
                    >
                        Curate Stack
                    </Button>
                </Box>
                <Box
                    paddingInline="24px"
                    display={mdUp ? 'flex' : 'none'}
                    justifyContent="space-between"
                    width="100%"
                    my={2}
                    mb={4}
                >
                    <Box display={'flex'} gap={1} alignItems={'center'}>
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
                    <Box display={'flex'} gap={1} alignItems={'center'}>
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
                <div
                    style={{
                        width: 'auto',
                        minWidth: '79%',
                        margin: '0 auto',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: 30,
                        paddingTop: '0',
                        overflow: 'hidden',
                    }}
                >
                    {stacks.data.map((stack: Stack) => {
                        return (
                            <StackCardContainer key={stack.stacks.id}>
                                <StackItem stack={stack} />
                            </StackCardContainer>
                        );
                    })}
                </div>

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
