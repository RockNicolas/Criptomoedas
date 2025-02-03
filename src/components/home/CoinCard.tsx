import { CoinProps } from '../../types/index';
import { Link } from 'react-router-dom';
import styles from '../../pages/home/home.module.css';

interface CoinCardProps {
  coin: CoinProps;
}

export default function CoinCard({ coin }: CoinCardProps) {
  const changePercent = parseFloat(coin.changePercent24Hr);

  return (
    <tr className={styles.tr}>
      <td className={styles.tdLabel} data-Label="Moeda">
        <div className={styles.name}>
          <img
            alt="Logo Cripto"
            src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
          />
          <Link to={`/detail/${coin.id}`}>
            <span>{coin.name}</span> | {coin.symbol}
          </Link>
        </div>
      </td>
      <td className={styles.tdLabel} data-Label="Valor Mercado">
        {coin.formatedMarket}
      </td>
      <td className={styles.tdLabel} data-Label="Preço">
        {coin.formatedPrice}
      </td>
      <td className={styles.tdLabel} data-Label="Volume">
        {coin.formatedVolume}
      </td>
      <td
        className={changePercent > 0 ? styles.tdProfit : styles.tdLoss}
        data-Label="Mudança 24h"
      >
        <span>{changePercent.toFixed(3)}</span>
      </td>
    </tr>
  );
}
