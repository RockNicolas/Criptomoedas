import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CoinProps } from '../../types/index';
import { CoinInfo } from "../../components/detail/CoinInfo";
import styles from './detail.module.css';

interface ResponseData {
  data: CoinProps;
}

interface ErrorData {
  error: string;
}

type DataProps = ResponseData | ErrorData;

export function Detail() {
  const { cripto } = useParams();
  const navigate = useNavigate();
  const [coin, setCoin] = useState<CoinProps | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCoin() {
      try {
        fetch(`https://api.coincap.io/v2/assets/${cripto}`)
          .then(response => response.json())
          .then((data: DataProps) => {
            if ("error" in data) {
              navigate("/");
              return;
            }

            const price = Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD"
            });

            const priceCompact = Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              notation: "compact"
            });

            const resultData = {
              ...data.data,
              formatedPrice: price.format(Number(data.data.priceUsd)),
              formatedMarket: priceCompact.format(Number(data.data.marketCapUsd)),
              formatedVolume: priceCompact.format(Number(data.data.volumeUsd24Hr)),
            };

            setCoin(resultData);
            setLoading(false);
          });
      } catch (err) {
        console.log(err);
        navigate("/");
      }
    }

    getCoin();
  }, [cripto]);

  if (loading || !coin) {
    return (
      <div className={styles.container}>
        <h4 className={styles.center}>Carregando detalhes...</h4>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.center}>{coin.name}</h1>
      <h2 className={styles.center}>{coin.symbol}</h2>

      <CoinInfo 
        name={coin.name}
        symbol={coin.symbol}
        formatedPrice={coin.formatedPrice!}
        formatedMarket={coin.formatedMarket!}
        formatedVolume={coin.formatedVolume!}
        changePercent24Hr={coin.changePercent24Hr!}  
      />
    </div>
  );
}
