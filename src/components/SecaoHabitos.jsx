function SecaoHabitos({ titulo, children }) {
  return (
    <section>
      <h2>{titulo}</h2>
      <div className="lista-habitos">
        {children}
      </div>
    </section>
  )
}

export default SecaoHabitos
