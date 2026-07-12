import { Link } from 'react-router-dom'

function Sidebar({
  searchInput,
  setSearchInput,
  selectedType,
  setSelectedType,
  minAttackFiltered,
  setMinAttackFiltered,
  maxAttackFiltered,
  setMaxAttackFiltered,
  allTypes,
}) {
  return (
    <div className="sidebar">
      <h1 className="sidebar-title">Poke-Dash</h1>
      <Link className="sidebar-nav-link" to="/">Dashboard</Link>
      <div className="sidebar-filters">
        <input className="filter-input" type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search by name..." />
        <input className="filter-input" type="number" value={minAttackFiltered} onChange={(e) => setMinAttackFiltered(e.target.value)} placeholder="Min Attack" />
        <input className="filter-input" type="number" value={maxAttackFiltered} onChange={(e) => setMaxAttackFiltered(e.target.value)} placeholder="Max Attack" />
        <select className="filter-input" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value="all">All Types</option>
          {allTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Sidebar
