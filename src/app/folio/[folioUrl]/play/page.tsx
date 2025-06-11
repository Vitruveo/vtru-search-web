'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
// components
import { Loading } from '@/app/components/Folio/components';
import DefaultLayout from '@/app/components/Folio/Layout/Default';
import { HorizontalLayout } from '@/app/components/Folio/Layout/Horizontal';
import { VerticalLayout } from '@/app/components/Folio/Layout/Vertical';
import { ArtInterface, DisplayOptions, WindowOrientation } from '@/app/components/Folio/types';
import { buildAssetURL } from '@/app/components/Folio/utils';
// constants
import { API_BASE_URL, SEARCH_BASE_URL } from '@/constants/api';

import './index.css';

export default function Page() {
    const params = useParams();

    const [arts, setArts] = useState<ArtInterface[]>([]);
    const [time, setTime] = useState<number>(0);
    const [display, setDisplay] = useState<DisplayOptions>('alternate');
    const [isLoading, setIsLoading] = useState(true);
    const [currentArtIndex, setCurrentArtIndex] = useState(0);
    const [windowOrientation, setWindowOrientation] = useState<WindowOrientation>('horizontal');
    const [alternateSettings, setAlternateSettings] = useState({
        horizontal: 0,
        vertical: 0,
    });

    const checkOrientation = () => {
        if (window.innerWidth > window.innerHeight) {
            setWindowOrientation('horizontal');
        } else {
            setWindowOrientation('vertical');
        }
    };

    useEffect(() => {
        checkOrientation();
        window.addEventListener('resize', checkOrientation);
        return () => {
            window.removeEventListener('resize', checkOrientation);
        };
    }, []);

    /* Buscar as imagens da API */
    useEffect(() => {
        const fetchArts = async () => {
            try {
                const store = await axios.get(`${API_BASE_URL}/stores/public/${params.folioUrl}`);

                const storeFilters = store.data.data.artworks;

                const buildQuery: Record<string, any> = {};

                if (storeFilters?.searchOption === 'select') {
                    if ('include' in storeFilters) {
                        if ('artists' in storeFilters.include) {
                            buildQuery['framework.createdBy'] = {
                                $in: storeFilters.include.artists.map((artist: { value: string }) => artist.value),
                            };
                        }

                        if ('arts' in storeFilters.include) {
                            buildQuery._id = {
                                $in: storeFilters.include.arts.map((art: { value: string }) => art.value),
                            };
                        }
                    }
                } else if (storeFilters?.searchOption === 'filter') {
                    if ('context' in storeFilters) {
                        Object.entries(storeFilters.context).forEach(([key, value]) => {
                            if (key === 'colors') return;

                            if (Array.isArray(value)) {
                                buildQuery[`assetMetadata.context.formData.${key}`] = { $in: value };
                            } else {
                                buildQuery[`assetMetadata.context.formData.${key}`] = value;
                            }
                        });
                    }

                    if ('taxonomy' in storeFilters) {
                        Object.entries(storeFilters.taxonomy).forEach(([key, value]) => {
                            if (Array.isArray(value)) {
                                buildQuery[`assetMetadata.taxonomy.formData.${key}`] = { $in: value };
                            } else {
                                buildQuery[`assetMetadata.taxonomy.formData.${key}`] = value;
                            }
                        });
                    }

                    if ('artists' in storeFilters) {
                        Object.entries(storeFilters.artists).forEach(([key, value]) => {
                            if (Array.isArray(value)) {
                                buildQuery[`assetMetadata.creators.formData.${key}`] = { $in: value };
                            } else {
                                buildQuery[`assetMetadata.creators.formData.${key}`] = value;
                            }
                        });
                    }

                    if (storeFilters?.general?.shortcuts?.hideAI) {
                        buildQuery['assetMetadata.taxonomy.formData.aiGeneration'] = { $in: ['partial', 'none'] };
                    }

                    if (storeFilters?.general?.shortcuts?.hideNudity) {
                        buildQuery['assetMetadata.taxonomy.formData.nudity'] = { $in: ['no'] };
                    }

                    if (storeFilters?.general?.shortcuts?.animation) {
                        buildQuery['assetMetadata.taxonomy.formData.category'] = {
                            $in: [...(buildQuery['assetMetadata.taxonomy.formData.category.$in'] || []), 'video'],
                        };
                    }
                    if (storeFilters?.general?.shortcuts?.digitalArt) {
                        buildQuery['assetMetadata.taxonomy.formData.objectType'] = {
                            $in: [
                                ...(buildQuery['assetMetadata.taxonomy.formData.objectType.$in'] || []),
                                'digitalart',
                            ],
                        };
                    }

                    if (storeFilters?.general?.shortcuts?.photography) {
                        buildQuery['assetMetadata.taxonomy.formData.category'] = {
                            $in: [...(buildQuery['assetMetadata.taxonomy.formData.category.$in'] || []), 'photography'],
                        };
                    }
                    if (storeFilters?.general?.shortcuts?.physicalArt) {
                        buildQuery['assetMetadata.taxonomy.formData.objectType'] = {
                            $in: [
                                ...(buildQuery['assetMetadata.taxonomy.formData.objectType.$in'] || []),
                                'physicalart',
                            ],
                        };
                    }

                    if (storeFilters?.exclude?.arts) {
                        buildQuery._id = {
                            $nin: storeFilters.exclude.arts.map((art: { value: string }) => art.value),
                        };
                    }
                    if (storeFilters?.exclude?.artists) {
                        buildQuery['framework.createdBy'] = {
                            $nin: storeFilters.exclude.artists.map((artist: { value: string }) => artist.value),
                        };
                    }
                    if (storeFilters?.portfolio?.wallets) {
                        buildQuery['mintExplorer.address'] = {
                            $in: storeFilters.portfolio.wallets.map((wallet: string) => wallet),
                        };
                    }
                }

                const minPrice = storeFilters?.general?.licenses?.enabled
                    ? storeFilters?.general?.licenses?.minPrice ?? 0
                    : 0;
                const maxPrice = storeFilters?.general?.licenses?.enabled
                    ? storeFilters?.general?.licenses?.maxPrice ?? 0
                    : 0;

                const response = await axios.post(`${API_BASE_URL}/stores/public/${store.data.data._id}/play`, {
                    limit: 200,
                    page: 1,
                    query: buildQuery,
                    minPrice,
                    maxPrice,
                    name: '',
                    precision: '0.7',
                    showAdditionalAssets: false,
                    sort: {
                        order: 'latest',
                        isIncludeSold: storeFilters?.general?.shortcuts?.includeSold ?? false,
                    },
                    hasBts: storeFilters?.general?.shortcuts?.hasBTS ?? false,
                });

                const data = {
                    assets: response.data.data,
                    interval: 10,
                    display: 'right/down',
                };

                setArts(data.assets);
                setTime(Number.isNaN(data.interval) ? 10 : data.interval);
                setDisplay(data.display.toLowerCase() as DisplayOptions);

                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            } catch (error) {
                console.error(error);
            }
        };
        fetchArts();
    }, []);

    useEffect(() => {
        if (arts.length > 0) {
            const interval = setInterval(() => {
                setCurrentArtIndex((prevIndex) => (prevIndex + 1) % arts.length);
            }, time * 1000);
            return () => clearInterval(interval);
        }
    }, [arts, time]);

    useEffect(() => {
        if (display === 'alternate') {
            if (windowOrientation === 'horizontal') {
                setAlternateSettings((prevSettings) => ({
                    ...prevSettings,
                    horizontal: prevSettings.horizontal + 1,
                }));
            } else {
                setAlternateSettings((prevSettings) => ({
                    ...prevSettings,
                    vertical: prevSettings.vertical + 1,
                }));
            }
        }
    }, [currentArtIndex, display, windowOrientation]);

    if (isLoading) return <Loading />;

    /** Só devem ser calculados após o load */
    const currentArt = arts[currentArtIndex] || {
        _id: '',
        username: '',
    };
    const QRCodeValue = `${SEARCH_BASE_URL}/${currentArt.username}/${currentArt._id}`;

    const nextArtIndex = currentArtIndex === arts.length - 1 ? 0 : currentArtIndex + 1;

    const preAssetImage = buildAssetURL(arts[nextArtIndex]?.image);
    const preAvatarImage = arts[nextArtIndex]?.avatar;

    if (arts.length === 0) return <DefaultLayout />;

    if (windowOrientation === 'vertical') {
        return (
            <VerticalLayout
                {...currentArt}
                preAsset={preAssetImage}
                QRCodeValue={QRCodeValue}
                preAvatar={preAvatarImage}
                display={display}
                alternativeSetting={alternateSettings.vertical}
                hasStack={false}
            />
        );
    }

    return (
        <HorizontalLayout
            {...currentArt}
            preAsset={preAssetImage}
            QRCodeValue={QRCodeValue}
            preAvatar={preAvatarImage}
            display={display}
            alternativeSetting={alternateSettings.horizontal}
            hasStack={false}
        />
    );
}
