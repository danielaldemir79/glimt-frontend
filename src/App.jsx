import { useEffect, useState } from 'react'
import MemoryList from './components/MemoryList.jsx'
import MemoryNavigator from './components/MemoryNavigator.jsx'
import MemoryForm from './components/MemoryForm.jsx'
import { getMemories } from './api/memoryApi.js'
import './App.css'


function App() {

  const [selectedDate, setSelectedDate] = useState('')

  const [isFormOpen, setIsFormOpen] = useState(false)

  const [memories, setMemories] = useState([])

  const [loadError, setLoadError] = useState('')
  
  // Behåller bara minnen som tillhör det valda datumet
  const selectedMemories = memories.filter(
    (memory) => memory.date === selectedDate,
  )

  // Skapar en sorterad lista med datum som innehåller minnen. 
  // Set är en samling som tar bort dubbletter. Bara unika datum behålls.
  const memoryDates = [
    ...new Set(memories.map((memory) => memory.date)),
  ].sort()


  function addMemory(createdMemory) {
    setMemories((currentMemories) => [
      createdMemory,
      ...currentMemories,
    ])
  }

  useEffect(() => {
    async function loadMemories() {
      try {
        setLoadError('')

        const apiMemories = await getMemories()
        setMemories(apiMemories)
      } catch{
        setLoadError('Kunde inte hämta dina minnen. Försök igen.')
      }
    }

    loadMemories()
  }, [])

  return (
    <>
      <header className="site-header">
        <h1>Glimt</h1>
      <button
        className="new-memory-button"
        type="button"
        onClick={() => setIsFormOpen(!isFormOpen)}
      >
        {isFormOpen ? 'Stäng formulär' : '+ Nytt inlägg'}
      </button>
      </header>

      {isFormOpen && (
        <MemoryForm onMemoryCreated={addMemory} />
      )}
      
      <main className="main-content">
        <section>
          <h2>Hitta minnen</h2>
          <MemoryNavigator 
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            memoryDates={memoryDates} 
          />
        </section>

        {loadError && (
          <p className="empty-message" role="alert">
            {loadError}
          </p>
        )}

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
