// hooks/useCoins.ts
import { useState, useEffect } from 'react';
import { CoinProps, DataProps } from '../types/index';

export function useCoins(input: string, sortByCheapest: boolean, offset: number) {
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<CoinProps[]>([]);

  useEffect(() => {
    fetch(`https://api.coincap.io/v2/assets?limit=10&offset=${offset}`)
      .then((response) => response.json())
      .then((data: DataProps) => {
        const coinsData = data.data;

        const price = Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        });

        const priceCompact = Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          notation: 'compact',
        });

        const formatedResult = coinsData.map((item) => {
          return {
            ...item,
            formatedPrice: price.format(Number(item.priceUsd)),
            formatedMarket: priceCompact.format(Number(item.marketCapUsd)),
            formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr)),
          };
        });

        setCoins(formatedResult);
        setFilteredCoins(formatedResult);
      });
  }, [offset]);

  useEffect(() => {
    let filtered = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(input.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(input.toLowerCase())
    );

    if (sortByCheapest) {
      filtered = [...filtered].sort((a, b) => parseFloat(a.priceUsd) - parseFloat(b.priceUsd));
    }
    setFilteredCoins(filtered);
  }, [input, sortByCheapest, coins]);

  return { coins, filteredCoins, getData: () => {}, setFilteredCoins };
}
