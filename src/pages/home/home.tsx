import { useState, FormEvent, useEffect } from 'react'
import styles from './home.module.css'
import { BsSearch } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'

export interface CoinProps{
    id: string;
    name: string;
    symbol: string;
    priceUsd: string;
    vwap24Hr: string;
    changePercent24Hr: string;
    rank: string;
    supply: string;
    maxSupply: string;
    marketCapUsd: string;
    volumeUsd24Hr:string;
    explorer: string;
    formatedPrice?: string;
    formatedMarket?: string;
    formatedVolume?:string;
}

interface DataProps{
    data: CoinProps[]
}

export function Home() {
    const [input, setInput] = useState("")
    const [coins, setCoins] = useState<CoinProps[]>([]);
    const [filteredCoins, setFilteredCoins] = useState<CoinProps[]>([]); 
    const [sortByCheapest, setSortByCheapest] = useState(false);
    const [offset, setOffset] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getData();
    }, [offset])

    useEffect(() => {
        let filtered = coins.filter(
            (coin) =>
              coin.name.toLowerCase().includes(input.toLowerCase()) ||
              coin.symbol.toLowerCase().includes(input.toLowerCase())
        );
    
        if (sortByCheapest) {
            filtered = [...filtered].sort((a, b) =>
                parseFloat(a.priceUsd) - parseFloat(b.priceUsd)
            );
        }
        setFilteredCoins(filtered); 
    }, [input, sortByCheapest, coins]);

    async function getData(){
    fetch(`https://api.coincap.io/v2/assets?limit=10&offset=${offset}`)
        .then(response => response.json())
        .then((data: DataProps) => {
            const coinsData = data.data;

            const price = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
            })

            const priceCompact = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                notation: "compact"
            })

            const formatedResult = coinsData.map((item) => {
                const formated = {
                    ...item,
                    formatedPrice: price.format(Number(item.priceUsd)),
                    formatedMarket: priceCompact.format(Number(item.marketCapUsd)),
                    formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr))
                }

                return formated;
            })
            
            setCoins(formatedResult);
            setFilteredCoins(formatedResult)
        })
    }

    function handleSearch(inputValue: string) {
        setInput(inputValue); 
    
        if (inputValue === '') {
          setFilteredCoins(coins); 
        } else {
          const filtered = coins.filter(
            (coin) =>
              coin.name.toLowerCase().includes(inputValue.toLowerCase()) ||
              coin.symbol.toLowerCase().includes(inputValue.toLowerCase())
          );
          setFilteredCoins(filtered); 
        }
    }

    function handleSubmit(e: FormEvent){
        e.preventDefault();

        if(input === "") return;

        navigate(`/detail/${input}`)
    }

    function handleGetMore() {
        setOffset(offset + 10); 
    }

    function toggleSortByCheapest() {
        setSortByCheapest(!sortByCheapest); 
    }

    return (
      <main className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Digite o nome da moeda... Ex Bitcoin"
              value={input}
              onChange={(e) => 
                handleSearch(e.target.value)}
            />
            <button type="submit">
                <BsSearch size={30} color='#FFF'/>
            </button>
        </form>

        <div className={styles.sortOptions}>
            <button onClick={toggleSortByCheapest}>
                {sortByCheapest ? "Mostrar todas" : "Mostrar mais em conta"}
            </button>
        </div>

        <table>
            <thead>
                <tr>
                    <th scope='col'>Moeda</th>
                    <th scope='col'>Valor mercado</th>
                    <th scope='col'>Preço</th>
                    <th scope='col'>Volume</th>
                    <th scope='col'>Moudança 24h</th>
                </tr>
            </thead>
            <tbody id='tbody'>
    
            {filteredCoins.length > 0 &&
             filteredCoins.map((item) => (
              <tr className={styles.tr} key={item.id}>
                <td className={styles.tdLabel} data-Label="Moeda">
                  <div className={styles.name}>
                    <img
                      alt="Logo Cripto"
                      src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
                    />
                    <Link to={`/detail/${item.id}`}>
                      <span>{item.name}</span> | {item.symbol}
                    </Link>
                  </div>
                </td>

                <td className={styles.tdLabel} data-Label="Valor Mercado">
                  {item.formatedMarket}
                </td>

                <td className={styles.tdLabel} data-Label="Preço">
                  {item.formatedPrice}
                </td>

                <td className={styles.tdLabel} data-Label="Volume">
                  {item.formatedVolume}
                </td>

                <td
                  className={
                    Number(item.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss
                  }
                  data-Label="Mudança 24h"
                >
                  <span>{Number(item.changePercent24Hr).toFixed(3)}</span>
                </td>
              </tr>
            ))}
            </tbody>
        </table>

        <button className={styles.buttonMore} onClick={handleGetMore}>
            Carregar mais
        </button>
      </main>
    )
  }
  