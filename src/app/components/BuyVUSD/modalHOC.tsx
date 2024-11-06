import { useEffect, useState } from 'react';
import { useAccount, useBalance, useConnectorClient } from 'wagmi';
import { confetti } from '@tsparticles/confetti';

import BuyVUSDModal from './modal';
import { buyVUSDWithVTRU, getBalanceVUSD, getVtruConversion } from '@/services/web3/vusd';

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
    const currentChain = chain?.blockExplorers?.default.name;
    const { data: client } = useConnectorClient();

    const [selectedValue, setSelectedValue] = useState('VTRU');
    const [vusdRequired, setVusdRequired] = useState(defaultVusdAmount);
    const [usdcConverted, setUsdcConverted] = useState(0);
    const [vtruConverted, setVtruConverted] = useState(0);

    const [loading, setLoading] = useState(false);

    const [balanceVUSD, setBalanceVUSD] = useState({
        symbol: 'VUSD',
        value: 0,
    });

    useEffect(() => {
        if (isOpen) {
            // setUsdcConverted(defaultVusdAmount);
            getVtruConversion({ client: client!, vusdAmount: defaultVusdAmount }).then((result) => {
                setVtruConverted(result);
            });

            getBalanceVUSD({ client: client! }).then((result) => {
                setBalanceVUSD({
                    symbol: 'VUSD',
                    value: result,
                });
            });
        }
    }, [isOpen]);

    useEffect(() => {
        if (client) {
            getVtruConversion({ client: client!, vusdAmount: vusdRequired }).then((result) => {
                setVtruConverted(result);
            });

            getBalanceVUSD({ client: client! }).then((result) => {
                setBalanceVUSD({
                    symbol: 'VUSD',
                    value: result,
                });
            });
        }
    }, [client, vusdRequired]);

    const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value && parseInt(event.target.value) < 1) event.target.value = '1';
        setVusdRequired(Number(event.target.value));
        getVtruConversion({ client: client!, vusdAmount: Number(event.target.value) }).then((result) => {
            setVtruConverted(result);
        });
        // setUsdcConverted(Number(event.target.value));
    };

    const handleBlurQuantity = (event: React.FocusEvent<HTMLInputElement>) => {
        if (!event.target.value) {
            event.target.value = '1';
            // setUsdcConverted(1);
        } else {
            event.target.value = Math.round(parseFloat(event.target.value)).toString();
            // setUsdcConverted(Math.round(parseFloat(event.target.value)));
        }
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => setSelectedValue(event.target.value);

    const handleBuy = () => {
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

                    new Promise((resolve) => setTimeout(resolve, 15_000)).then(() => {
                        setLoading(false);
                        onClose();

                        confetti({
                            particleCount: 500,
                            spread: 250,
                            origin: { x: 0.5, y: 0.5 },
                            zIndex: 99999,
                        });
                    });
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    };

    const value = Number(balance.data?.value || '0') / 10 ** 18;

    return (
        <BuyVUSDModal
            isOpen={isOpen}
            onClose={onClose}
            data={{
                balance: {
                    symbol: balance.data?.symbol || '',
                    value: value.toFixed(4),
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
                    !balance?.data ||
                    value < (selectedValue === 'VTRU' ? vtruConverted : usdcConverted) ||
                    loading,
                insufficientBalance: !balance?.data
                    ? true
                    : value < (selectedValue === 'VTRU' ? vtruConverted : usdcConverted),
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
