import { Link } from 'react-router-dom'

function PaginaNaoEncontrada() {
  return (
    <main className="pagina-404">
      <h1>404</h1>
      <p>Esta página não existe.</p>
      <Link to="/">Voltar para o início</Link>
    </main>
  )
}

export default PaginaNaoEncontrada