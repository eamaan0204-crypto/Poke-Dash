import PokeCard from './PokeCard'

function PokeList({ pokemons, loading, error, emptyMessage = 'No Pokémon match your search.' }) {
  if (error) {
    return (
      <ul className="poke-list poke-list message">
        <li>{error}</li>
      </ul>
    )
  }

  if (loading) {
    return (
      <ul className="poke-list poke-list message">
        <li>Loading Pokémon...</li>
      </ul>
    )
  }

  if (pokemons.length === 0) {
    return (
      <ul className="poke-list poke-list message">
        <li>{emptyMessage}</li>
      </ul>
    )
  }

  return (
    <ul className="poke-list">
      {pokemons.map((pokemon) => (
        <PokeCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </ul>
  )
}

export default PokeList