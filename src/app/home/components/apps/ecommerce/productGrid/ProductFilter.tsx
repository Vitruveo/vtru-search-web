import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconMenu2, IconSearch, IconTrash } from '@tabler/icons-react';
import Select from 'react-select';
import { debounce } from 'lodash';
import {
    Accordion,
    InputAdornment,
    AccordionSummary,
    AccordionDetails,
    Box,
    Button,
    Divider,
    List,
    Typography,
    TextField,
} from '@mui/material';

import assetsMetadata from '@/mock/assetsMetadata.json';
import { filtersActions } from '@/features/filters/slice';
import { RootState } from '@/store/rootReducer';
import { countryHashMap } from '@/mock/countrydata';

const Filters = () => {
    const dispatch = useDispatch();
    const values = useSelector((state: RootState) => state.filters);
    const [color, setColor] = React.useState('#000000');

    const debounceColor = debounce((value) => {
        setColor(value);
    }, 500);

    const handleAddColor = ({ key }: { key: string }) => {
        if (values.context[key].includes(color)) return;

        dispatch(
            filtersActions.change({
                key: 'context',
                value: {
                    [key]: [...values.context[key], color],
                },
            })
        );
    };

    return (
        <List>
            <Box p={3}>
                <TextField
                    id="outlined-search"
                    placeholder="Search Asset"
                    size="small"
                    type="search"
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconSearch size="14" />
                            </InputAdornment>
                        ),
                    }}
                    fullWidth
                    onChange={(e) => {}}
                />
            </Box>

            <Box
                p={3}
                pt={0}
                sx={{
                    overflow: 'auto',
                    maxHeight: '85vh',
                    paddingBottom: '5rem',
                }}
            >
                <Accordion defaultExpanded>
                    <AccordionSummary>
                        <Box width="100%" display="flex" justifyContent="space-between">
                            <Typography marginBottom={2} fontSize="1.2rem" fontWeight="700">
                                Context
                            </Typography>

                            <IconMenu2 size="20" />
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box mb={2}>
                            {Object.entries(assetsMetadata.context.schema.properties).map(([key, value]) => {
                                return (
                                    <Box mb={2} key={key}>
                                        {assetsMetadata.context.schema.properties[key].type !== 'hidden' && (
                                            <Typography fontSize="0.85rem" fontWeight="700">
                                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                            </Typography>
                                        )}

                                        {assetsMetadata.context.uiSchema[key]['ui:widget'] === 'radios' && (
                                            <div>
                                                <Select
                                                    isMulti
                                                    styles={{
                                                        control: (base, state) => ({
                                                            ...base,
                                                            width: '100%',
                                                            borderColor: state.isFocused ? '#763EBD' : '#E0E0E0',
                                                            boxShadow: '#763EBD',
                                                            '&:hover': {
                                                                borderColor: '#763EBD',
                                                            },
                                                        }),
                                                    }}
                                                    value={values.context[key]?.map((item) => ({
                                                        value: item,
                                                        label: item,
                                                    }))}
                                                    options={value.enum.map((item) => ({
                                                        value: item,
                                                        label: item,
                                                    }))}
                                                    onChange={(option) => {
                                                        dispatch(
                                                            filtersActions.change({
                                                                key: 'context',
                                                                value: {
                                                                    [key]: option.map((item) => item.value),
                                                                },
                                                            })
                                                        );
                                                    }}
                                                />
                                            </div>
                                        )}

                                        {assetsMetadata.context.uiSchema[key]['ui:widget'] === 'checkboxes' && (
                                            <div>
                                                <Select
                                                    isMulti
                                                    styles={{
                                                        control: (base, state) => ({
                                                            ...base,
                                                            width: '100%',
                                                            borderColor: state.isFocused ? '#763EBD' : '#E0E0E0',
                                                            boxShadow: '#763EBD',
                                                            '&:hover': {
                                                                borderColor: '#763EBD',
                                                            },
                                                        }),
                                                    }}
                                                    value={values.context[key]?.map((item) => ({
                                                        value: item,
                                                        label: item,
                                                    }))}
                                                    options={value.items.enum.map((item) => ({
                                                        value: item,
                                                        label: item,
                                                    }))}
                                                    onChange={(option) => {
                                                        dispatch(
                                                            filtersActions.change({
                                                                key: 'context',
                                                                value: {
                                                                    [key]: option.map((item) => item.value),
                                                                },
                                                            })
                                                        );
                                                    }}
                                                />
                                            </div>
                                        )}

                                        {assetsMetadata.context.uiSchema[key]['ui:widget'] === 'textarea' && (
                                            <TextField
                                                fullWidth
                                                multiline
                                                id={key}
                                                name={key}
                                                value={values.context[key]}
                                                onChange={(event) => {
                                                    dispatch(
                                                        filtersActions.change({
                                                            key: 'context',
                                                            value: {
                                                                [key]: event.target.value,
                                                            },
                                                        })
                                                    );
                                                }}
                                            />
                                        )}

                                        {assetsMetadata.context.uiSchema[key]['ui:widget'] === 'color' && (
                                            <Box>
                                                <Box width="100%" display="flex" justifyContent="space-between">
                                                    <input
                                                        type="color"
                                                        id={key}
                                                        name={key}
                                                        onChange={(event) => debounceColor(event.target.value)}
                                                    />
                                                    <Button onClick={() => handleAddColor({ key })}>Add Color</Button>
                                                </Box>

                                                {(values.context[key] ? values.context[key] : []).map((color) => {
                                                    return (
                                                        <Box
                                                            key={color}
                                                            display="flex"
                                                            alignItems="center"
                                                            justifyContent="space-between"
                                                            mt={1}
                                                        >
                                                            <Box
                                                                width="1rem"
                                                                height="1rem"
                                                                borderRadius="50%"
                                                                bgcolor={color}
                                                            ></Box>
                                                            <IconTrash
                                                                cursor="pointer"
                                                                color="red"
                                                                width={20}
                                                                onClick={() => {
                                                                    dispatch(
                                                                        filtersActions.change({
                                                                            key: 'context',
                                                                            value: {
                                                                                [key]: values.context[key].filter(
                                                                                    (item) => item !== color
                                                                                ),
                                                                            },
                                                                        })
                                                                    );
                                                                }}
                                                            />
                                                        </Box>
                                                    );
                                                })}
                                            </Box>
                                        )}

                                        {assetsMetadata.context.uiSchema[key]['ui:widget'] === 'text' && (
                                            <TextField
                                                fullWidth
                                                type="text"
                                                id={key}
                                                name={key}
                                                value={values.context[key]}
                                                onChange={(event) => {
                                                    dispatch(
                                                        filtersActions.change({
                                                            key: 'context',
                                                            value: {
                                                                [key]: event.target.value,
                                                            },
                                                        })
                                                    );
                                                }}
                                            />
                                        )}
                                    </Box>
                                );
                            })}
                        </Box>
                    </AccordionDetails>
                </Accordion>

                <Divider />

                <Accordion>
                    <AccordionSummary>
                        <Box width="100%" display="flex" justifyContent="space-between">
                            <Typography marginBottom={2} fontSize="1.2rem" fontWeight="700">
                                Taxonomy
                            </Typography>

                            <IconMenu2 size="20" />
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box mb={2}>
                            {Object.entries(assetsMetadata.taxonomy.schema.properties).map(([key, value]) => {
                                return (
                                    <Box mb={2} key={key}>
                                        <Typography fontSize="0.85rem" fontWeight="700">
                                            {key.charAt(0).toUpperCase() + key.slice(1)}
                                        </Typography>

                                        {assetsMetadata.taxonomy.uiSchema[key]['ui:widget'] === 'radios' && (
                                            <div>
                                                <Select
                                                    isMulti
                                                    styles={{
                                                        control: (base, state) => ({
                                                            ...base,
                                                            width: '100%',
                                                            borderColor: state.isFocused ? '#763EBD' : '#E0E0E0',
                                                            boxShadow: '#763EBD',
                                                            '&:hover': {
                                                                borderColor: '#763EBD',
                                                            },
                                                        }),
                                                    }}
                                                    value={values.taxonomy[key]?.map((item) => ({
                                                        value: item,
                                                        label: item,
                                                    }))}
                                                    options={value.enum.map((item) => ({
                                                        value: item,
                                                        label: item,
                                                    }))}
                                                    onChange={(option) => {
                                                        dispatch(
                                                            filtersActions.change({
                                                                key: 'taxonomy',
                                                                value: {
                                                                    [key]: option.map((item) => item.value),
                                                                },
                                                            })
                                                        );
                                                    }}
                                                />
                                            </div>
                                        )}

                                        {assetsMetadata.taxonomy.uiSchema[key]['ui:widget'] === 'checkboxes' && (
                                            <div>
                                                <Select
                                                    isMulti
                                                    styles={{
                                                        control: (base, state) => ({
                                                            ...base,
                                                            width: '100%',
                                                            borderColor: state.isFocused ? '#763EBD' : '#E0E0E0',
                                                            boxShadow: '#763EBD',
                                                            '&:hover': {
                                                                borderColor: '#763EBD',
                                                            },
                                                        }),
                                                    }}
                                                    value={values.taxonomy[key]?.map((item) => ({
                                                        value: item,
                                                        label: item,
                                                    }))}
                                                    options={value.items.enum.map((item) => ({
                                                        value: item,
                                                        label: item,
                                                    }))}
                                                    onChange={(option) => {
                                                        dispatch(
                                                            filtersActions.change({
                                                                key: 'taxonomy',
                                                                value: {
                                                                    [key]: option.map((item) => item.value),
                                                                },
                                                            })
                                                        );
                                                    }}
                                                />
                                            </div>
                                        )}

                                        {assetsMetadata.taxonomy.uiSchema[key]['ui:widget'] === 'textarea' && (
                                            <TextField
                                                fullWidth
                                                multiline
                                                id={key}
                                                name={key}
                                                value={values.taxonomy[key]}
                                                onChange={(event) => {
                                                    dispatch(
                                                        filtersActions.change({
                                                            key: 'taxonomy',
                                                            value: {
                                                                [key]: event.target.value,
                                                            },
                                                        })
                                                    );
                                                }}
                                            />
                                        )}

                                        {assetsMetadata.taxonomy.uiSchema[key]['ui:widget'] === 'text' && (
                                            <TextField
                                                fullWidth
                                                type="text"
                                                id={key}
                                                name={key}
                                                value={values.taxonomy[key]}
                                                onChange={(event) => {
                                                    dispatch(
                                                        filtersActions.change({
                                                            key: 'taxonomy',
                                                            value: {
                                                                [key]: event.target.value,
                                                            },
                                                        })
                                                    );
                                                }}
                                            />
                                        )}
                                    </Box>
                                );
                            })}
                        </Box>
                    </AccordionDetails>
                </Accordion>

                <Divider />

                <Accordion>
                    <AccordionSummary>
                        <Box width="100%" display="flex" justifyContent="space-between">
                            <Typography marginBottom={2} fontSize="1.2rem" fontWeight="700">
                                Creators
                            </Typography>

                            <IconMenu2 size="20" />
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box mb={2}>
                            {Object.entries(assetsMetadata.creators.schema.items.properties).map(([key, value]) => {
                                return (
                                    <Box mb={2} key={key}>
                                        <Typography fontSize="0.85rem" fontWeight="700">
                                            {key.charAt(0).toUpperCase() + key.slice(1)}
                                        </Typography>

                                        {assetsMetadata.creators.uiSchema.items[key]['ui:widget'] === 'radios' && (
                                            <div>
                                                <Select
                                                    isMulti
                                                    styles={{
                                                        control: (base, state) => ({
                                                            ...base,
                                                            width: '100%',
                                                            borderColor: state.isFocused ? '#763EBD' : '#E0E0E0',
                                                            boxShadow: '#763EBD',
                                                            '&:hover': {
                                                                borderColor: '#763EBD',
                                                            },
                                                        }),
                                                    }}
                                                    value={values.creators[key]?.map((item) => ({
                                                        value: item,
                                                        label: countryHashMap[item] ? countryHashMap[item] : item,
                                                    }))}
                                                    options={value.enum.map((item) => ({
                                                        value: item,
                                                        label: countryHashMap[item] ? countryHashMap[item] : item,
                                                    }))}
                                                    onChange={(option) => {
                                                        dispatch(
                                                            filtersActions.change({
                                                                key: 'creators',
                                                                value: {
                                                                    [key]: option.map((item) => item.value),
                                                                },
                                                            })
                                                        );
                                                    }}
                                                />
                                            </div>
                                        )}

                                        {assetsMetadata.creators.uiSchema.items[key]['ui:widget'] === 'checkboxes' && (
                                            <div>
                                                <Select
                                                    isMulti
                                                    styles={{
                                                        control: (base, state) => ({
                                                            ...base,
                                                            width: '100%',
                                                            borderColor: state.isFocused ? '#763EBD' : '#E0E0E0',
                                                            boxShadow: '#763EBD',
                                                            '&:hover': {
                                                                borderColor: '#763EBD',
                                                            },
                                                        }),
                                                    }}
                                                    value={values.creators[key]?.map((item) => ({
                                                        value: item,
                                                        label: item,
                                                    }))}
                                                    options={value.items.enum.map((item) => ({
                                                        value: item,
                                                        label: item,
                                                    }))}
                                                    onChange={(option) => {
                                                        dispatch(
                                                            filtersActions.change({
                                                                key: 'creators',
                                                                value: {
                                                                    [key]: option.map((item) => item.value),
                                                                },
                                                            })
                                                        );
                                                    }}
                                                />
                                            </div>
                                        )}

                                        {assetsMetadata.creators.uiSchema.items[key]['ui:widget'] === 'textarea' && (
                                            <TextField
                                                fullWidth
                                                multiline
                                                id={key}
                                                name={key}
                                                value={values.creators[key]}
                                                onChange={(event) => {
                                                    dispatch(
                                                        filtersActions.change({
                                                            key: 'creators',
                                                            value: {
                                                                [key]: event.target.value,
                                                            },
                                                        })
                                                    );
                                                }}
                                            />
                                        )}

                                        {assetsMetadata.creators.uiSchema.items[key]['ui:widget'] === 'text' && (
                                            <TextField
                                                fullWidth
                                                type="text"
                                                id={key}
                                                name={key}
                                                value={values.creators[key]}
                                                onChange={(event) => {
                                                    dispatch(
                                                        filtersActions.change({
                                                            key: 'creators',
                                                            value: {
                                                                [key]: event.target.value,
                                                            },
                                                        })
                                                    );
                                                }}
                                            />
                                        )}
                                    </Box>
                                );
                            })}
                        </Box>
                    </AccordionDetails>
                </Accordion>

                <Divider
                    sx={{
                        paddingBottom: '2rem',
                    }}
                />

                {/* <Accordion>
                    <AccordionSummary>
                        <Typography mt={3} mb={2} fontSize="1.2rem" fontWeight="700">
                            Provenance
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box mb={2}>
                            {Object.entries(assetsMetadata.provenance.schema.properties).map(([key, value]) => {
                                return (
                                    <Box mb={2} key={key}>
                                        <Typography fontSize="0.85rem" fontWeight="700">
                                            {key.charAt(0).toUpperCase() + key.slice(1)}
                                        </Typography>

                                        {assetsMetadata.provenance.uiSchema[key]['ui:widget'] === 'radios' && (
                                            <div>
                                                <Select
                                                    isMulti
                                                    styles={{
                                                        control: (base, state) => ({
                                                            ...base,
                                                            width: '100%',
                                                            borderColor: state.isFocused ? '#763EBD' : '#E0E0E0',
                                                            boxShadow: '#763EBD',
                                                            '&:hover': {
                                                                borderColor: '#763EBD',
                                                            },
                                                        }),
                                                    }}
                                                    value={values.provenance[key]?.map((item) => ({
                                                        value: item,
                                                        label: item,
                                                    }))}
                                                    options={value.enum.map((item) => ({
                                                        value: item,
                                                        label: item,
                                                    }))}
                                                    onChange={(option) => {
                                                        dispatch(
                                                            filtersActionsCreators.change({
                                                                key: 'provenance',
                                                                value: {
                                                                    [key]: option.map((item) => item.value),
                                                                },
                                                            })
                                                        );
                                                    }}
                                                />
                                            </div>
                                        )}

                                        {assetsMetadata.provenance.uiSchema[key]['ui:widget'] === 'tuple' && (
                                            <div>
                                                {Object.keys(assetsMetadata.provenance.uiSchema[key].items).map(
                                                    (option) => (
                                                        <div key={option}>
                                                            <label htmlFor={option}>{option}</label>
                                                            <TextField
                                                                fullWidth
                                                                type="text"
                                                                id={option}
                                                                name={option}
                                                                value={values.provenance[key][option]}
                                                                onChange={(event) => {
                                                                    dispatch(
                                                                        filtersActionsCreators.change({
                                                                            key: 'provenance',
                                                                            value: {
                                                                                [key]: {
                                                                                    ...values.provenance[key],
                                                                                    [option]: event.target.value,
                                                                                },
                                                                            },
                                                                        })
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}

                                        {assetsMetadata.provenance.uiSchema[key]['ui:widget'] === 'textarea' && (
                                            <TextField
                                                fullWidth
                                                multiline
                                                id={key}
                                                name={key}
                                                value={values.provenance[key]}
                                                onChange={(event) => {
                                                    dispatch(
                                                        filtersActionsCreators.change({
                                                            key: 'provenance',
                                                            value: {
                                                                [key]: event.target.value,
                                                            },
                                                        })
                                                    );
                                                }}
                                            />
                                        )}

                                        {assetsMetadata.provenance.uiSchema[key]['ui:widget'] === 'text' && (
                                            <TextField
                                                fullWidth
                                                type="text"
                                                id={key}
                                                name={key}
                                                value={values.provenance[key]}
                                                onChange={(event) => {
                                                    dispatch(
                                                        filtersActionsCreators.change({
                                                            key: 'provenance',
                                                            value: {
                                                                [key]: event.target.value,
                                                            },
                                                        })
                                                    );
                                                }}
                                            />
                                        )}
                                    </Box>
                                );
                            })}
                        </Box>
                    </AccordionDetails>
                </Accordion> */}

                <Button variant="contained" onClick={() => dispatch(filtersActions.reset())} fullWidth>
                    Reset Filters
                </Button>
            </Box>
        </List>
    );
};

export default Filters;
