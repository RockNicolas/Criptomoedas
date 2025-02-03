// components/detail/MarketData.tsx
import styles from '../../pages/detail/detail.module.css';

interface MarketDataProps {
  formatedMarket: string;
  formatedVolume: string;
  changePercent24Hr: string;
}

export function MarketData({ formatedMarket, formatedVolume, changePercent24Hr }: MarketDataProps) {
  const changeClass = Number(changePercent24Hr) > 0 ? styles.profit : styles.loss;

  return (
    <section className={styles.content}>
      <div><strong>Mercado: </strong>{formatedMarket}</div>
      <div><strong>Volume: </strong>{formatedVolume}</div>
      <div>
        <strong>Mudança 24h: </strong>
        <span className={changeClass}>
          {Number(changePercent24Hr).toFixed(3)}%
        </span>
      </div>
    </section>
  );
}
