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