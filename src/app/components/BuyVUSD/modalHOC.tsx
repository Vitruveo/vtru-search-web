import { useEffect, useState } from 'react';
import { useAccount, useBalance, useConnectorClient } from 'wagmi';
import { confetti } from '@tsparticles/confetti';

import BuyVUSDModal from './modal';
import {
    buyVUSDWithUSDC,
    buyVUSDWithVTRU,
    getBalanceVUSD,
    getBalanceUSDC,
    getVtruConversion,
} from '@/services/web3/vusd';

interface BuyVUSDModalHOCProps {
    isOpen: boolean;
    onClose: () => void;
}

export const defaultVusdAmount = 50;

export default function BuyVUSDModalHOC({ isOpen, onClose }: BuyVUSDModalHOCProps) {
    const { address, chain, isConnected } = useAccount();
    const balance = useBalance({
        address,
        chainId: chain?.id,
    });
    const currentChain = chain?.name.toLowerCase();
    const { data: client } = useConnectorClient();

    const [selectedValue, setSelectedValue] = useState('USDC');

    const [vusdRequired, setVusdRequired] = useState(defaultVusdAmount);
    const [usdcConverted, setUsdcConverted] = useState(defaultVusdAmount);
    const [vtruConverted, setVtruConverted] = useState(0);

    const [loading, setLoading] = useState(false);
    const [loadingConversion, setLoadingConversion] = useState(false);

    const [balanceVUSD, setBalanceVUSD] = useState({
        symbol: 'VUSD',
        value: 0,
    });

    const [balanceUSDC, setBalanceUSDC] = useState({
        symbol: 'USDC',
        value: 0,
    });

    useEffect(() => {
        if (!isOpen) {
            setVusdRequired(defaultVusdAmount);
            setUsdcConverted(defaultVusdAmount);
            setVtruConverted(0);
        }

        if (!isOpen || !client || !chain) return;

        if (chain.name.toLowerCase().includes('vitruveo')) {
            setBalanceUSDC({
                symbol: 'USDC',
                value: 0,
            });

            getBalanceVUSD({ client: client! }).then((result) => {
                setBalanceVUSD({
                    symbol: 'VUSD',
                    value: result,
                });
            });

            setLoadingConversion(true);
            getVtruConversion({ client: client!, vusdAmount: vusdRequired })
                .then((result) => {
                    setVtruConverted(result);
                })
                .finally(() => {
                    setLoadingConversion(false);
                });

            setUsdcConverted(vusdRequired);
        } else {
            setBalanceVUSD({
                symbol: 'VUSD',
                value: 0,
            });

            getBalanceUSDC({ client: client!, chainName: chain.name }).then((result) => {
                setBalanceUSDC({
                    symbol: 'USDC',
                    value: result,
                });
            });

            setUsdcConverted(vusdRequired);
        }
    }, [isOpen, client, currentChain, chain, vusdRequired]);

    const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
        // only numbers
        const value = event.target.value.replace(/\D/g, '');

        if (value && parseInt(value) < 1) event.target.value = '1';
        setVusdRequired(Number(value));
        setUsdcConverted(Number(value));

        if (currentChain && currentChain.includes('vitruveo')) {
            setLoadingConversion(true);
            getVtruConversion({ client: client!, vusdAmount: Number(value) })
                .then((result) => {
                    setVtruConverted(result);
                })
                .finally(() => {
                    setLoadingConversion(false);
                });
        }
    };

    const handleBlurQuantity = (event: React.FocusEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/\D/g, '');

        if (!value) {
            event.target.value = '1';
            setUsdcConverted(1);
            if (currentChain && currentChain.includes('vitruveo')) {
                setLoadingConversion(true);
                getVtruConversion({ client: client!, vusdAmount: 1 })
                    .then((result) => {
                        setVtruConverted(result);
                    })
                    .finally(() => {
                        setLoadingConversion(false);
                    });
            }
        } else {
            event.target.value = Math.round(parseFloat(value)).toString();
            setUsdcConverted(Math.round(parseFloat(value)));
        }
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => setSelectedValue(event.target.value);

    const handleBuy = () => {
        if (selectedValue === 'USDC') {
            setLoading(true);

            buyVUSDWithUSDC({
                client: client!,
                usdcAmount: usdcConverted,
                chainName: chain!.name,
            })
                .then((response) => {
                    if (currentChain?.includes('vitruveo')) {
                        new Promise((resolve) => {
                            const interval = setInterval(() => {
                                getBalanceVUSD({ client: client! }).then((result) => {
                                    if (result > balanceVUSD.value) {
                                        clearInterval(interval);
                                        setBalanceVUSD({
                                            symbol: 'VUSD',
                                            value: result,
                                        });
                                        balance.refetch();
                                        resolve(true);
                                    }
                                });
                            }, 1_000);
                        })
                            .then(() => {
                                setLoading(false);

                                confetti({
                                    particleCount: 100,
                                    spread: 70,
                                    origin: { y: 0.6 },
                                });
                            })
                            .catch(() => {
                                setLoading(false);
                            });
                    } else {
                        new Promise((resolve) => {
                            const interval = setInterval(() => {
                                getBalanceUSDC({ client: client!, chainName: chain!.name }).then((result) => {
                                    if (result < balanceUSDC.value) {
                                        clearInterval(interval);
                                        setBalanceUSDC({
                                            symbol: 'USDC',
                                            value: result,
                                        });
                                        balance.refetch();
                                        resolve(true);
                                    }
                                });
                            }, 1_000);
                        })
                            .then(() => {
                                setLoading(false);

                                confetti({
                                    particleCount: 100,
                                    spread: 70,
                                    origin: { y: 0.6 },
                                });
                            })
                            .catch(() => {
                                setLoading(false);
                            });
                    }
                })
                .catch((error) => {
                    console.log('buyVUSDWithUSDC error', error);

                    setLoading(false);
                });
        }

        if (selectedValue === 'VTRU') {
            setLoading(true);

            buyVUSDWithVTRU({ client: client!, vusdAmount: vusdRequired, vtruConverted })
                .then(() => {
                    getBalanceVUSD({ client: client! }).then((result) => {
                        setBalanceVUSD({
                            symbol: 'VUSD',
                            value: result,
                        });
                    });

                    new Promise((resolve) => {
                        const interval = setInterval(() => {
                            getBalanceVUSD({ client: client! }).then((result) => {
                                if (result > balanceVUSD.value) {
                                    clearInterval(interval);
                                    setBalanceVUSD({
                                        symbol: 'VUSD',
                                        value: result,
                                    });
                                    balance.refetch();
                                    resolve(true);
                                }
                            });
                        }, 1_000);
                    }).finally(() => {
                        setLoading(false);

                        confetti({
                            particleCount: 100,
                            spread: 70,
                            origin: { y: 0.6 },
                        });
                    });
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    };

    const value = Math.trunc(Number(balance.data?.value || '0') / 10 ** 18);
    const valueUSDC = Math.trunc(balanceUSDC.value);

    return (
        <BuyVUSDModal
            isOpen={isOpen}
            onClose={onClose}
            data={{
                balance: {
                    symbol: currentChain?.includes('vitruveo') ? balance.data?.symbol : balanceUSDC.symbol,
                    value: currentChain?.includes('vitruveo') ? value.toFixed(4) : valueUSDC.toFixed(4),
                },
                balanceVUSD: {
                    symbol: balanceVUSD.symbol,
                    value: balanceVUSD.value,
                },
                loading,
                currentChain,
                isConnected,
                selectedValue,
                usdcConverted,
                vtruConverted,
                disabled:
                    !isConnected ||
                    loading ||
                    loadingConversion ||
                    (currentChain?.includes('vitruveo') ? value < vtruConverted : valueUSDC < usdcConverted),
                insufficientBalance: currentChain?.includes('vitruveo')
                    ? value < vtruConverted
                    : valueUSDC < usdcConverted,
                loadingConversion: loadingConversion,
            }}
            actions={{
                handleChangeQuantity,
                handleBlurQuantity,
                handleRadioChange,
                handleBuy,
            }}
        />
    );
}
