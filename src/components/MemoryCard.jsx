import './MemoryCard.css'

function MemoryCard({ title, date, description, image }) {
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
      </div>
    </article>
  )
}

export default MemoryCard