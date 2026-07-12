import { useState } from 'react'
import '../App.css'
import PokeList from '../components/PokeList'
import PokeSummary from '../components/PokeSummary'
import TypeChart from '../components/TypeChart'
import AttackBarChart from '../components/AttackBarChart'
import AttackScatterChart from '../components/AttackScatterChart'
import { getPokemonStats } from '../PokemonStats'
import { useOutletContext } from 'react-router-dom'

function Dashboard() {
  const {
    pokemonList,
    loading,
    error,
    searchInput,
    selectedType,
    minAttackFiltered,
    maxAttackFiltered,
  } = useOutletContext()

  const [activeChart, setActiveChart] = useState('bar')
  const { totalCount, maxAttack, minAttack, mostCommonType, typeChartData, attackChartData } = getPokemonStats(pokemonList)

  const minAttackValue = minAttackFiltered === '' ? 0 : Number(minAttackFiltered)
  const maxAttackValue = maxAttackFiltered === '' ? 9999 : Number(maxAttackFiltered)
  const safeMinAttackValue = Number.isNaN(minAttackValue) ? 0 : minAttackValue
  const safeMaxAttackValue = Number.isNaN(maxAttackValue) ? 9999 : maxAttackValue

  const filteredList = pokemonList.filter((pokemon) => {
    const normalizedName = (pokemon?.name || '').toLowerCase()
    const matchesName = normalizedName.includes(searchInput.toLowerCase())
    const pokemonTypes = Array.isArray(pokemon?.types) ? pokemon.types : []
    const matchesType = selectedType === 'all' || pokemonTypes.includes(selectedType)
    const attackValue = Number(pokemon?.attack) || 0
    const matchesAttack = attackValue >= safeMinAttackValue && attackValue <= safeMaxAttackValue
    return matchesName && matchesType && matchesAttack
  })

  return (
    <div className="dashboard">
      <PokeSummary
        totalCount={totalCount}
        maxAttack={maxAttack}
        minAttack={minAttack}
        mostCommonType={mostCommonType}
        loading={loading}
      />

      <section className="charts-section">
        <div className="chart-toggle">
          <button
            className={`toggle-btn ${activeChart === 'bar' ? 'toggle-btn-active' : ''}`}
            onClick={() => setActiveChart('bar')}
          >
            Bar Chart
          </button>
          <button
            className={`toggle-btn ${activeChart === 'scatter' ? 'toggle-btn-active' : ''}`}
            onClick={() => setActiveChart('scatter')}
          >
            Scatter Chart
          </button>
        </div>

        <div className="chart-grid">
          <div className="chart-card">
            <h3 className="chart-title">Type Distribution</h3>
            <TypeChart data={typeChartData} />
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Attack Power</h3>
            {activeChart === 'bar' ? (
              <AttackBarChart data={attackChartData} />
            ) : (
              <AttackScatterChart data={attackChartData} />
            )}
          </div>
        </div>
      </section>

      <section className="insights-section">
        <h3 className="insights-title">What's interesting here</h3>
        <p className="insights-text">
          Beedrill has the highest attack stat among the first 20 Pokémon, despite being a lower-evolution Pokémon. Caterpie has the lowest attack stat.
          The most common type is Bug, which is shared by several Pokémon in this selection.
        </p>
        <p className="insights-suggestion">
          Try filtering by type or attack range to see how the Pokémon list changes. You can also search for specific Pokémon by name using the search bar in the sidebar.
        </p>
      </section>

      <PokeList
        pokemons={filteredList}
        loading={loading}
        error={error}
        emptyMessage="No Pokémon match your search."
      />
    </div>
  )
}

export default Dashboard
