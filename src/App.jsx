import { useState, useEffect } from 'react'
import './App.css'

const getStat = (stats, statName) => {
    const stat = stats.find((s) => s.stat.name === statName)
    return stat ? stat.base_stat : null
  }

function App() {
  const [loading, setLoading] = useState(false)
  const [pokemonList, setPokemonList] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [selectedType, setSelectedType] = useState('all')
  const [minAttackFiltered, setMinAttackFiltered] = useState(0)
  const [maxAttackFiltered, setMaxAttackFiltered] = useState(9999)

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const results = []

       for (let i = 1; i <= 20; i++) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        const data = await res.json()
        const types = data.types.map((t) => t.type.name)
        const hp = getStat(data.stats, 'hp')
        const attack = getStat(data.stats, 'attack')

        const pokemonObj = {
          name: data.name,
          types,
          height: data.height,
          weight: data.weight,
          hp,
          attack,
        }
        results.push(pokemonObj)
      }

      setPokemonList(results)
      setLoading(false)
    }
    fetchData()
  }, []); 

  const totalCount = pokemonList.length

  const attackNumbers = pokemonList.map((pokemon) => pokemon.attack)
  const maxAttack = attackNumbers.length ? Math.max(...attackNumbers) : 0
  const minAttack = attackNumbers.length ? Math.min(...attackNumbers) : 0
  const typeCounts = {}

  pokemonList.forEach((pokemon) => {
    pokemon.types.forEach((type) => {
      if (typeCounts[type]) {
        typeCounts[type]++
      } else {
        typeCounts[type] = 1
      }
    })
  })

  const typeNames = Object.keys(typeCounts)
  const mostCommonType = typeNames.length
    ? typeNames.reduce((best, current) => {
        return typeCounts[current] > typeCounts[best] ? current : best
      }, typeNames[0])
    : 'N/A'

  const allTypes = [...new Set(pokemonList.flatMap((pokemon) => pokemon.types))]

  const filteredList = pokemonList.filter((pokemon) => {
    const matchesName = pokemon.name.toLowerCase().includes(searchInput.toLowerCase())
    const matchesType = selectedType === 'all' || pokemon.types.includes(selectedType)
    const matchesAttack = pokemon.attack >= minAttackFiltered && pokemon.attack <= maxAttackFiltered
    return matchesName && matchesType && matchesAttack
  })

  return (
    <div className="app-shell">
      <div className="header">
        <h1>Poke-Dash</h1>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by name..."
        />
        <input
          type="number"
          value={minAttackFiltered}
          onChange={(e) => setMinAttackFiltered(Number(e.target.value))}
          placeholder="Min Attack"
        />
        <input
          type="number"
          value={maxAttackFiltered}
          onChange={(e) => setMaxAttackFiltered(Number(e.target.value))}
          placeholder="Max Attack"
        />
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="all">All Types</option>
          {allTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {loading ? (
          <ul>
            <li>Loading...</li>
          </ul>
        ) : (
          <>
            <p>Total Pokemon: {totalCount}</p>
            <p>Max Attack: {maxAttack}</p>
            <p>Min Attack: {minAttack}</p>
            <p>Most Common Type: {mostCommonType}</p>
          </>
        )}
      </div>

      <ul>
        {loading ? (
          <li>Loading...</li>
        ) : filteredList.length > 0 ? (
          filteredList.map((pokemon) => (
            <li key={pokemon.name}>
              <h2>{pokemon.name}</h2>
              <p>Types: {pokemon.types.join(', ')}</p>
              <p>Height: {pokemon.height}</p>
              <p>Weight: {pokemon.weight}</p>
              <p>HP: {pokemon.hp}</p>
              <p>Attack: {pokemon.attack}</p>
            </li>
          ))
        ) : (
          <li>No Pokémon match your search.</li>
        )}
      </ul>
    </div>
  )
}

export default App
