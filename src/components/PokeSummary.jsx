
function PokeSummary({ totalCount, maxAttack, minAttack, mostCommonType, loading }) {
  if (loading) {
    return (
      <div className="stats-summary">
        <p>Loading statistics...</p>
      </div>
    )
  }

  return (
    <div className="stats-summary">
      <div className="stat-card">
        <span className="stat-label">Total Pokémon</span>
        <span className="stat-value">{totalCount}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Max Attack</span>
        <span className="stat-value">{maxAttack}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Min Attack</span>
        <span className="stat-value">{minAttack}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Most Common Type</span>
        <span className="stat-value">{mostCommonType}</span>
      </div>
    </div>
  )
}

export default PokeSummary