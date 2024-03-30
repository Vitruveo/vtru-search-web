import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconMenu2, IconSearch } from '@tabler/icons-react';
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
import { filtersActionsCreators } from '@/features/filters/slice';
import { RootState } from '@/store/rootReducer';
import { ContextItem } from '../components/ContextItem';

const Filters = () => {
    const dispatch = useDispatch();
    const values = useSelector((state: RootState) => state.filters);

    return (
        <List>
            <Box
                p={1}
                sx={{
                    overflow: 'auto',
                    maxHeight: '92vh',
                }}
            >
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

                <Box paddingBlock={2}>
                    <Accordion defaultExpanded>
                        <AccordionSummary>
                            <Box width="100%" display="flex" justifyContent="space-between">
                                <Typography fontSize="1.2rem" fontWeight="700">
                                    Context
                                </Typography>

                                <IconMenu2 size="20" />
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box mb={2}>
                                {Object.entries(assetsMetadata.context.schema.properties).map(([key, value]) => (
                                    <ContextItem
                                        key={key}
                                        context="context"
                                        title={key}
                                        values={values}
                                        hidden={assetsMetadata.context.uiSchema[key]['ui:widget'] === 'hidden'}
                                        type={assetsMetadata.context.uiSchema[key]['ui:widget']}
                                        options={value?.enum || value?.items?.enum || []}
                                        onChange={(changeValue) =>
                                            dispatch(
                                                filtersActionsCreators.change({
                                                    key: 'context',
                                                    value: {
                                                        [key]: changeValue,
                                                    },
                                                })
                                            )
                                        }
                                        onRemove={(color) =>
                                            dispatch(
                                                filtersActionsCreators.change({
                                                    key: 'context',
                                                    value: {
                                                        [key]: values.context[key].filter((item) => item !== color),
                                                    },
                                                })
                                            )
                                        }
                                    />
                                ))}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Box>

                <Divider />

                <Box paddingBlock={2}>
                    <Accordion>
                        <AccordionSummary>
                            <Box width="100%" display="flex" justifyContent="space-between">
                                <Typography fontSize="1.2rem" fontWeight="700">
                                    Taxonomy
                                </Typography>

                                <IconMenu2 size="20" />
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box mb={2}>
                                {Object.entries(assetsMetadata.taxonomy.schema.properties).map(([key, value]) => (
                                    <ContextItem
                                        key={key}
                                        context="taxonomy"
                                        title={key}
                                        values={values}
                                        hidden={assetsMetadata.taxonomy.uiSchema[key]['ui:widget'] === 'hidden'}
                                        type={assetsMetadata.taxonomy.uiSchema[key]['ui:widget']}
                                        options={value?.enum || value?.items?.enum || []}
                                        onChange={(changeValue) =>
                                            dispatch(
                                                filtersActionsCreators.change({
                                                    key: 'taxonomy',
                                                    value: {
                                                        [key]: changeValue,
                                                    },
                                                })
                                            )
                                        }
                                        onRemove={(color) =>
                                            dispatch(
                                                filtersActionsCreators.change({
                                                    key: 'taxonomy',
                                                    value: {
                                                        [key]: values.taxonomy[key].filter((item) => item !== color),
                                                    },
                                                })
                                            )
                                        }
                                    />
                                ))}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Box>

                <Divider />

                <Box paddingBlock={2}>
                    <Accordion>
                        <AccordionSummary>
                            <Box width="100%" display="flex" justifyContent="space-between">
                                <Typography fontSize="1.2rem" fontWeight="700">
                                    Creators
                                </Typography>

                                <IconMenu2 size="20" />
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box mb={2}>
                                {Object.entries(assetsMetadata.creators.schema.items.properties).map(([key, value]) => (
                                    <ContextItem
                                        key={key}
                                        context="creators"
                                        title={key}
                                        values={values}
                                        hidden={assetsMetadata.creators.uiSchema.items[key]['ui:widget'] === 'hidden'}
                                        type={assetsMetadata.creators.uiSchema.items[key]['ui:widget']}
                                        options={value?.enum || value?.items?.enum || []}
                                        onChange={(changeValue) =>
                                            dispatch(
                                                filtersActionsCreators.change({
                                                    key: 'creators',
                                                    value: {
                                                        [key]: changeValue,
                                                    },
                                                })
                                            )
                                        }
                                        onRemove={(color) =>
                                            dispatch(
                                                filtersActionsCreators.change({
                                                    key: 'creators',
                                                    value: {
                                                        [key]: values.creators[key].filter((item) => item !== color),
                                                    },
                                                })
                                            )
                                        }
                                    />
                                ))}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Box>

                <Button variant="contained" onClick={() => dispatch(filtersActionsCreators.reset())} fullWidth>
                    Reset Filters
                </Button>
            </Box>
        </List>
    );
};

export default Filters;
