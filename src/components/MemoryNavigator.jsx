function MemoryNavigator({ selectedDate, setSelectedDate, memoryDates, }) {

  // Hittar alla minnesdatum som ligger före det valda datumet
  const previousDates = memoryDates.filter(
    (date) => date < selectedDate,
  )

  // Det sista datumet i listan är närmast det valda datumet
  const previousDate = previousDates[previousDates.length - 1]

  // Listan är sorterad, så find hittar närmaste datum framåt
  // Null om inget datum är valt för att inaktivera nästa-knappen.
  const nextDate = selectedDate
    ? memoryDates.find((date) => date > selectedDate)
    : null

  function showPreviousMemoryDate() {
    if (previousDate) {
      setSelectedDate(previousDate)
    }
  }

  function showNextMemoryDate() {
    if (nextDate) {
      setSelectedDate(nextDate)
    }
  }


  return (
    <div className="memory-navigator">
    <button
      type="button"
      onClick={showPreviousMemoryDate}
      disabled={!previousDate}
    >
      ← Föregående minnesdag
    </button>

    {/* OnChange skickar det nya datumet tillbaka till state i App */}
    <label htmlFor="memory-date">Välj datum</label>
    <input
      id="memory-date"
      type="date"
      value={selectedDate}
      onChange={(event) => setSelectedDate(event.target.value)}
    />

      <button
        type="button"
        onClick={showNextMemoryDate}
        disabled={!nextDate}
      >
        Nästa minnesdag →
      </button>
    </div>
  )
}

export default MemoryNavigator