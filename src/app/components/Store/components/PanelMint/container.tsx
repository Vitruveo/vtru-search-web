import { useEffect, useReducer } from 'react';
import { confetti } from '@tsparticles/confetti';
import { useAccount, useConnectorClient } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { toast } from 'react-toastify';

import { PanelMint } from './component';
import {
    getAssetLicenses,
    getAvailableCredits,
    getBuyCapabilityInCents,
    getBuyerBalancesInCents,
    getPlatformFeeBasisPoints,
    issueLicenseUsingCredits,
} from '@/services/web3/mint';
import { useDispatch } from 'react-redux';
import { actions } from '@/features/store/slice';
import { getFeesFromGrid, getFeesFromVideo } from '@/services/assets';
import { TypeActions, initialState, reducer } from './slice';
import cookie from 'cookiejs';
import { Asset } from '@/features/assets/types';
import { EXPLORER_URL } from '@/constants/web3';

const showConfetti = () => {
    confetti({
        particleCount: 500,
        spread: 250,
        origin: { x: 0.5, y: 0.5 },
    });
};

interface Props {
    asset: Asset;
}

export const Container = ({ asset }: Props) => {
    const dispatch = useDispatch();
    const coockieGrid = cookie.get('grid') as string;
    const coockieVideo = cookie.get('video') as string;

    const { isConnected, address, chain } = useAccount();
    const { data: client } = useConnectorClient();
    const { openConnectModal } = useConnectModal(); // Hook para abrir o modal

    const [state, dispatchAction] = useReducer(reducer, initialState);

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
        if (!client) {
            dispatchAction({ type: TypeActions.DISCONNECT, payload: null });
            return;
        }

        if (!chain || !chain.name.toLowerCase().includes('vitruveo')) return;

        fetchAssetLicenses();
        fetchAvailableCredits();
        fetchBuyerBalancesInCents();

        if ((coockieGrid || coockieVideo) && state.feesCurator.value) {
            fetchBuyCapabilityInCents();
        }

        if (!coockieGrid && !coockieVideo) {
            fetchBuyCapabilityInCents();
        }
    }, [client, chain, state.feesCurator.value]);

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

        const feeBasisPoints = await getPlatformFeeBasisPoints({ client: client! }); // 200

        return getAssetLicenses({ assetKey: asset.consignArtwork.assetKey, client: client! })
            .then((assetLicenses) => {
                const platformFeeValue = (assetLicenses.credits * feeBasisPoints) / 10_000; // 300 cents
                const totalPlatformFee = assetLicenses.credits + platformFeeValue; // 15300 cents
                const curatorFeeValue = state.feesCurator.value * 100; // 100 cents

                dispatchAction({
                    type: TypeActions.SET_PLATFORM_FEE,
                    payload: { porcent: feeBasisPoints / 100, value: platformFeeValue / 100 },
                });
                dispatchAction({
                    type: TypeActions.SET_TOTAL_FEE,
                    payload: (totalPlatformFee + curatorFeeValue) / 100,
                });

                if (assetLicenses.available) {
                    dispatchAction({ type: TypeActions.SET_AVAILABLE, payload: true });
                }
                dispatchAction({
                    type: TypeActions.SET_CREDITS,
                    payload: assetLicenses.credits / 100,
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
                toast(`Error getting asset licenses (access logs for more details)`, {
                    type: 'error',
                });
            });
    };

    const fetchBuyCapabilityInCents = async () => {
        dispatchAction({ type: TypeActions.SET_AVAILABLE, payload: false });
        dispatchAction({ type: TypeActions.SET_LOADING_BUY, payload: true });

        const feeBasisPoints = await getPlatformFeeBasisPoints({ client: client! });
        const assetLicenses = await getAssetLicenses({
            assetKey: asset.consignArtwork!.assetKey,
            client: client!,
        });

        const platformFeeValue = (assetLicenses.credits * feeBasisPoints) / 10_000;

        return getBuyCapabilityInCents({
            wallet: address!,
            vault: asset.vault.vaultAddress!,
            price: assetLicenses.credits,
            fee: platformFeeValue,
            client: client!,
            curatorFee: state.feesCurator.value * 100,
        })
            .then((balances) => {
                dispatchAction({ type: TypeActions.SET_BUY_CAPABILITY, payload: balances });
            })
            .catch(() => {
                toast(`Error getting buy capability (access logs for more details)`, {
                    type: 'error',
                });
            })
            .finally(() => {
                dispatchAction({
                    type: TypeActions.SET_LOADING,
                    payload: { state: false, message: '' },
                });
                dispatchAction({ type: TypeActions.SET_LOADING_BUY, payload: false });
            });
    };

    const fetchBuyerBalancesInCents = () => {
        dispatchAction({ type: TypeActions.SET_AVAILABLE, payload: false });

        return getBuyerBalancesInCents({ wallet: address!, client: client! })
            .then((balances) => {
                dispatchAction({ type: TypeActions.SET_BUYER_BALANCES, payload: balances });
            })
            .catch(() => {
                toast(`Error getting buyer balances (access logs for more details)`, {
                    type: 'error',
                });
            })
            .finally(() => {
                dispatchAction({
                    type: TypeActions.SET_LOADING,
                    payload: { state: false, message: '' },
                });
            });
    };

    const fetchAvailableCredits = () => {
        dispatchAction({ type: TypeActions.SET_AVAILABLE, payload: false });

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
            client: client!,
            stackId: coockieGrid || coockieVideo || '',
            curatorFee: state.feesCurator.value,
        })
            .then((response) => {
                dispatchAction({
                    type: TypeActions.SET_LOADING,
                    payload: { state: false, message: '' },
                });
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

        await fetchAssetLicenses();
        await fetchAvailableCredits();
    };

    const handleCloseModalLicense = async () => {
        dispatchAction({ type: TypeActions.SET_OPEN_MODAL_LICENSE, payload: false });
    };

    const handleOpenModalLicense = () => {
        // connect wallet if not connected
        if (!isConnected && openConnectModal) {
            openConnectModal();
        }

        dispatchAction({ type: TypeActions.SET_OPEN_MODAL_LICENSE, payload: true });
    };

    return (
        <PanelMint
            data={{
                license: asset.licenses?.nft.license,
                credits: state.credits,
                walletCredits: state.walletCredits,
                blocked: asset.consignArtwork?.status === 'blocked',
                available: asset.consignArtwork?.status === 'active' && state.available,
                notListed: !asset?.contractExplorer?.transactionHash,
                address,
                isConnected,
                loading: state.loading,
                link: state.link,
                stateModalMinted: state.openModalMinted,
                stateModalLicense: state.openModalLicense,
                chain: chain ? chain.name.toLowerCase().includes('vitruveo') : false,
                platformFee: state.platformFee,
                totalFee: state.totalFee,
                feesCurator: state.feesCurator,
                buyerBalances: state.buyerBalances,
                buyCapability: state.buyCapability,
                loadingBuy: state.loadingBuy,
            }}
            actions={{
                handleMintNFT,
                handleCloseModalMinted,
                handleCloseModalLicense,
                handleOpenModalLicense,
            }}
        />
    );
};
