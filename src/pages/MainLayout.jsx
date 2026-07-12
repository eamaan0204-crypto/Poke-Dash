import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import usePokeData from '../hooks/usePokeData'
import getPokemonStats from '../PokemonStats'

function MainLayout() {
  const [searchInput, setSearchInput] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [minAttackFiltered, setMinAttackFiltered] = useState('')
  const [maxAttackFiltered, setMaxAttackFiltered] = useState('')
  const { pokemonList, loading, error } = usePokeData()
  const { allTypes } = getPokemonStats(pokemonList)

  return (
    <div className="app-shell">
      <Sidebar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        minAttackFiltered={minAttackFiltered}
        setMinAttackFiltered={setMinAttackFiltered}
        maxAttackFiltered={maxAttackFiltered}
        setMaxAttackFiltered={setMaxAttackFiltered}
        allTypes={allTypes}
      />
      <main className="main-content">
        <Outlet
          context={{
            searchInput, setSearchInput,
            selectedType, setSelectedType,
            minAttackFiltered, setMinAttackFiltered,
            maxAttackFiltered, setMaxAttackFiltered,
            allTypes, pokemonList, loading, error,
          }}
        />
      </main>
    </div>
  )
}

export default MainLayout