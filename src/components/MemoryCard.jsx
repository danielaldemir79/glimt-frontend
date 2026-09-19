import './MemoryCard.css'

function MemoryCard({ memory, startEditing, removeMemory, openMemory, title, date, description, imagePath }) {
  return (
    <article className="memory-card">
      <button
        className="memory-card-open"
        type="button"
        onClick={() => openMemory(memory)}
      >
        {imagePath ? (
          <img
            src={`https://localhost:7092${imagePath}`}
            alt={title}
          />
        ) : (
          <div className="memory-card-image-placeholder">
            Bild saknas
          </div>
        )}

        <div className="memory-card-content">
          <p className="memory-card-date">{date}</p>
          <h3>{title}</h3>
          <p className="memory-card-description">{description}</p>
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