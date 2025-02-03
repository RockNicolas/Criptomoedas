import styles from '../../pages/detail/detail.module.css';
import { CoinLogo } from './CoinLogo';

interface CoinInfoProps {
  name: string;
  symbol: string;
  formatedPrice: string;
  formatedMarket: string;
  formatedVolume: string;
  changePercent24Hr: string;
}

export function CoinInfo({ name, symbol, formatedPrice, formatedMarket, formatedVolume, changePercent24Hr }: CoinInfoProps) {
  const changeClass = Number(changePercent24Hr) > 0 ? styles.profit : styles.loss;

  return (
    <section className={styles.content}>
      <CoinLogo symbol={symbol} />

      <h1>{name} | {symbol}</h1>
      <p><strong>Preço:</strong> {formatedPrice}</p>
      <p><strong>Mercado:</strong> {formatedMarket}</p>
      <p><strong>Volume:</strong> {formatedVolume}</p>
      <p>
        <strong>Mudança 24h:</strong>
        <span className={changeClass}>
          {Number(changePercent24Hr).toFixed(3)}%
        </span>
      </p>
    </section>
  );
}
