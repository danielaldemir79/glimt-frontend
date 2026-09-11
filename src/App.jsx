import MemoryList from './components/MemoryList.jsx'
import './App.css'

// Testdata för minnen
const memories = [
  {
    id: 1,
    title: 'En dag vid sjön',
    date: '2026-09-06',
    description: 'Vi tog en promenad och fikade vid vattnet.',
    image: '/images/lake.jpg',
  },
  {
    id: 2,
    title: 'Fika i stan',
    date: '2026-09-08',
    description: 'En lugn eftermiddag med kaffe och något gott.',
    image: '/images/cafe.jpg',
  },
]

function App() {
  return (
    <>
      <header className="site-header">
        <h1>Glimt</h1>
        <button type="button">+ Nytt inlägg</button>
      </header>

      <main>
        <section>
          <h2>Kalender</h2>
        </section>

        <section>
          <h2>Senaste minnen</h2>
          {/* Skickar testdatan till listkomponenten */}
          <MemoryList memories={memories} /> 
        </section>
      </main>
    </>
  )
}

export default App
