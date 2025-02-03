import styles from '../../pages/home/home.module.css';

interface SortButtonProps {
  sortByCheapest: boolean;
  toggleSortByCheapest: () => void;
}

export default function SortButton({ sortByCheapest, toggleSortByCheapest }: SortButtonProps) {
  return (
    <div className={styles.sortOptions}>  {}
      <button onClick={toggleSortByCheapest}>
        {sortByCheapest ? 'Mostrar todas' : 'Mostrar mais em conta'}
      </button>
    </div>
  );
}
