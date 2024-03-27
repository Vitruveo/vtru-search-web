import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import assetsMetadata from '@/mock/assetsMetadata.json';
import { filtersActionsCreators } from '@/features/filters/slice';
import { RootState } from '@/store/rootReducer';

const Filters = () => {
    const dispatch = useDispatch();
    const values = useSelector((state: RootState) => state.filters);

    return (
        <>
            <List>
                <Divider />
                <Box p={3}>
                    <Typography marginBottom={2} fontSize="1.2rem" fontWeight="700">
                        Context
                    </Typography>
                    <Box mb={2}>
                        {Object.entries(assetsMetadata.context.schema.properties).map(([key, value]) => {
                            return (
                                <Box mb={1} key={key}>
                                    <Typography fontSize="0.85rem" fontWeight="700">
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </Typography>

                                    {assetsMetadata.context.uiSchema[key]['ui:widget'] === 'radios' && (
                                        <div>
                                            <Select
                                                isMulti
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
                                                        filtersActionsCreators.change({
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
                                                        filtersActionsCreators.change({
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
                                                    filtersActionsCreators.change({
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
                                        <input
                                            type="color"
                                            id={key}
                                            name={key}
                                            value={values.context[key]}
                                            onChange={(event) => {
                                                dispatch(
                                                    filtersActionsCreators.change({
                                                        key: 'context',
                                                        value: {
                                                            [key]: event.target.value,
                                                        },
                                                    })
                                                );
                                            }}
                                        />
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
                                                    filtersActionsCreators.change({
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

                    <Divider />

                    <Typography marginBottom={2} fontSize="1.2rem" fontWeight="700">
                        Taxonomy
                    </Typography>
                    <Box mb={2}>
                        {Object.entries(assetsMetadata.taxonomy.schema.properties).map(([key, value]) => {
                            return (
                                <Box mb={1} key={key}>
                                    <Typography fontSize="0.85rem" fontWeight="700">
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </Typography>

                                    {assetsMetadata.taxonomy.uiSchema[key]['ui:widget'] === 'radios' && (
                                        <div>
                                            <Select
                                                isMulti
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
                                                        filtersActionsCreators.change({
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
                                                        filtersActionsCreators.change({
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
                                                    filtersActionsCreators.change({
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
                                                    filtersActionsCreators.change({
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

                    <Divider />

                    <Typography marginBottom={2} fontSize="1.2rem" fontWeight="700">
                        Creators
                    </Typography>
                    <Box mb={2}>
                        {Object.entries(assetsMetadata.creators.schema.items.properties).map(([key, value]) => {
                            return (
                                <Box mb={1} key={key}>
                                    <Typography fontSize="0.85rem" fontWeight="700">
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </Typography>

                                    {assetsMetadata.creators.uiSchema.items[key]['ui:widget'] === 'radios' && (
                                        <div>
                                            <Select
                                                isMulti
                                                value={values.creators[key]?.map((item) => ({
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
                                                        filtersActionsCreators.change({
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
                                                    filtersActionsCreators.change({
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
                                                    filtersActionsCreators.change({
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

                    <Divider />

                    <Typography marginBottom={2} fontSize="1.2rem" fontWeight="700">
                        Provenance
                    </Typography>
                    <Box mb={2}>
                        {Object.entries(assetsMetadata.provenance.schema.properties).map(([key, value]) => {
                            return (
                                <Box mb={1} key={key}>
                                    <Typography fontSize="0.85rem" fontWeight="700">
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </Typography>

                                    {assetsMetadata.provenance.uiSchema[key]['ui:widget'] === 'radios' && (
                                        <div>
                                            <Select
                                                isMulti
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

                    <Button variant="contained" onClick={() => dispatch(filtersActionsCreators.reset())} fullWidth>
                        Reset Filters
                    </Button>
                </Box>
            </List>
        </>
    );
};

export default Filters;
