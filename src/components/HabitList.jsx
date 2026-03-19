import { useRef, useState } from 'react'
import HabitCard from './HabitCard'
import { useHabits } from '../contexts/HabitsContext'

function HabitList() {
  // Hábitos e funções vêm do contexto — não do useState local
  const { habits, adicionarHabit, removerHabit, registrarDia } = useHabits()

  // Estado de UI — continua local (só o formulário usa)
  const [form, setForm] = useState({
    novoNome:      '',
    novaDescricao: '',
    novaCategoria: '',
    novoTipo:      'manter',
    novaCor:       '#2563eb',
    novaMeta:      '7',
  })
  const [erroNome, setErroNome] = useState('')
  const nomeInputRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (name === 'novoNome') {
      if (value.length > 0 && value.length < 3) {
        setErroNome('O nome deve ter pelo menos 3 caracteres.')
      } else {
        setErroNome('')
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.novoNome.trim() || erroNome) {
      nomeInputRef.current?.focus()
      return
    }
    const novoHabit = {
      id:         Date.now(),
      nome:       form.novoNome,
      descricao:  form.novaDescricao,
      categoria:  form.novaCategoria || 'Geral',
      tipo:       form.novoTipo,
      cor:        form.novaCor || '#111827',
      meta:       parseInt(form.novaMeta) || 7,
      ativo:      true,
      diasFeitos: 0,
      logs:       [],
    }
    adicionarHabit(novoHabit)
    setForm({
      novoNome: '',
      novaDescricao: '',
      novaCategoria: '',
      novoTipo: 'manter',
      novaCor: '#2563eb',
      novaMeta: '7',
    })
    setErroNome('')
    nomeInputRef.current?.focus()
  }

  if (!habits) return null

  return (
    <section>
      <form onSubmit={handleSubmit} className="habit-form">
        <div>
          <label>
            Nome do hábito *
            <input
              type="text"
              name="novoNome"
              value={form.novoNome}
              onChange={handleChange}
              ref={nomeInputRef}
            />
          </label>
          {erroNome && <p style={{ color: 'red', fontSize: '0.8rem' }}>{erroNome}</p>}
        </div>

        <div>
          <label>
            Descrição
            <input
              type="text"
              name="novaDescricao"
              value={form.novaDescricao}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Categoria
            <input
              type="text"
              name="novaCategoria"
              value={form.novaCategoria}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Tipo do hábito
            <select
              name="novoTipo"
              value={form.novoTipo}
              onChange={handleChange}
            >
              <option value="manter">Hábito que quero manter</option>
              <option value="parar">Mau hábito que quero parar</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Cor do card
            <input
              type="color"
              name="novaCor"
              value={form.novaCor}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Meta (dias por semana)
            <input
              type="number"
              name="novaMeta"
              min="1"
              max="7"
              value={form.novaMeta}
              onChange={handleChange}
            />
          </label>
        </div>

        <button type="submit">Adicionar hábito</button>
      </form>

      <div className="habit-grid">
        {habits.length === 0 && (
          <p>Nenhum hábito cadastrado ainda. Que tal começar?</p>
        )}

        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            nome={habit.nome}
            descricao={habit.descricao}
            categoria={habit.categoria}
            tipo={habit.tipo}
            cor={habit.cor}
            meta={habit.meta}
            ativo={habit.ativo}
            diasFeitos={habit.diasFeitos}
            logs={habit.logs}
            onRemover={() => removerHabit(habit.id)}
            onRegistrarDia={() => registrarDia(habit.id)}
          />
        ))}
      </div>
    </section>
  )
}

export default HabitList
