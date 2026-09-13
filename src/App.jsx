import { useState } from 'react'
import MemoryList from './components/MemoryList.jsx'
import MemoryNavigator from './components/MemoryNavigator.jsx'
import './App.css'

// Testdata för minnen
const memories = [
  {
    id: 6,
    title: 'Sommarens jordgubbar',
    date: '2026-09-12',
    description: 'Vi tog vara på de sista jordgubbarna för sommaren.',
    image: '/images/strawberries.jpg',
  },
  {
    id: 5,
    title: 'Utflykt bland bergen',
    date: '2026-09-11',
    description: 'En heldag med vandring och utsikt över bergen.',
    image: '/images/mountain.jpg',
  },
  {
    id: 4,
    title: 'En stund vid datorn',
    date: '2026-09-10',
    description: 'Jag arbetade vidare med ett projekt under eftermiddagen.',
    image: '/images/workspace.jpg',
  },
  {
    id: 3,
    title: 'Promenad med hunden',
    date: '2026-09-09',
    description: 'Vi tog en lång promenad innan regnet kom.',
    image: '/images/dog.jpg',
  },
  {
    id: 2,
    title: 'Fika i stan',
    date: '2026-09-08',
    description: 'En lugn eftermiddag med kaffe och något gott.',
    image: '/images/cafe.jpg',
  },
  {
    id: 1,
    title: 'En dag vid sjön',
    date: '2026-09-06',
    description: 'Vi tog en promenad och fikade vid vattnet.',
    image: '/images/lake.jpg',
  },
]

function App() {
  // Tomt datum betyder att hela tidslinjen visas
  const [selectedDate, setSelectedDate] = useState('')
  
  // Behåller bara minnen som tillhör det valda datumet
  const selectedMemories = memories.filter(
    (memory) => memory.date === selectedDate,
  )

  // Skapar en sorterad lista med datum som innehåller minnen. 
  // Set är en samling som tar bort dubbletter. Bara unika datum behålls.
  const memoryDates = [
    ...new Set(memories.map((memory) => memory.date)),
  ].sort()

  return (
    <>
      <header className="site-header">
        <h1>Glimt</h1>
        <button className="new-memory-button" type="button">
          + Nytt inlägg
        </button>
      </header>

      <main className="main-content">
        <section>
          <h2>Hitta minnen</h2>
          <MemoryNavigator 
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            memoryDates={memoryDates} 
          />
        </section>

        <section className="memories-section">
          {/* Växlar mellan vald dag och hela tidslinjen */}
          {selectedDate ? (
            <>
              <h2>Vald dag</h2>

              <button
                className="show-all-button"
                type="button"
                onClick={() => setSelectedDate('')}
              >
                Visa alla minnen
              </button>

              {selectedMemories.length > 0 ? (
                <MemoryList memories={selectedMemories} />
              ) : (
                <p className="empty-message">Inga minnen finns för detta datum.</p>
              )}
            </>
          ) : (
            <>
              <h2>Senaste minnen</h2>
              <MemoryList memories={memories} />
            </>
          )}
        </section>
      </main>
    </>
  )
}

export default App
