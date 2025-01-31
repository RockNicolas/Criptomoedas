import { Link } from 'react-router-dom';
import styles from './notfound.module.css'; 

export function NotFound() {
  return (
    <div className={styles.notfoundContainer}>  {}
      <div className={styles.notfoundContent}>
        <h1 className={styles.notfoundTitle}>404</h1>
        <h2 className={styles.notfoundSubtitle}>Ops, essa página não existe!</h2>
        <p className={styles.notfoundText}>A página que você está procurando pode ter sido movida ou não estar mais disponível.</p>
        <Link to="/" className={styles.notfoundLink}>Voltar para a página inicial</Link>
      </div>
    </div>
  );
}
