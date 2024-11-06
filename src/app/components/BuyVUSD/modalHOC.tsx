import { useAccount, useBalance, useConnectorClient } from 'wagmi';
import BuyVUSDModal from './modal';
import { useEffect, useState } from 'react';
import { buyVUSDWithVTRU, getVtruConversion } from '@/services/web3/vusd';

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

    const [vusdRequired, setVusdRequired] = useState(defaultVusdAmount);
    const [selectedValue, setSelectedValue] = useState('VTRU');
    const [usdcConverted, setUsdcConverted] = useState(0);
    const [vtruConverted, setVtruConverted] = useState(0);

    useEffect(() => {
        if (isOpen) {
            setUsdcConverted(defaultVusdAmount);
            getVtruConversion({ client: client!, vusdAmount: defaultVusdAmount }).then((result) => {
                setVtruConverted(result);
            });
        }
    }, [isOpen]);

    const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value && parseInt(event.target.value) < 1) event.target.value = '1';
        setVusdRequired(Number(event.target.value));
        getVtruConversion({ client: client!, vusdAmount: Number(event.target.value) }).then((result) => {
            setVtruConverted(result);
        });
        setUsdcConverted(Number(event.target.value));
    };

    const handleBlurQuantity = (event: React.FocusEvent<HTMLInputElement>) => {
        if (!event.target.value) {
            event.target.value = '1';
            setUsdcConverted(1);
        } else {
            event.target.value = Math.round(parseFloat(event.target.value)).toString();
            setUsdcConverted(Math.round(parseFloat(event.target.value)));
        }
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => setSelectedValue(event.target.value);

    const handleBuy = () => {
        if (selectedValue === 'VTRU') buyVUSDWithVTRU({ client: client!, vusdAmount: vusdRequired });
    };

    return (
        <BuyVUSDModal
            isOpen={isOpen}
            onClose={onClose}
            data={{
                balance: { symbol: balance.data?.symbol || '', value: Number(balance.data?.value || '0') / 10 ** 18 },
                currentChain,
                isConnected,
                selectedValue,
                usdcConverted,
                vtruConverted,
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
