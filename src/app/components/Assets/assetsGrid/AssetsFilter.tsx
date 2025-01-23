import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IconSearch, IconX } from '@tabler/icons-react';
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
    IconButton,
    useTheme,
} from '@mui/material';

import chunkArray from '@/utils/chunkArray';
import validateCryptoAddress from '@/utils/adressValidate';
import generateQueryParam from '@/utils/generateQueryParam';
import assetsMetadata from '@/mock/assetsMetadata.json';
import { useSelector } from '@/store/hooks';
import { actions } from '@/features/filters/slice';
import { actions as actionsLayout } from '@/features/layout';
import { actions as actionsAssets } from '@/features/assets/slice';
import { FilterSliceState } from '@/features/filters/types';

import type {
    AssetsMetadata,
    ItemsOrCultureOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrEthnicityOrGenderOrBlockchain,
    MoodOrMediumOrStyle,
    NationalityOrResidenceOrCountry,
} from './types';
import type { Context, Taxonomy, Creators } from '../types';
import PortfolioItem from '../components/PortfolioItem';
import { ContextItem } from '../components/ContextItem';
import { TaxonomyItem } from '../components/TaxonomyItem';
import { CreatorsItem } from '../components/CreatorsItem';
import { Range } from '../components/Range';
import { Wallets } from '../components/Wallets';
import { AssetFilterAccordion } from './AssetFilterAccordion';
import Version from '../../Version';
import { LicenseItem } from '../components/LicenseItem';

