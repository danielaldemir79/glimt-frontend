import './MemoryCard.css'

function MemoryCard({ memory, startEditing, removeMemory, openMemory }) {
  return (
    <article className="memory-card">
      <button
        className="memory-card-open"
        type="button"
        onClick={() => openMemory(memory)}
      >
        {memory.imagePath ? (
          <img
            src={`https://localhost:7092${memory.imagePath}`}
            alt={memory.title}
          />
        ) : (
          <div className="memory-card-image-placeholder">
            Bild saknas
          </div>
        )}

        <div className="memory-card-content">
          <p className="memory-card-date">{memory.date}</p>
          <h3>{memory.title}</h3>
          <p className="memory-card-description">{memory.description}</p>
          <span className="memory-card-open-label">
            Visa hela minnet
          </span>
        </div>
      </button>

      <div className="memory-card-actions">
        <button
          className="edit-memory-button"
          type="button"
          onClick={() => startEditing(memory)}
        >
          Redigera
        </button>

        <button
          className="delete-memory-button"
          type="button"
          onClick={() => removeMemory(memory)}
        >
          Ta bort
        </button>
      </div>
    </article>
  );
}

export default MemoryCard