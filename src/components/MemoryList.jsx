import MemoryCard from './MemoryCard.jsx'
import './MemoryList.css'

function MemoryList({ memories, startEditing, removeMemory, openMemory }) {
  return (
    <div className="memory-list">
      {memories.map((memory) => (
        <MemoryCard
          // React använder key internt, den skickas inte som en vanlig prop
          key={memory.id}
          memory={memory}
          startEditing={startEditing}
          removeMemory={removeMemory}
          openMemory={openMemory}
        />
      ))}
    </div>
  )
}

export default MemoryList