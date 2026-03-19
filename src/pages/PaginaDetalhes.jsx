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