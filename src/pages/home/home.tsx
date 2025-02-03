import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './home.module.css';
import { useCoins } from '../../hooks/useCoins';  
import SearchBar from '../../components/home/SearchBar';
import SortButton from '../../components/home/SortButton';
import CoinCard from '../../components/home/CoinCard';  

export function Home() {
  const [input, setInput] = useState("");
  const [sortByCheapest, setSortByCheapest] = useState(false);
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();

  const { filteredCoins, getData } = useCoins(input, sortByCheapest, offset);

  useEffect(() => {
    getData();
  }, [offset]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (input === "") return;
    navigate(`/detail/${input}`);
  }

  function handleGetMore() {
    setOffset(offset + 10);
  }

  return (
    <main className={styles.container}>
      <SearchBar input={input} setInput={setInput} handleSubmit={handleSubmit} />
      <SortButton sortByCheapest={sortByCheapest} toggleSortByCheapest={() => setSortByCheapest(!sortByCheapest)} />
      
      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
            <th scope="col">Mudança 24h</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoins.length > 0 &&
            filteredCoins.map((coin) => (
              <CoinCard key={coin.id} coin={coin} />
            ))}
        </tbody>
      </table>

      <button className={styles.buttonMore} onClick={handleGetMore}>
        Carregar mais
      </button>
    </main>
  );
}
