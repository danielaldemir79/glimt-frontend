import { createMemory, updateMemory } from '../api/memoryApi.js'
import { useEffect, useRef, useState } from 'react'
import './MemoryForm.css'

function MemoryForm({ onMemoryCreated, onMemoryUpdated, memoryToEdit }) {
  
  const [title, setTitle] = useState(memoryToEdit?.title ?? '')
  const [date, setDate] = useState(memoryToEdit?.date ?? '')
  const [description, setDescription] = useState(memoryToEdit?.description ?? '')
  const [errorMessage, setErrorMessage] = useState('')

  const formRef = useRef(null)

  useEffect(() => {
    formRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [])

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
      if (memoryToEdit) {
        const updatedMemory = await updateMemory(memoryToEdit.id, newMemory)
        onMemoryUpdated(updatedMemory)
      } else {
        const createdMemory = await createMemory(newMemory)
        onMemoryCreated(createdMemory)

        setTitle('')
        setDate('')
        setDescription('')
      }
    } catch{
      setErrorMessage('Ett fel uppstod vid skapandet av minnet.')
    }

  }
  
  return (
    <form ref={formRef} className="memory-form" onSubmit={handleSubmit}>
      <h2>{memoryToEdit ? 'Redigera minne' : 'Nytt minne'}</h2>

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

      <button type="submit">
        {memoryToEdit ? 'Spara ändringar' : 'Spara minne'}
      </button>
    </form>
  )
}

export default MemoryForm