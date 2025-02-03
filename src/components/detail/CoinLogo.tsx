import styles from '../../pages/detail/detail.module.css';

interface CoinLogoProps {
  symbol: string;
}

export function CoinLogo({ symbol }: CoinLogoProps) {
  return (
    <div className={styles.logoContainer}>
      <img
        src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
        alt={`Logo da moeda ${symbol}`}
        className={styles.logo}
      />
    </div>
  );
}
