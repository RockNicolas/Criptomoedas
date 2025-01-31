import { Link } from 'react-router-dom';
import './notfound.css'

export function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Ops, essa página não existe!</h2>
        <p className="notfound-text">A página que você está procurando pode ter sido movida ou não estar mais disponível.</p>
        <Link to="/" className="notfound-link">Voltar para a página inicial</Link>
      </div>
    </div>
  );
}
