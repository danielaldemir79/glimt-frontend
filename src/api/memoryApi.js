// URL till API
const API_URL = 'https://localhost:7092/api/MemoryEntries' 
const IMAGE_UPLOAD_URL = 'https://localhost:7092/api/Images'

async function getMemories() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Kunde inte hämta minnen.')
  }

  return response.json()
}


async function createMemory(memory) { 
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(memory), 
  })

  if (!response.ok) {
    throw new Error('Kunde inte skapa minnet.')
  }

  return response.json()
}


async function updateMemory(id, memory) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(memory),
  })

  if (!response.ok) {
    throw new Error('Kunde inte uppdatera minnet.')
  }

  return response.json()
}

async function deleteMemory(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Kunde inte ta bort minnet.')
  }
}

async function uploadImage(image) {
  const formData = new FormData()
  formData.append('image', image)

  const response = await fetch(IMAGE_UPLOAD_URL, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const errorMessage = await response.text()

    throw new Error(errorMessage || 'Kunde inte ladda upp bilden.')
  }

  return response.json()
}

export { getMemories, createMemory, updateMemory, deleteMemory, uploadImage }