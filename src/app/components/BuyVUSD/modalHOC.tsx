import { useAccount, useConnectorClient } from 'wagmi';
import BuyVUSDModal from './modal';
import { toast } from 'react-toastify';
import { getBuyerBalancesInCents } from '@/services/web3/mint';
import { useEffect, useState } from 'react';
import { formatPrice } from '@/utils/assets';
import { getVUSDPrice } from '@/services/vusd';

interface BuyVUSDModalHOCProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function BuyVUSDModalHOC({ isOpen, onClose }: BuyVUSDModalHOCProps) {
    const [balance, setBalance] = useState('');
    const [vusdPrice, setVUSDPrice] = useState(0);
    const { data: client } = useConnectorClient();
    const { address, chain } = useAccount();
    const currentChain = chain?.blockExplorers?.default.name;

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const balances = await getBuyerBalancesInCents({ wallet: address!, client: client! });
                return balances.grantBalance + balances.nonGrantBalance;
            } catch (error) {
                toast(`Error getting buyer balances (access logs for more details)`, {
                    type: 'error',
                });
                return 0;
            }
        };
        fetchBalance().then((res) => {
            const formattedBalance = formatPrice({ price: res, withUS: true, decimals: true });
            setBalance(formattedBalance);
        });
    }, [address, client]);

    useEffect(() => {
        getVUSDPrice().then((price) => {
            setVUSDPrice(price);
        });
    }, []);

    return <BuyVUSDModal isOpen={isOpen} onClose={onClose} data={{ balance, currentChain, vusdPrice }} />;
}
