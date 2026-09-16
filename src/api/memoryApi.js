// URL till API
const API_URL = 'https://localhost:7092/api/MemoryEntries' 

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

export { getMemories, createMemory, updateMemory }