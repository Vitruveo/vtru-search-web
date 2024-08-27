import { useDispatch } from 'react-redux';
import { IconSearch } from '@tabler/icons-react';
import { useI18n } from '@/app/hooks/useI18n';
import {
    InputAdornment,
    Box,
    Button,
    Divider,
    Typography,
    OutlinedInput,
    Stack,
    useMediaQuery,
    Theme,
    Checkbox,
    FormGroup,
    FormControlLabel,
} from '@mui/material';
import assetsMetadata from '@/mock/assetsMetadata.json';
import { actions } from '@/features/filters/slice';
import { actions as actionsAssets } from '@/features/assets/slice';
import { ContextItem } from '../components/ContextItem';
import { TaxonomyItem } from '../components/TaxonomyItem';
import { CreatorsItem } from '../components/CreatorsItem';
import type {
    AssetsMetadata,
    ItemsOrCultureOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrEthnicityOrGenderOrBlockchain,
    MoodOrMediumOrStyle,
    NationalityOrResidenceOrCountry,
} from './types';
import type { Context, Taxonomy, Creators } from '../types';
import Version from '../../Version';
import { AssetFilterAccordion } from './AssetFilterAccordion';
import { Range } from '../components/Range';
import { useSelector } from '@/store/hooks';
import React, { useEffect, useState } from 'react';
import { FilterSliceState } from '@/features/filters/types';
import chunkArray from '@/utils/chunkArray';

