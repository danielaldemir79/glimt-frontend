import { createMemory } from '../api/memoryApi.js'
import { useState } from 'react'
import './MemoryForm.css'

function MemoryForm({ onMemoryCreated }) {
  
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    
    setErrorMessage('')

    const newMemory = {
      title,
      date,
      description,
      imagePath: null,
    }

    try {
      const createdMemory = await createMemory(newMemory)
      onMemoryCreated(createdMemory)

      setTitle('')
      setDate('')
      setDescription('')

    } catch{
      setErrorMessage('Ett fel uppstod vid skapandet av minnet.')
    }

  }
  
  return (
    <form className="memory-form" onSubmit={handleSubmit}>
      <h2>Nytt minne</h2>

      <label htmlFor="memory-title">Titel</label>
      <input
        id="memory-title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <label htmlFor="memory-date">Datum</label>
      <input
        id="memory-date"
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
        required
      />

      <label htmlFor="memory-description">Beskrivning</label>
      <textarea
        id="memory-description"
        rows="4"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        required
      />

      {errorMessage && (
        <p role="alert">{errorMessage}</p>
      )}

      <button type="submit">Spara minne</button>
    </form>
  )
}

export default MemoryForm