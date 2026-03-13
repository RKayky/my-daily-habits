function HabitCard({ nome, descricao = '', meta, ativo = true, diasFeitos = 0, onRemover }) {
  const metaAtingida = diasFeitos >= meta

  const mensagemMeta = metaAtingida
    ? '🏆 Meta da semana atingida!'
    : `${diasFeitos} de ${meta} dias concluídos`

  return (
    <div className="habit-card">
      <h3>{nome}</h3>
      {descricao && <p>{descricao}</p>}
      <p>{mensagemMeta}</p>
      <span>{ativo ? '✅ Ativo' : '⏸️ Pausado'}</span>
      {metaAtingida && <p>⭐ Parabéns! Meta da semana atingida!</p>}

      {onRemover && (
        <button type="button" onClick={onRemover}>
          Remover
        </button>
      )}
    </div>
  )
}

export default HabitCard