const Filters = () => {
    const params = new URLSearchParams(window.location.search);

    const [isNuditychecked, setIsNudityChecked] = useState(false);
    const [isAIchecked, setIsAIChecked] = useState(false);
    const [isPhotographyChecked, setIsPhotographyChecked] = useState(false);
    const [isPhysicalArtChecked, setIsPhysicalArtChecked] = useState(false);

    const [contextFilters, setContextFilters] = useState<number>();
    const [taxonomyFilters, setTaxonomyFilters] = useState<number>();
    const [creatorsFilters, setCreatorsFilters] = useState<number>();

    const dispatch = useDispatch();
    const { language } = useI18n();
    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

    const values = useSelector((state) => state.filters);
    const { tags, maxPrice } = useSelector((state) => state.assets);

    const getTotalFiltersApplied = (fieldName: keyof FilterSliceState) => {
        return Object.entries(values[fieldName]).reduce((acc, [_key, arrayfield]) => {
            return Array.isArray(arrayfield) ? acc + arrayfield.length : acc;
        }, 0);
    };

    useEffect(() => {
        const updateFilters = (
            fieldName: keyof FilterSliceState,
            setFilters: React.Dispatch<React.SetStateAction<number | undefined>>
        ) => {
            const totalFiltersLength = getTotalFiltersApplied(fieldName);
            setFilters(totalFiltersLength);
        };

        updateFilters('context', setContextFilters);
        updateFilters('taxonomy', setTaxonomyFilters);
        updateFilters('creators', setCreatorsFilters);
        setIsNudityChecked(values.taxonomy.nudity.includes('yes'));
        setIsAIChecked(values.taxonomy.aiGeneration.includes('full'));
        setIsPhotographyChecked(values.taxonomy.category.includes('photography'));
        setIsPhysicalArtChecked(values.taxonomy.objectType.includes('physicalart'));
    }, [values.context, values.taxonomy, values.creators, values.shortCuts]);

    const generateQueryParam = (key: string, value: string) => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set(key, value);
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
    };

    const afterPriceChange = (min: number, max: number) => {
        generateQueryParam('price_min', min.toString());
        generateQueryParam('price_max', max.toString());
        dispatch(
            actions.changePrice({
                min,
                max,
            })
        );
    };

    const handleResetFilters = () => {
        Array.from(params.keys()).forEach((key) => {
            if (key !== 'grid' && key !== 'video') params.delete(key);
        });
        if (params.get('grid')) {
            window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
            dispatch(actionsAssets.setGridId(params.get('grid')!));
            return;
        }

        if (params.get('video')) {
            window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
            dispatch(actionsAssets.setVideoId(params.get('video')!));
            return;
        }

        params.set('sort', 'latest');
        params.set('sold', 'no');
        params.set('taxonomy_aiGeneration', 'full,partial,none');
        params.set('taxonomy_nudity', 'no');
        params.set('groupByCreator', 'yes');
        params.delete('creatorId');

        window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);

        dispatch(actionsAssets.resetGroupByCreator());
        dispatch(actionsAssets.setSort({ order: 'latest', sold: 'no' }));
    };

    const syncFiltersWithUrl = (changeValue: any, key: string) => {
        if (Array.isArray(changeValue) && changeValue.length === 0) {
            params.delete(key);
            window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
            return;
        }
        generateQueryParam(key, changeValue.join(','));
    };

    const handleChangeNudity = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsNudityChecked(event.target.checked);
        generateQueryParam('taxonomy_nudity', event.target.checked ? 'yes,no' : 'no');
        dispatch(actions.change({ key: 'taxonomy', value: { nudity: event.target.checked ? ['yes', 'no'] : ['no'] } }));
    };
    const handleChangeAI = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsAIChecked(event.target.checked);
        generateQueryParam('taxonomy_aiGeneration', event.target.checked ? 'full,partial,none' : 'none');
        dispatch(
            actions.change({
                key: 'taxonomy',
                value: { aiGeneration: event.target.checked ? ['full', 'partial', 'none'] : ['none'] },
            })
        );
    };
    const handleChangePhysicalArt = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsPhysicalArtChecked(event.target.checked);
        syncFiltersWithUrl(event.target.checked ? ['physicalart'] : [], 'taxonomy_objectType');
        dispatch(
            actions.change({ key: 'taxonomy', value: { objectType: event.target.checked ? ['physicalart'] : [] } })
        );
    };
    const handleChangePhotography = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsPhotographyChecked(event.target.checked);
        syncFiltersWithUrl(event.target.checked ? ['photography'] : [], 'taxonomy_category');
        dispatch(actions.change({ key: 'taxonomy', value: { category: event.target.checked ? ['photography'] : [] } }));
    };

    return (
        <Stack gap={2} p={1} pb={2} mt={1} pt={isSmallScreen ? 8 : 1} height="92vh" overflow="auto">
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
                onChange={(e) => {
                    generateQueryParam('name', e.target.value);
                    dispatch(actions.changeName({ name: e.target.value }));
                }}
            />

            <FormGroup sx={{ display: 'flex', flexDirection: 'row', marginLeft: '8%' }}>
                <Box display={'flex'} flexDirection={'column'}>
                    <FormControlLabel
                        control={<Checkbox onChange={handleChangeNudity} checked={isNuditychecked} />}
                        label={'Nudity'}
                    />
                    <FormControlLabel
                        control={<Checkbox onChange={handleChangeAI} checked={isAIchecked} />}
                        label={'AI'}
                    />
                </Box>
                <Box display={'flex'} flexDirection={'column'}>
                    <FormControlLabel
                        control={<Checkbox onChange={handleChangePhysicalArt} checked={isPhysicalArtChecked} />}
                        label={'Physical Art'}
                    />
                    <FormControlLabel
                        control={<Checkbox onChange={handleChangePhotography} checked={isPhotographyChecked} />}
                        label={'Photography'}
                    />
                </Box>
            </FormGroup>

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

            <AssetFilterAccordion
                title={language['search.assetFilter.context'] as string}
                numberOfFilters={contextFilters}
            >
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
                            onChange={(changeValue) => {
                                syncFiltersWithUrl(changeValue, `context_${key}`);
                                dispatch(
                                    actions.change({
                                        key: 'context',
                                        value: {
                                            [key]: changeValue,
                                        },
                                    })
                                );
                            }}
                            onRemove={(color) => {
                                const chunckedValues = chunkArray(params.getAll(`context${key}`), 3);
                                const filtered = chunckedValues.filter(
                                    (chunk) => !chunk.every((v, i) => parseInt(v) === parseInt(color[i]))
                                );
                                params.delete(`context${key}`);
                                filtered.forEach((chunk) => {
                                    params.append(`context${key}`, chunk.join(','));
                                });
                                window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
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
                                );
                            }}
                        />
                    );
                })}
            </AssetFilterAccordion>

            <Divider />

            <AssetFilterAccordion
                title={language['search.assetFilter.taxonomy'] as string}
                numberOfFilters={taxonomyFilters}
            >
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
                            onChange={(changeValue) => {
                                syncFiltersWithUrl(changeValue, `taxonomy_${key}`);
                                dispatch(
                                    actions.change({
                                        key: 'taxonomy',
                                        value: {
                                            [key]: changeValue,
                                        },
                                    })
                                );
                            }}
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

            <AssetFilterAccordion
                title={language['search.assetFilter.creators'] as string}
                numberOfFilters={creatorsFilters}
            >
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
                            options={(value as NationalityOrResidenceOrCountry)?.enum || []}
                            onChange={(changeValue) => {
                                syncFiltersWithUrl(changeValue, `creators_${key}`);
                                dispatch(
                                    actions.change({
                                        key: 'creators',
                                        value: {
                                            [key]: changeValue,
                                        },
                                    })
                                );
                            }}
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
                <Button variant="contained" onClick={handleResetFilters} fullWidth>
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
