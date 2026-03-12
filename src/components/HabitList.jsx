import HabitCard from './HabitCard'

function HabitList({ habits }) {
  // Guard clause 1: protege contra undefined ou null
  if (!habits) return null

  // Guard clause 2: mensagem amigável para lista vazia
  if (habits.length === 0) {
    return <p>Nenhum hábito cadastrado ainda. Que tal começar?</p>
  }

  return (
    <ul>
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          titulo={habit.titulo}
          meta={habit.meta}
          ativo={habit.ativo}
          diasFeitos={habit.diasFeitos}
          categoria={habit.categoria}
        />
      ))}
    </ul>
  )
}

export default HabitList
