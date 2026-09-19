import { createMemory, updateMemory, uploadImage } from '../api/memoryApi.js'
import { useEffect, useRef, useState } from 'react'
import './MemoryForm.css'

function MemoryForm({ onMemoryCreated, onMemoryUpdated, memoryToEdit }) {
  
  const [title, setTitle] = useState(memoryToEdit?.title ?? '')
  const [date, setDate] = useState(memoryToEdit?.date ?? '')
  const [description, setDescription] = useState(memoryToEdit?.description ?? '')
  const [errorMessage, setErrorMessage] = useState('')
  const [image, setImage] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  const formRef = useRef(null)

  useEffect(() => { 
    formRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()

    if (isSaving) {
      return
    }

    setIsSaving(true)
    
    setErrorMessage('')

    try {
      let imagePath = memoryToEdit?.imagePath ?? null

      if (image) {
        const uploadResult = await uploadImage(image)
        imagePath = uploadResult.imagePath
      }

      const newMemory = {
        title,
        date,
        description,
        imagePath,
      }

      if (memoryToEdit) {
        const updatedMemory = await updateMemory(memoryToEdit.id, newMemory)
        onMemoryUpdated(updatedMemory)
      } else {
        const createdMemory = await createMemory(newMemory)
        onMemoryCreated(createdMemory)
      }
    } catch (error) {
      setErrorMessage(
        error instanceof TypeError
          ? 'Kunde inte ansluta till API:t. Kontrollera att backend är igång.'
          : error.message,
      )
    } finally {
      setIsSaving(false)
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
        maxLength={45}
        onChange={(event) => setTitle(event.target.value)}
        required
      />
      <small>{title.length}/45 tecken</small>

      <label htmlFor="memory-entry-date">Datum</label>
      <input
        id="memory-entry-date"
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

      <label htmlFor="memory-image">Bild</label>
      <input
        id="memory-image"
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        onChange={(event) => setImage(event.target.files[0] ?? null)}
      />

      {memoryToEdit && (
        <small>
          Lämna bildfältet tomt för att behålla nuvarande bild.
        </small>
      )}

      {errorMessage && (
        <p role="alert">{errorMessage}</p>
      )}

      <button type="submit" disabled={isSaving}>
        {isSaving
          ? 'Sparar...'
          : memoryToEdit
            ? 'Spara ändringar'
            : 'Spara minne'}
      </button>
    </form>
  )
}

export default MemoryForm