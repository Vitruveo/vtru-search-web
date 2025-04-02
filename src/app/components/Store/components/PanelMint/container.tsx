import { useEffect, useReducer } from 'react';
import { confetti } from '@tsparticles/confetti';
import { useAccount, useConnectorClient } from 'wagmi';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';

import { PanelMint } from './component';
import { getAvailableCredits, getPlatformFeeBasisPoints, issueLicenseUsingCredits } from '@/services/web3/mint';
import { useDispatch } from 'react-redux';
import { actions } from '@/features/store/slice';
import { getFeesFromGrid, getFeesFromVideo } from '@/services/assets';
import { TypeActions, initialState, reducer } from './slice';
import cookie from 'cookiejs';
import { Asset } from '@/features/assets/types';
import { EXPLORER_URL } from '@/constants/web3';
import { useSelector } from '@/store/hooks';
import { useAssetLicenses } from '@/app/hooks/useAssetLicenses';
import { getPriceWithMarkup } from '@/utils/assets';

const showConfetti = () => {
    confetti({
        particleCount: 500,
        spread: 250,
        origin: { x: 0.5, y: 0.5 },
    });
};

interface Props {
    asset: Asset;
    image: string;
    creatorAvatar: string;
    creatorName: string;
    size: {
        width: number;
        height: number;
    };
}

