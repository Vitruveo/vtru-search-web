import React, { useState } from 'react';
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
    OutlinedInput,
} from '@mui/material';

import assetsMetadata from '@/mock/assetsMetadata.json';
import { actions } from '@/features/filters/slice';
import { ContextItem } from '../components/ContextItem';
import {
    AssetsMetadata,
    ItemsOrCultureOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrEthnicityOrGenderOrBlockchain,
    MoodOrMediumOrStyle,
} from './types';
import { AppState } from '@/store';

const Filters = () => {
    const dispatch = useDispatch();
    const values = useSelector((state: AppState) => state.filters);
    const tags = useSelector((state: AppState) => state.assets.tags);

    const [expandedContext, setExpandedContext] = useState(true);
    const [expandedTaxonomy, setExpandedTaxonomy] = useState(false);
    const [expandedCreators, setExpandedCreators] = useState(false);

    return (
        <List>
            <Box
                p={1}
                sx={{
                    overflow: 'auto',
                    maxHeight: '92vh',
                }}
            >
                <OutlinedInput
                    id="outlined-search"
                    placeholder="Search Asset"
                    size="small"
                    type="search"
                    color="primary"
                    notched
                    startAdornment={
                        <InputAdornment position="start">
                            <IconSearch size="14" />
                        </InputAdornment>
                    }
                    fullWidth
                    value={values.name}
                    onChange={(e) => dispatch(actions.changeName({ name: e.target.value }))}
                />

                <Box paddingBlock={2}>
                    <Accordion expanded={expandedContext} onChange={() => setExpandedContext(!expandedContext)}>
                        <AccordionSummary>
                            <Box width="100%" display="flex" justifyContent="space-between">
                                <Typography fontSize="1.2rem" fontWeight="700">
                                    Context
                                </Typography>

                                <IconMenu2
                                    size="20"
                                    style={{
                                        transform: expandedContext ? 'rotate(90deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.3s',
                                    }}
                                />
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box mb={2}>
                                {Object.entries(assetsMetadata.context.schema.properties).map((item) => {
                                    const [key, value] = item;
                                    return (
                                        <ContextItem
                                            key={key}
                                            tags={[]}
                                            context="context"
                                            title={key}
                                            values={values}
                                            hidden={
                                                assetsMetadata.context.uiSchema[
                                                    key as keyof AssetsMetadata['context']['schema']['properties']
                                                ]['ui:widget'] === 'hidden'
                                            }
                                            type={
                                                assetsMetadata.context.uiSchema[
                                                    key as keyof AssetsMetadata['context']['schema']['properties']
                                                ]['ui:widget']
                                            }
                                            options={
                                                (
                                                    value as ItemsOrCultureOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrEthnicityOrGenderOrBlockchain
                                                )?.enum ||
                                                (value as MoodOrMediumOrStyle)?.items?.enum ||
                                                []
                                            }
                                            onChange={(changeValue) =>
                                                dispatch(
                                                    actions.change({
                                                        key: 'context',
                                                        value: {
                                                            [key]: changeValue,
                                                        },
                                                    })
                                                )
                                            }
                                            onRemove={(color) =>
                                                dispatch(
                                                    actions.change({
                                                        key: 'context',
                                                        value: {
                                                            [key]: (
                                                                values.context[
                                                                    key as keyof AssetsMetadata['context']['schema']['properties']
                                                                ] as string[]
                                                            ).filter((itemColor) => itemColor !== color),
                                                        },
                                                    })
                                                )
                                            }
                                        />
                                    );
                                })}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Box>

                <Divider />

                <Box paddingBlock={2}>
                    <Accordion expanded={expandedTaxonomy} onChange={() => setExpandedTaxonomy(!expandedTaxonomy)}>
                        <AccordionSummary>
                            <Box width="100%" display="flex" justifyContent="space-between">
                                <Typography fontSize="1.2rem" fontWeight="700">
                                    Taxonomy
                                </Typography>

                                <IconMenu2
                                    size="20"
                                    style={{
                                        transform: expandedTaxonomy ? 'rotate(90deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.3s',
                                    }}
                                />
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box mb={2}>
                                {Object.entries(assetsMetadata.taxonomy.schema.properties).map((item) => {
                                    const [key, value] = item;

                                    return (
                                        <ContextItem
                                            key={key}
                                            context="taxonomy"
                                            title={key}
                                            values={values}
                                            tags={tags || []}
                                            hidden={
                                                assetsMetadata.taxonomy.uiSchema[
                                                    key as keyof AssetsMetadata['taxonomy']['schema']['properties']
                                                ]['ui:widget'] === 'hidden'
                                            }
                                            type={
                                                assetsMetadata.taxonomy.uiSchema[
                                                    key as keyof AssetsMetadata['taxonomy']['schema']['properties']
                                                ]['ui:widget']
                                            }
                                            options={
                                                (
                                                    value as ItemsOrCultureOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrEthnicityOrGenderOrBlockchain
                                                )?.enum ||
                                                (value as MoodOrMediumOrStyle)?.items?.enum ||
                                                []
                                            }
                                            onChange={(changeValue) =>
                                                dispatch(
                                                    actions.change({
                                                        key: 'taxonomy',
                                                        value: {
                                                            [key]: changeValue,
                                                        },
                                                    })
                                                )
                                            }
                                            onRemove={(color) =>
                                                dispatch(
                                                    actions.change({
                                                        key: 'taxonomy',
                                                        value: {
                                                            [key]: (
                                                                values.taxonomy[
                                                                    key as keyof AssetsMetadata['taxonomy']['schema']['properties']
                                                                ] as string[]
                                                            ).filter((itemColor) => itemColor !== color),
                                                        },
                                                    })
                                                )
                                            }
                                        />
                                    );
                                })}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Box>

                <Divider />

                <Box paddingBlock={2}>
                    <Accordion expanded={expandedCreators} onChange={() => setExpandedCreators(!expandedCreators)}>
                        <AccordionSummary>
                            <Box width="100%" display="flex" justifyContent="space-between">
                                <Typography fontSize="1.2rem" fontWeight="700">
                                    Creators
                                </Typography>

                                <IconMenu2
                                    size="20"
                                    style={{
                                        transform: expandedCreators ? 'rotate(90deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.3s',
                                    }}
                                />
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box mb={2}>
                                {Object.entries(assetsMetadata.creators.schema.items.properties).map((item) => {
                                    const [key, value] = item;
                                    return (
                                        <ContextItem
                                            key={key}
                                            context="creators"
                                            title={key}
                                            values={values}
                                            tags={[]}
                                            hidden={
                                                assetsMetadata.creators.uiSchema.items[
                                                    key as keyof AssetsMetadata['creators']['schema']['items']['properties']
                                                ]['ui:widget'] === 'hidden'
                                            }
                                            type={
                                                assetsMetadata.creators.uiSchema.items[
                                                    key as keyof AssetsMetadata['creators']['schema']['items']['properties']
                                                ]['ui:widget']
                                            }
                                            options={
                                                (
                                                    value as ItemsOrCultureOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrEthnicityOrGenderOrBlockchain
                                                )?.enum ||
                                                (value as MoodOrMediumOrStyle)?.items?.enum ||
                                                []
                                            }
                                            onChange={(changeValue) =>
                                                dispatch(
                                                    actions.change({
                                                        key: 'creators',
                                                        value: {
                                                            [key]: changeValue,
                                                        },
                                                    })
                                                )
                                            }
                                            onRemove={(color) =>
                                                dispatch(
                                                    actions.change({
                                                        key: 'creators',
                                                        value: {
                                                            [key]: (
                                                                values.creators[
                                                                    key as keyof AssetsMetadata['creators']['schema']['items']['properties']
                                                                ] as string[]
                                                            ).filter((itemColor) => itemColor !== color),
                                                        },
                                                    })
                                                )
                                            }
                                        />
                                    );
                                })}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Box>

                <Box mb={4}>
                    <Button variant="contained" onClick={() => dispatch(actions.reset())} fullWidth>
                        Reset Filters
                    </Button>
                </Box>
            </Box>
        </List>
    );
};

export default Filters;
