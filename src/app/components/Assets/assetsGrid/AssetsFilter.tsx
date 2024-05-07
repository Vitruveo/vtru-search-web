import { useDispatch } from 'react-redux';
import { IconSearch } from '@tabler/icons-react';
import { useI18n } from '@/app/hooks/useI18n';
import { InputAdornment, Box, Button, Divider, Typography, OutlinedInput, Stack, Checkbox } from '@mui/material';
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
import { AssetFilterAccordion } from './AssetFilterAccordion';
import { Range } from '../components/Range';
import { useSelector } from '@/store/hooks';

const Filters = () => {
    const dispatch = useDispatch();
    const { language } = useI18n();

    const values = useSelector((state) => state.filters);
    const tags = useSelector((state) => state.assets.tags);

    const afterPriceChange = (min: number, max: number) => {
        dispatch(
            actions.changePrice({
                min,
                max,
            })
        );
    };

    return (
        <Stack gap={2} p={1} pb={2} mt={1} height="92vh" overflow="auto">
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

            <AssetFilterAccordion title="Licenses">
                <Box>
                    <Typography fontSize="0.85rem" fontWeight="700" mb={1}>
                        Price
                    </Typography>
                    <Box mx={1}>
                        <Range afterChange={afterPriceChange} />
                    </Box>
                </Box>
            </AssetFilterAccordion>

            <Divider />

            <AssetFilterAccordion title={language['search.assetFilter.context'] as string}>
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
            </AssetFilterAccordion>

            <Divider />

            <AssetFilterAccordion title={language['search.assetFilter.taxonomy'] as string}>
                {Object.entries(assetsMetadata.taxonomy.schema.properties).map((item) => {
                    const [key, value] = item;

                    // TODO: CORRIGIR TIPAGEM
                    return (
                        <TaxonomyItem
                            loadOptionsEndpoint={
                                (
                                    assetsMetadata.taxonomy.uiSchema[
                                        key as keyof AssetsMetadata['taxonomy']['schema']['properties']
                                    ] as any
                                )['ui:options']?.loadOptionsEndpoint
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
            </AssetFilterAccordion>

            <Divider />

            <AssetFilterAccordion title={language['search.assetFilter.creators'] as string}>
                {Object.entries(assetsMetadata.creators.schema.items.properties).map((item) => {
                    const [key, value] = item;
                    return (
                        <CreatorsItem
                            loadOptionsEndpoint={
                                (
                                    assetsMetadata.creators.uiSchema.items[
                                        key as keyof AssetsMetadata['creators']['schema']['items']['properties']
                                    ] as any
                                )['ui:options']?.loadOptionsEndpoint
                            }
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
            </AssetFilterAccordion>

            <Box>
                <Button variant="contained" onClick={() => dispatch(actions.reset())} fullWidth>
                    {language['search.assetFilter.resetFilters'] as string}
                </Button>
            </Box>
            <Box display="flex" justifyContent="center">
                <Version />
            </Box>
        </Stack>
    );
};

export default Filters;
