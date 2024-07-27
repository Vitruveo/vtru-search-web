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
import { minPrice, Range } from '../components/Range';
import { useSelector } from '@/store/hooks';
import React, { useEffect, useState } from 'react';
import { FilterSliceState } from '@/features/filters/types';

const Filters = () => {
    const [isNuditychecked, setIsNudityChecked] = useState<boolean>(false);
    const [isAIchecked, setIsAIChecked] = useState<boolean>(true);
    const [isVideoChecked, setIsVideoChecked] = useState<boolean>(false);
    const [isPhotographyChecked, setIsPhotographyChecked] = useState<boolean>(false);
    const [isHorizontalChecked, setIsHorizontalChecked] = useState<boolean>(false);
    const [isVerticalChecked, setIsVerticalChecked] = useState<boolean>(false);

    const [contextFilters, setContextFilters] = useState<number>();
    const [taxonomyFilters, setTaxonomyFilters] = useState<number>();
    const [creatorsFilters, setCreatorsFilters] = useState<number>();

    const dispatch = useDispatch();
    const { language } = useI18n();
    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

    const values = useSelector((state) => state.filters);
    const price = useSelector((state) => state.filters.price);
    const { tags, maxPrice } = useSelector((state) => state.assets);

    const getTotalFiltersApplied = (fieldName: keyof FilterSliceState) => {
        return Object.entries(values[fieldName]).reduce((acc, [_key, arrayfield]) => {
            return Array.isArray(arrayfield) ? acc + arrayfield.length : acc;
        }, 0);
    };

    useEffect(() => {
        if (price.min === minPrice && price.max === minPrice) dispatch(actions.changePrice({ min: 0, max: maxPrice }));
    }, [dispatch]);

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
        setIsNudityChecked(values.shortCuts.nudity === 'yes');
        setIsAIChecked(values.shortCuts.aiGeneration === 'full');
    }, [values.context, values.taxonomy, values.creators, values.shortCuts]);

    const afterPriceChange = (min: number, max: number) => {
        dispatch(
            actions.changePrice({
                min,
                max,
            })
        );
    };

    const generateQueryParam = (key: string, value: string) => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set(key, value);
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
    };

    const handleChangeNudity = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsNudityChecked(event.target.checked);
        dispatch(actions.changeShortCut({ key: 'nudity', value: event.target.checked ? 'yes' : 'no' }));
        generateQueryParam('nudity', event.target.checked ? 'yes' : 'no');
    };
    const handleChangeAI = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsAIChecked(event.target.checked);
        dispatch(actions.changeShortCut({ key: 'aiGeneration', value: event.target.checked ? 'full' : 'none' }));
        generateQueryParam('aiGeneration', event.target.checked ? 'full' : 'none');
    };
    const handleResetFilters = () => {
        const searchParams = new URLSearchParams();
        window.history.pushState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
        dispatch(actions.reset({ maxPrice }));
    };

    const handleChangeVideo = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(actions.change({ key: 'taxonomy', value: { category: event.target.checked ? ['video'] : [] } }));
        setIsVideoChecked(event.target.checked);
    };
    const handleChangePhotography = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(actions.change({ key: 'taxonomy', value: { category: event.target.checked ? ['photography'] : [] } }));
        setIsPhotographyChecked(event.target.checked);
    };
    const handleChangeHorizontal = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            actions.change({ key: 'context', value: { orientation: event.target.checked ? ['horizontal'] : [] } })
        );
        setIsHorizontalChecked(event.target.checked);
    };
    const handleChangeVertical = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(actions.change({ key: 'context', value: { orientation: event.target.checked ? ['vertical'] : [] } }));
        setIsVerticalChecked(event.target.checked);
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
                onChange={(e) => dispatch(actions.changeName({ name: e.target.value }))}
            />

            <FormGroup sx={{ display: 'flex', flexDirection: 'row', marginLeft: '8%' }}>
                <Box display={'flex'} flexDirection={'column'}>
                    <FormControlLabel
                        control={<Checkbox onChange={handleChangeNudity} checked={isNuditychecked} />}
                        label={'Nudity'}
                    />
                    <FormControlLabel
                        control={<Checkbox onChange={handleChangeVideo} checked={isVideoChecked} />}
                        label={'Video'}
                    />
                    <FormControlLabel
                        control={<Checkbox onChange={handleChangeVertical} checked={isVerticalChecked} />}
                        label={'Vertical'}
                    />
                </Box>
                <Box display={'flex'} flexDirection={'column'}>
                    <FormControlLabel
                        control={<Checkbox onChange={handleChangeAI} checked={isAIchecked} />}
                        label={'AI'}
                    />
                    <FormControlLabel
                        control={<Checkbox onChange={handleChangePhotography} checked={isPhotographyChecked} />}
                        label={'Photography'}
                    />
                    <FormControlLabel
                        control={<Checkbox onChange={handleChangeHorizontal} checked={isHorizontalChecked} />}
                        label={'Horizontal'}
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
