import createMemory from '../api/memoryApi.js'
import { useState } from 'react'

function MemoryForm({ onMemoryCreated }) {
  
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

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

    } catch (error) {
      console.error(error)
    }

  }
  
  return (
    <form onSubmit={handleSubmit}>
      <h2>Nytt minne</h2>

      <label htmlFor="memory-title">Titel</label>
      <input
        id="memory-title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <label htmlFor="memory-date">Datum</label>
      <input
        id="memory-date"
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />

      <label htmlFor="memory-description">Beskrivning</label>
      <textarea
        id="memory-description"
        rows="4"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <button type="submit">Spara minne</button>
    </form>
  )
}

export default MemoryForm