const Filters = () => {
    const params = new URLSearchParams(window.location.search);

    const grid = params.get('grid');
    const slideshow = params.get('slideshow');
    const video = params.get('video');

    const [isHideNuditychecked, setIsHideNudityChecked] = useState(false);
    const [isHideAIchecked, setIsHideAIChecked] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedObjectTypes, setSelectedObjectTypes] = useState<string[]>([]);

    const [contextFilters, setContextFilters] = useState<number>();
    const [taxonomyFilters, setTaxonomyFilters] = useState<number>();
    const [creatorsFilters, setCreatorsFilters] = useState<number>();
    const [isIncludeSold, setIsIncludeSold] = useState<boolean>(false);
    const [hasBts, setHasBts] = useState<boolean>(false);

    const theme = useTheme();
    const dispatch = useDispatch();
    const { language } = useI18n();
    const isSmallScreen = useMediaQuery((them: Theme) => them.breakpoints.down('lg'));

    const values = useSelector((state) => state.filters);
    const { tags, maxPrice, sort } = useSelector((state) => state.assets);
    const { wallets } = useSelector((state) => state.filters.portfolio);

    const { licenseChecked } = useSelector((state) => state.filters);

    const getTotalFiltersApplied = (fieldName: keyof FilterSliceState) => {
        return Object.entries(values[fieldName]).reduce((acc, [_key, arrayfield]) => {
            return Array.isArray(arrayfield) ? acc + arrayfield.length : acc;
        }, 0);
    };

    useEffect(() => {
        if (grid || video || slideshow) return;

        setIsIncludeSold(sort.sold === 'yes' ? true : false);
    }, [sort]);

    useEffect(() => {
        setHasBts(values.hasBts === 'yes' ? true : false);
    }, [values.hasBts]);

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
        setIsHideNudityChecked(values.taxonomy.nudity.includes('no'));
        setIsHideAIChecked(
            values.taxonomy.aiGeneration.includes('partial') && values.taxonomy.aiGeneration.includes('none')
        );
        setSelectedCategories(
            [
                values.taxonomy.category.includes('photography') && 'photography',
                values.taxonomy.category.includes('video') && 'video',
            ].filter(Boolean) as string[]
        );
        setSelectedObjectTypes(
            [
                values.taxonomy.objectType.includes('physicalart') && 'physicalart',
                values.taxonomy.objectType.includes('digitalart') && 'digitalart',
            ].filter(Boolean) as string[]
        );
    }, [values.context, values.taxonomy, values.creators, values.shortCuts]);

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
            if (key !== 'grid' && key !== 'video' && !key.includes('_hidden')) params.delete(key);
            if (key.includes('_hidden')) params.set(key, params.get(key) || '');
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

        params.set('sort_order', 'latest');
        params.set('sort_sold', 'no');
        params.set('taxonomy_aiGeneration', 'partial,none');
        params.set('taxonomy_nudity', 'no');
        params.set('groupByCreator', 'all');
        params.delete('creatorId');

        window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);

        dispatch(actionsAssets.resetGroupByCreator());
        dispatch(actions.reset({ maxPrice }));
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
        setIsHideNudityChecked(event.target.checked);
        generateQueryParam('taxonomy_nudity', event.target.checked ? 'no' : '');
        dispatch(actions.change({ key: 'taxonomy', value: { nudity: event.target.checked ? ['no'] : [] } }));
    };
    const handleChangeAI = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsHideAIChecked(event.target.checked);
        syncFiltersWithUrl(event.target.checked ? ['partial', 'none'] : [], 'taxonomy_aiGeneration');
        dispatch(
            actions.change({
                key: 'taxonomy',
                value: { aiGeneration: event.target.checked ? ['partial', 'none'] : [] },
            })
        );
    };
    const handleChangePhysicalArt = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedObjectTypes = event.target.checked
            ? [...selectedObjectTypes, 'physicalart']
            : selectedObjectTypes.filter((type) => type !== 'physicalart');
        setSelectedObjectTypes(updatedObjectTypes);
        syncFiltersWithUrl(updatedObjectTypes, 'taxonomy_objectType');
        dispatch(actions.change({ key: 'taxonomy', value: { objectType: updatedObjectTypes } }));
    };
    const handleChangePhotography = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedCategories = event.target.checked
            ? [...selectedCategories, 'photography']
            : selectedCategories.filter((type) => type !== 'photography');
        setSelectedCategories(updatedCategories);
        syncFiltersWithUrl(updatedCategories, 'taxonomy_category');
        dispatch(actions.change({ key: 'taxonomy', value: { category: updatedCategories } }));
    };
    const handleChangeAnimation = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedCategories = event.target.checked
            ? [...selectedCategories, 'video']
            : selectedCategories.filter((type) => type !== 'video');
        setSelectedCategories(updatedCategories);
        syncFiltersWithUrl(updatedCategories, 'taxonomy_category');
        dispatch(actions.change({ key: 'taxonomy', value: { category: updatedCategories } }));
    };
    const handleChangeDigitalArt = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedObjectTypes = event.target.checked
            ? [...selectedObjectTypes, 'digitalart']
            : selectedObjectTypes.filter((type) => type !== 'digitalart');
        setSelectedObjectTypes(updatedObjectTypes);
        syncFiltersWithUrl(updatedObjectTypes, 'taxonomy_objectType');
        dispatch(actions.change({ key: 'taxonomy', value: { objectType: updatedObjectTypes } }));
    };
    const handleChangeIsIncludeSold = () => {
        setIsIncludeSold(!isIncludeSold);
        generateQueryParam('sort_sold', isIncludeSold ? 'no' : 'yes');
        dispatch(actionsAssets.setSort({ order: sort.order, sold: isIncludeSold ? 'no' : 'yes' }));
    };
    const handleChangeHasBTS = () => {
        setHasBts(!hasBts);
        generateQueryParam('hasBts', hasBts ? '' : 'yes');
        dispatch(actions.changeHasBts(hasBts ? '' : 'yes'));
    };

    const handleAddWallet = (value?: string) => {
        if (value) {
            dispatch(actions.changePortfolioWallets({ wallets: [...wallets, value] }));
        }
    };

    const handleChangeNftLicense = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(actions.changeLicenseChecked(event.target.value));
        generateQueryParam('licenseChecked', event.target.value);
    };

    const onCloseClick = () => {
        dispatch(actionsLayout.toggleSidebar());
    };

    return (
        <Box pt={isSmallScreen ? 2.2 : 0}>
            {isSmallScreen && (
                <Box sx={{ width: '100%', textAlign: 'right', paddingInline: 1 }}>
                    <IconButton
                        size="small"
                        sx={{ color: theme.palette.grey[300] }}
                        aria-label="close"
                        onClick={onCloseClick}
                    >
                        <IconX />
                    </IconButton>
                </Box>
            )}

            <Stack gap={2} p={1} pb={2} mt={1} height="81vh" overflow="auto">
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

                <FormGroup sx={{ display: 'flex', flexDirection: 'column', marginLeft: '5.5%' }}>
                    <Typography variant="h4">Filters</Typography>
                    <Box display="flex">
                        <FormControlLabel
                            control={<Checkbox onChange={handleChangeNudity} checked={isHideNuditychecked} />}
                            label={language['search.assetFilter.shortcut.nudity'] as string}
                            sx={{
                                width: '50%',
                            }}
                        />
                        <FormControlLabel
                            control={<Checkbox onChange={handleChangeAI} checked={isHideAIchecked} />}
                            label={language['search.assetFilter.shortcut.ia'] as string}
                            sx={{
                                width: '50%',
                            }}
                        />
                    </Box>

                    <Box display="flex">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={handleChangePhotography}
                                    checked={selectedCategories.includes('photography')}
                                />
                            }
                            label={language['search.assetFilter.shortcut.photography'] as string}
                            sx={{
                                width: '50%',
                            }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={handleChangeAnimation}
                                    checked={selectedCategories.includes('video')}
                                />
                            }
                            label={language['search.assetFilter.shortcut.animation'] as string}
                            sx={{
                                width: '50%',
                            }}
                        />
                    </Box>
                    <Box display="flex">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={handleChangePhysicalArt}
                                    checked={selectedObjectTypes.includes('physicalart')}
                                />
                            }
                            label={language['search.assetFilter.shortcut.physicalArt'] as string}
                            sx={{
                                width: '50%',
                            }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={handleChangeDigitalArt}
                                    checked={selectedObjectTypes.includes('digitalart')}
                                />
                            }
                            label={language['search.assetFilter.shortcut.digitalArt'] as string}
                            sx={{
                                width: '50%',
                            }}
                        />
                    </Box>
                    <Box display="flex">
                        <FormControlLabel
                            control={<Checkbox onChange={handleChangeIsIncludeSold} checked={isIncludeSold} />}
                            label={language['search.assetFilter.shortcut.includeSold'] as string}
                            sx={{
                                width: '50%',
                            }}
                        />
                        <FormControlLabel
                            control={<Checkbox onChange={handleChangeHasBTS} checked={hasBts} />}
                            label={language['search.assetFilter.shortcut.hasBTS'] as string}
                            sx={{
                                width: '50%',
                            }}
                        />
                    </Box>
                </FormGroup>

                <AssetFilterAccordion title="Price">
                    <Box>
                        <Typography fontSize="0.85rem" fontWeight="700" mb={1}>
                            Artwork Price
                        </Typography>
                        <Box mx={1}>
                            <Range afterChange={afterPriceChange} />
                        </Box>
                    </Box>
                </AssetFilterAccordion>

                <Divider />

                <AssetFilterAccordion title={'Licenses'}>
                    <LicenseItem licenseChecked={licenseChecked} handleChange={handleChangeNftLicense} />
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
                                    window.history.pushState(
                                        {},
                                        '',
                                        `${window.location.pathname}?${params.toString()}`
                                    );
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

                <Divider />

                <AssetFilterAccordion
                    title={language['search.assetFilter.portfolio'] as string}
                    numberOfFilters={wallets.length}
                >
                    <PortfolioItem
                        handleAddWallet={(value?: string) => {
                            handleAddWallet(value);
                            syncFiltersWithUrl(
                                [...wallets, value!].filter((item) => validateCryptoAddress(item)),
                                'portfolio_wallets'
                            );
                        }}
                    />
                    <Wallets
                        wallets={wallets}
                        onRemove={(wallet: string) => {
                            dispatch(
                                actions.changePortfolioWallets({ wallets: wallets.filter((item) => item !== wallet) })
                            );
                            syncFiltersWithUrl(
                                wallets.filter((item) => item !== wallet && validateCryptoAddress(item)),
                                'portfolio_wallets'
                            );
                        }}
                    />
                </AssetFilterAccordion>

                <Box>
                    <Button
                        sx={{
                            background: 'linear-gradient(to right, #FF0066, #9966FF)',
                            color: '#fff',
                            '&:hover': {
                                background: 'linear-gradient(to right, #cc0052, #7a52cc)',
                            },
                        }}
                        variant="contained"
                        onClick={handleResetFilters}
                        fullWidth
                    >
                        {language['search.assetFilter.resetFilters'] as string}
                    </Button>
                </Box>
                <Box display="flex" justifyContent="center">
                    <Version />
                </Box>
            </Stack>
        </Box>
    );
};

export default Filters;
