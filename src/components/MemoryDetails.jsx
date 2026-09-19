import './MemoryDetails.css'

function MemoryDetails({ memory, closeMemory }) {
  return (
    <div className="memory-details-overlay">
      <section
        className="memory-details"
        role="dialog"
        aria-modal="true"
        aria-labelledby="memory-details-title"
      >
        <button
          className="memory-details-close"
          type="button"
          onClick={closeMemory}
        >
          Stäng
        </button>

        {memory.imagePath && (
          <img
            src={`https://localhost:7092${memory.imagePath}`}
            alt={memory.title}
          />
        )}

        <div className="memory-details-content">
          <p className="memory-details-date">
            {memory.date}
          </p>

          <h2 id="memory-details-title">
            {memory.title}
          </h2>

          <p className="memory-details-description">
            {memory.description}
          </p>
        </div>
      </section>
    </div>
  );
}

export default MemoryDetails