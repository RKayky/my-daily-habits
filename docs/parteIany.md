# Parte Iany — Exercício 7/7 (Atualizado)

> Objetivo: navegação no topo + página inicial com os novos resumos de tipo de hábito + página 404.

Qualquer dúvida manda um zap

## 1) Substituir src/components/Header.jsx

```jsx
// src/components/Header.jsx
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <span>📋</span>
        <strong>My Daily Habits</strong>
      </div>

      <nav className="header-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => isActive ? 'nav-link ativo' : 'nav-link'}
        >
          Início
        </NavLink>

        <NavLink
          to="/habitos"
          className={({ isActive }) => isActive ? 'nav-link ativo' : 'nav-link'}
        >
          Hábitos
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
```

## 2) Substituir src/pages/PaginaInicio.jsx

```jsx
// src/pages/PaginaInicio.jsx
import { Link } from 'react-router-dom'
import { useHabits } from '../contexts/HabitsContext'

function PaginaInicio() {
  const { habits } = useHabits()

  const habitosAtivos = habits.filter((h) => h.ativo).length
  const habitosManter = habits.filter((h) => h.tipo !== 'parar').length
  const mausHabitos = habits.filter((h) => h.tipo === 'parar').length

  return (
    <main className="pagina-inicio">
      <h1>My Daily Habits</h1>
      <p>Construindo uma rotina melhor, um hábito por vez.</p>

      <div className="resumo">
        <div className="resumo-card">
          <strong>{habits.length}</strong>
          <span>hábitos cadastrados</span>
        </div>
        <div className="resumo-card">
          <strong>{habitosAtivos}</strong>
          <span>ativos agora</span>
        </div>
        <div className="resumo-card">
          <strong>{habitosManter}</strong>
          <span>hábitos a manter</span>
        </div>
        <div className="resumo-card">
          <strong>{mausHabitos}</strong>
          <span>maus hábitos a parar</span>
        </div>
      </div>

      <Link to="/habitos" className="btn-primario">
        Ver meus hábitos →
      </Link>
    </main>
  )
}

export default PaginaInicio
```

## 3) Substituir src/pages/PaginaNaoEncontrada.jsx

```jsx
// src/pages/PaginaNaoEncontrada.jsx
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
```
