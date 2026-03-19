import { Link } from 'react-router-dom'
import habitoIcon from '../assets/habitos.png'
import mauHabitoIcon from '../assets/mau-habito.png'

function HabitCard({
  id,
  nome,
  descricao = '',
  categoria = 'Geral',
  tipo = 'manter',
  cor = '#111827',
  meta,
  ativo = true,
  diasFeitos = 0,
  logs = [],
  onRemover,
  onRegistrarDia,
}) {
  const metaAtingida = diasFeitos >= meta
  const tipoLabel = tipo === 'parar' ? 'Mau hábito a parar' : 'Hábito a manter'
  const icon = tipo === 'parar' ? mauHabitoIcon : habitoIcon

  const mensagemMeta = metaAtingida
    ? (tipo === 'parar' ? '🏆 Meta batida: você evitou esse hábito!' : '🏆 Meta da semana atingida!')
    : (tipo === 'parar'
      ? `${diasFeitos} de ${meta} dias sem praticar`
      : `${diasFeitos} de ${meta} dias concluídos`)

  return (
    <div className="habit-card" style={{ borderTop: `6px solid ${cor}` }}>
      <div className="habit-card-top">
        <img src={icon} alt={tipoLabel} className="habit-icon" />
        <span className="habit-tipo">{tipoLabel}</span>
      </div>

      <h3>{nome}</h3>
      {descricao && <p>{descricao}</p>}
      <small>Categoria: {categoria}</small>
      <p>{mensagemMeta}</p>
      <span>{ativo ? '✅ Ativo' : '⏸️ Pausado'}</span>
      {metaAtingida && <p>⭐ Continue no ritmo!</p>}

      <small>Logs: {logs.length}</small>

      <div className="buttonFlex">
        <Link to={`/habito/${id}`} className="btn-detalhes">
          Ver detalhes
        </Link>
        {onRegistrarDia && (
          <button type="button" onClick={onRegistrarDia}>
            Registrar dia
          </button>
        )}
        {onRemover && (
          <button type="button" onClick={onRemover}>
            Remover
          </button>
        )}
      </div>
    </div>
  )
}

export default HabitCard