export const Container = ({ asset, image, size, creatorAvatar, creatorName }: Props) => {
    const dispatch = useDispatch();
    const coockieGrid = cookie.get('grid') as string;
    const coockieVideo = cookie.get('video') as string;
    const searchParams = useSearchParams();

    const { isConnected, address, chain } = useAccount();
    const { data: client } = useConnectorClient();

    const [state, dispatchAction] = useReducer(reducer, initialState);
    const { lastAssets, lastAssetsLoading } = useSelector((reduxState) => reduxState.store);
    const assetLicenses = useAssetLicenses(asset._id);
    const stores = useSelector((stateRx) => stateRx.stores.currentDomain);

    useEffect(() => {
        if (searchParams.get('type') === 'digital') {
            handleOpenModalLicense();
        }

        if (asset.assetMetadata?.context?.formData?.orientation === 'vertical') {
            dispatchAction({
                type: TypeActions.SET_EXPANDED_ACCORDION,
                payload: 'print',
            });
        }
    }, []);

    useEffect(() => {
        if (coockieGrid) {
            getFeesFromGrid(coockieGrid).then((response) => {
                if (response?.data && response.data.grid.search.grid.length > 0) {
                    dispatchAction({
                        type: TypeActions.SET_FEES_GRID,
                        payload: response.data.grid.search.grid[0].fees,
                    });
                }
            });
        }

        if (coockieVideo) {
            getFeesFromVideo(coockieVideo).then((response) => {
                if (response?.data && response.data.video.search.video.length > 0) {
                    dispatchAction({
                        type: TypeActions.SET_FEES_VIDEO,
                        payload: response.data.video.search.video[0].fees,
                    });
                }
            });
        }
    }, []);

    useEffect(() => {
        if (state.credits && (state.feesGrid || state.feesVideo)) {
            const value = (state.credits * (state.feesGrid || state.feesVideo)) / 100;

            dispatchAction({
                type: TypeActions.SET_FEES_CURATOR,
                payload: { porcent: state.feesGrid || state.feesVideo, value },
            });
            dispatchAction({ type: TypeActions.SET_TOTAL_FEE, payload: state.totalFee + value });
        }
    }, [state.credits, state.feesGrid, state.feesVideo]);

    useEffect(() => {
        // fetchAssetLicenses();

        if (!client) {
            dispatchAction({ type: TypeActions.DISCONNECT, payload: null });
            return;
        }

        if (!chain || !chain.name.toLowerCase().includes('vitruveo')) return;

        fetchAvailableCredits();

        if ((coockieGrid || coockieVideo) && state.feesCurator.value) {
            if (!assetLicenses) return;

            getPlatformFeeBasisPoints({ client: client }).then((feeBasisPoints) => {
                const platformFeeValue = (assetLicenses.credits * feeBasisPoints) / 10_000;

                dispatchAction({
                    type: TypeActions.SET_BUY_CAPABILITY,
                    payload: {
                        totalAmount:
                            state.feesCurator.value +
                            getPriceWithMarkup({
                                assetPrice: assetLicenses.credits,
                                stores,
                                assetCreatedBy: asset?.framework?.createdBy,
                            }) +
                            platformFeeValue,
                    },
                });
            });
        }
    }, [client, chain, state.feesCurator.value, assetLicenses]);

    useEffect(() => {
        if (assetLicenses && client) {
            (async () => {
                const feeBasisPoints = await getPlatformFeeBasisPoints({ client: client }); // 200
                const platformFeeValue = (assetLicenses.credits * feeBasisPoints) / 10_000; // 300 cents
                const totalPlatformFee =
                    getPriceWithMarkup({
                        stores,
                        assetPrice: assetLicenses.credits,
                        assetCreatedBy: asset?.framework?.createdBy,
                    }) + platformFeeValue; // 15300 cents
                const curatorFeeValue = state.feesCurator.value * 100; // 100 cents

                dispatchAction({
                    type: TypeActions.SET_PLATFORM_FEE,
                    payload: { porcent: feeBasisPoints / 100, value: platformFeeValue / 100 },
                });
                dispatchAction({
                    type: TypeActions.SET_TOTAL_FEE,
                    payload: (totalPlatformFee + curatorFeeValue) / 100,
                });

                dispatchAction({
                    type: TypeActions.SET_CREDITS,
                    payload:
                        getPriceWithMarkup({
                            stores,
                            assetPrice: assetLicenses.credits,
                            assetCreatedBy: asset?.framework?.createdBy,
                        }) / 100,
                });

                dispatchAction({
                    type: TypeActions.SET_LOADING,
                    payload: { state: false, message: '' },
                });
            })();
        }
    }, [assetLicenses, client]);

    const fetchAssetLicenses = async () => {
        dispatchAction({ type: TypeActions.SET_AVAILABLE, payload: false });

        if (!asset.consignArtwork?.assetKey) {
            dispatchAction({ type: TypeActions.SET_AVAILABLE, payload: false });
            return;
        }

        if (asset?.mintExplorer?.transactionHash) {
            dispatchAction({ type: TypeActions.SET_AVAILABLE, payload: false });

            dispatchAction({
                type: TypeActions.SET_LOADING,
                payload: { state: false, message: '' },
            });
            return;
        }

        if (assetLicenses) {
            if (assetLicenses.available) {
                dispatchAction({ type: TypeActions.SET_AVAILABLE, payload: true });
            }
        } else {
            dispatchAction({
                type: TypeActions.SET_LOADING,
                payload: { state: false, message: '' },
            });
            toast(`Error getting asset licenses (access logs for more details)`, {
                type: 'error',
            });
        }
    };

    const fetchAvailableCredits = async () => {
        // dispatchAction({ type: TypeActions.SET_AVAILABLE, payload: false });

        return getAvailableCredits({ wallet: address!, client: client! })
            .then((availableCredits) => {
                dispatchAction({
                    type: TypeActions.SET_WALLET_CREDITS,
                    payload: availableCredits.usdCredits,
                });

                dispatchAction({
                    type: TypeActions.SET_LOADING,
                    payload: { state: false, message: '' },
                });
            })
            .catch(() => {
                dispatchAction({
                    type: TypeActions.SET_LOADING,
                    payload: { state: false, message: '' },
                });
                toast(`Error getting available credits (access logs for more details)`, {
                    type: 'error',
                });
            });
    };

    const handleMintNFT = () => {
        dispatchAction({
            type: TypeActions.SET_LOADING,
            payload: { state: true, message: 'Minting Digital Assets...' },
        });

        if (!asset.consignArtwork?.assetKey) {
            dispatchAction({
                type: TypeActions.SET_LOADING,
                payload: { state: false, message: '' },
            });
            return;
        }

        return issueLicenseUsingCredits({
            assetKey: asset.consignArtwork.assetKey,
            assetCreatedBy: asset?.framework?.createdBy,
            client: client!,
            stackId: coockieGrid || coockieVideo || '',
            curatorFee: state.feesCurator.value,
            currentStore: stores,
        })
            .then((response) => {
                dispatchAction({
                    type: TypeActions.SET_LOADING,
                    payload: { state: false, message: '' },
                });

                dispatchAction({ type: TypeActions.SET_OPEN_MODAL_LICENSE, payload: false });
                showConfetti();

                dispatchAction({ type: TypeActions.SET_AVAILABLE, payload: false });
                dispatchAction({ type: TypeActions.SET_CREDITS, payload: 0 });

                dispatchAction({
                    type: TypeActions.SET_LINK,
                    payload: `${EXPLORER_URL}/tx/${response.data.hash}`,
                });
                dispatchAction({ type: TypeActions.SET_OPEN_MODAL_MINTED, payload: true });
            })
            .catch(() => {
                dispatchAction({
                    type: TypeActions.SET_LOADING,
                    payload: { state: false, message: '' },
                });
                toast(`Error minting Digital Assets (access logs for more details)`, {
                    type: 'error',
                });
            });
    };

    const handleCloseModalMinted = async () => {
        dispatchAction({ type: TypeActions.SET_OPEN_MODAL_MINTED, payload: false });
        dispatch(actions.getAssetRequest({ id: asset._id }));

        // await fetchAssetLicenses();
        if (client) {
            await fetchAvailableCredits();
        }
    };

    const handleCloseModalLicense = async () => {
        dispatchAction({ type: TypeActions.SET_OPEN_MODAL_LICENSE, payload: false });
    };

    const handleCloseModalPrintLicense = async () => {
        dispatchAction({ type: TypeActions.SET_OPEN_MODAL_PRINT_LICENSE, payload: false });
    };

    const handleOpenModalBuyVUSD = () => {
        dispatchAction({ type: TypeActions.SET_OPEN_MODAL_BUY_VUSD, payload: true });
    };

    const handleCloseModalBuyVUSD = () => {
        dispatchAction({ type: TypeActions.SET_OPEN_MODAL_BUY_VUSD, payload: false });
    };

    const handleOpenModalPrintLicense = () => {
        // connect wallet if not connected
        // if (!isConnected && openConnectModal) {
        //     openConnectModal();
        // }

        dispatchAction({ type: TypeActions.SET_OPEN_MODAL_PRINT_LICENSE, payload: true });
    };

    const handleOpenModalLicense = () => {
        // connect wallet if not connected
        // if (!isConnected && openConnectModal) {
        //     openConnectModal();
        // }

        dispatchAction({ type: TypeActions.SET_OPEN_MODAL_LICENSE, payload: true });
    };

    const handleAccordionChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        dispatchAction({
            type: TypeActions.SET_EXPANDED_ACCORDION,
            payload: isExpanded ? panel : false,
        });
    };

    return (
        <PanelMint
            image={image}
            size={size}
            creatorAvatar={creatorAvatar}
            creatorName={creatorName}
            data={{
                asset,
                license: asset.licenses?.nft.license,
                credits: state.credits,
                walletCredits: state.walletCredits,
                blocked: asset.consignArtwork?.status === 'blocked',
                available: asset.consignArtwork?.status === 'active' && state.available,
                notListed: !asset?.contractExplorer?.transactionHash,
                assetTitle: asset.assetMetadata?.context.formData.title,
                address,
                isConnected,
                loading: state.loading,
                link: state.link,
                stateModalMinted: state.openModalMinted,
                stateModalLicense: state.openModalLicense,
                stateModalPrintLicense: state.openModalPrintLicense,
                chain: chain ? chain.name.toLowerCase().includes('vitruveo') : false,
                platformFee: state.platformFee,
                totalFee: state.totalFee,
                feesCurator: state.feesCurator,
                buyCapability: state.buyCapability,
                loadingBuy: state.loadingBuy,
                expandedAccordion: state.expandedAccordion,
                lastAssets,
                lastAssetsLoading,
                assetLicenses,
                openModalBuyVUSD: state.openModalBuyVUSD,
            }}
            actions={{
                handleMintNFT,
                handleCloseModalMinted,
                handleCloseModalPrintLicense,
                handleCloseModalLicense,
                handleOpenModalLicense,
                handleOpenModalBuyVUSD,
                handleCloseModalBuyVUSD,
                handleAccordionChange,
                handleOpenModalPrintLicense,
            }}
        />
    );
};
