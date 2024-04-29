import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconMenu2, IconSearch } from '@tabler/icons-react';
import { useI18n } from '@/app/hooks/useI18n';
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
    OutlinedInput,
} from '@mui/material';

import { AppState } from '@/store';
import assetsMetadata from '@/mock/assetsMetadata.json';
import { actions } from '@/features/filters/slice';
import { ContextItem } from '../components/ContextItem';
import { TaxonomyItem } from '../components/TaxonomyItem';
import { CreatorsItem } from '../components/CreatorsItem';
import type {
    AssetsMetadata,
    ItemsOrCultureOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrEthnicityOrGenderOrBlockchain,
    MoodOrMediumOrStyle,
} from './types';
import type { Context, Taxonomy, Creators } from '../types';
import Version from '../../Version';

const Filters = () => {
    const dispatch = useDispatch();
    const { language } = useI18n();

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
                    placeholder={language['search.assetFilter.search.placeholder'] as string}
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
                                    {language['search.assetFilter.context'] as string}
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
                                            title={key as keyof Context}
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
                                                ).enum ||
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
                                    {language['search.assetFilter.taxonomy'] as string}
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
                                        <TaxonomyItem
                                            loadOptionsEndpoint={
                                                assetsMetadata.taxonomy.uiSchema[
                                                    key as keyof AssetsMetadata['taxonomy']['schema']['properties']
                                                ]['ui:options']?.loadOptionsEndpoint
                                            }
                                            key={key}
                                            title={key as keyof Taxonomy}
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
                                    {language['search.assetFilter.creators'] as string}
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
                                        <CreatorsItem
                                            key={key}
                                            title={key as keyof Creators}
                                            values={values}
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
                        {language['search.assetFilter.resetFilters'] as string}
                    </Button>
                </Box>
                <Box display="flex" justifyContent="center" mt={4} mb={4}>
                    <Version />
                </Box>
            </Box>
        </List>
    );
};

export default Filters;
