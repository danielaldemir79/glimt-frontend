import './MemoryCard.css'

function MemoryCard({ memory, startEditing, removeMemory, title, date, description, image }) {
  return (
    <article className="memory-card">
      {image ? (
        <img src={image} alt={title} />
      ) : (
        <div className="memory-card-image-placeholder">
          Bild saknas
        </div>
      )}

      <div className="memory-card-content">
        <p className="memory-card-date">{date}</p>
        <h3>{title}</h3>
        <p>{description}</p>
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
      </div>
    </article>
  )
}

export default MemoryCard