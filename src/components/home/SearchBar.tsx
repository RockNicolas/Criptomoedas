import { BsSearch } from 'react-icons/bs';
import styles from '../../pages/home/home.module.css';

interface SearchBarProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function SearchBar({ input, setInput, handleSubmit }: SearchBarProps) {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Digite o nome da moeda... Ex Bitcoin"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">
        <BsSearch size={30} color="#FFF" />
      </button>
    </form>
  );
}
