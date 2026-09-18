import { useEffect, useState } from 'react'
import MemoryList from './components/MemoryList.jsx'
import MemoryNavigator from './components/MemoryNavigator.jsx'
import MemoryForm from './components/MemoryForm.jsx'
import { deleteMemory, getMemories } from './api/memoryApi.js'
import './App.css'


function App() {

  const [selectedDate, setSelectedDate] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [memories, setMemories] = useState([])
  const [editingMemory, setEditingMemory] = useState(null)
  const [deleteError, setDeleteError] = useState('')
  const [loadError, setLoadError] = useState('')
  

  // Minnen som tillhör det valda datumet
  const selectedMemories = memories.filter(
    (memory) => memory.date === selectedDate,
  )


  // Sorterad lista med datum som innehåller minnen. 
  const memoryDates = [
    ...new Set(memories.map((memory) => memory.date)),
  ].sort()


  // Nytt minne
  function addMemory(createdMemory) {
    setMemories((currentMemories) =>
      [createdMemory, ...currentMemories].sort(
        (firstMemory, secondMemory) =>
          secondMemory.date.localeCompare(firstMemory.date),
      ),
    )
    setIsFormOpen(false)
  }


  // Ersätter ett befintligt minne med ett uppdaterat minne
  function replaceMemory(updatedMemory) {
    setMemories((currentMemories) =>
      currentMemories.map((memory) =>
        memory.id === updatedMemory.id ? updatedMemory : memory,
      )
      .sort((firstMemory, secondMemory) =>
        secondMemory.date.localeCompare(firstMemory.date),
      ),
    )
    
    setEditingMemory(null)
    setIsFormOpen(false)
  }

  // Tar bort ett minne
  async function removeMemory(memory) {
    const shouldDelete = window.confirm(
      `Vill du ta bort "${memory.title}"?`,
    )

    if (!shouldDelete) {
      return
    }

    try {
      setDeleteError('')

      await deleteMemory(memory.id)

      setMemories((currentMemories) =>
        currentMemories.filter(
          (currentMemory) => currentMemory.id !== memory.id,
        ),
      )
    } catch {
      setDeleteError('Kunde inte ta bort minnet. Försök igen.')
    }
  }


  // Växlar visningen av formuläret för minnen
  function toggleMemoryForm() {
    setEditingMemory(null)
    setIsFormOpen((currentIsOpen) => !currentIsOpen)
  }

  // Startar redigering av ett minne
  function startEditing(memory) {
    setEditingMemory(memory)
    setIsFormOpen(true)
  }


  // Hämtar minnen från API vid komponentens start 
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
        onClick={toggleMemoryForm}
      >
        {isFormOpen ? 'Stäng formulär' : '+ Nytt inlägg'}
      </button>
      </header>

      {isFormOpen && (
        <MemoryForm 
          key={editingMemory?.id ?? 'new'}
          onMemoryCreated={addMemory}
          onMemoryUpdated={replaceMemory}
          memoryToEdit={editingMemory} 
        />
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

        {deleteError && (
          <p className="empty-message" role="alert">
            {deleteError}
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
                <MemoryList
                  memories={selectedMemories}
                  startEditing={startEditing}
                  removeMemory={removeMemory}
                />
              ) : (
                <p className="empty-message">Inga minnen finns för detta datum.</p>
              )}
            </>
          ) : (
            <>
              <h2>Senaste minnen</h2>
              {memories.length > 0 && (
                <MemoryList
                  memories={memories}
                  startEditing={startEditing}
                  removeMemory={removeMemory}
                />
              )}

              {memories.length === 0 && !loadError && (
                <p className="empty-message">
                  Inga minnen ännu. Skapa ditt första inlägg.
                </p>
              )}
            </>
          )}
        </section>
      </main>
    </>
  )
}

export default App
