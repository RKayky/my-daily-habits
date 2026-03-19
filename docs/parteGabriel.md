# Parte Gabriel — Exercício 7/7 (Atualizado)

> Objetivo: card com ícone por tipo + página de detalhes com logs e progresso.

Qualquer dúvida manda um zap

## 1) Substituir src/components/HabitCard.jsx

```jsx
// src/components/HabitCard.jsx
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
```

## 2) Substituir src/pages/PaginaDetalhes.jsx

```jsx
// src/pages/PaginaDetalhes.jsx
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useHabits } from '../contexts/HabitsContext'

function PaginaDetalhes() {
  const { id } = useParams()
  const { habits, removerHabit, registrarDia, adicionarLog } = useHabits()
  const navigate = useNavigate()
  const [logTexto, setLogTexto] = useState('')

  const habit = habits.find((h) => h.id === Number(id))

  if (!habit) {
    return (
      <main className="pagina-detalhes">
        <h1>Hábito não encontrado</h1>
        <button onClick={() => navigate('/habitos')}>
          ← Voltar para a lista
        </button>
      </main>
    )
  }

  const metaAtingida = habit.diasFeitos >= habit.meta

  const handleRemover = () => {
    removerHabit(habit.id)
    navigate('/habitos')
  }

  const handleSalvarLog = () => {
    adicionarLog(habit.id, logTexto)
    setLogTexto('')
  }

  return (
    <main className="pagina-detalhes">
      <button onClick={() => navigate(-1)} className="btn-voltar">
        ← Voltar
      </button>

      <div className="detalhe-card" style={{ borderTop: `6px solid ${habit.cor || '#111827'}` }}>
        <h1>{habit.nome}</h1>
        <p>{habit.descricao}</p>

        <ul className="detalhe-info">
          <li><strong>Categoria:</strong> {habit.categoria || 'Geral'}</li>
          <li><strong>Tipo:</strong> {habit.tipo === 'parar' ? 'Mau hábito a parar' : 'Hábito a manter'}</li>
          <li><strong>Meta semanal:</strong> {habit.meta} dias</li>
          <li><strong>Dias feitos:</strong> {habit.diasFeitos}</li>
          <li>
            <strong>Status:</strong>{' '}
            <span style={{ color: habit.ativo ? '#16a34a' : '#9ca3af' }}>
              {habit.ativo ? '✅ Ativo' : '⏸️ Pausado'}
            </span>
          </li>
          {metaAtingida && (
            <li>🏆 Meta da semana atingida!</li>
          )}
        </ul>

        <div className="detalhe-acoes">
          <button onClick={() => registrarDia(habit.id)} className="btn-primario" type="button">
            Registrar dia
          </button>

          <button onClick={handleRemover} className="btn-remover" type="button">
            Remover hábito
          </button>
        </div>

        <div className="log-form">
          <label>
            Novo log
            <input
              type="text"
              value={logTexto}
              onChange={(event) => setLogTexto(event.target.value)}
              placeholder="Ex: Hoje consegui cumprir meu hábito"
            />
          </label>
          <button type="button" onClick={handleSalvarLog}>Salvar log</button>
        </div>

        <ul className="logs-lista">
          {(habit.logs || []).length === 0 && <li>Nenhum log registrado.</li>}
          {(habit.logs || []).map((log, index) => (
            <li key={`${habit.id}-${index}`}>{log}</li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default PaginaDetalhes
```
