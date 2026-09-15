// URL till API
const API_URL = 'https://localhost:7092/api/MemoryEntries' 

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

export default createMemory