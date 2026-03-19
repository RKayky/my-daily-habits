import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import BemVindo from './components/BemVindo'
import SecaoHabitos from './components/SecaoHabitos'
import HabitList from './components/HabitList'

function App() {
  return (
    <>
      <Header />
      <main>
        <BemVindo nomeUsuario="Kelvin, Iany, Gabriel e Ryan " />
        <SecaoHabitos titulo="Meus Hábitos">
          <HabitList />
        </SecaoHabitos>
      </main>
      <Footer />
    </>
  )
}

export default App
