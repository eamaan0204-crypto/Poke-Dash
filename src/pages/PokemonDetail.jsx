import { useParams, useOutletContext } from 'react-router-dom'

function PokemonDetail() {
  const { id } = useParams()
  const { pokemonList, loading, error } = useOutletContext()

  const selectedPokemon = pokemonList.find((pokemon) => String(pokemon.id) === String(id))

    if (loading) {
        return <p className="page-message">Loading Pokémon details...</p>
    }

    if (error) {
        return <p className="page-message">{error}</p>
    }

    if (!selectedPokemon) {
        return <p className="page-message">Pokémon not found.</p>
    }

    return (
        <div className="detail-page">
        <h2 className="detail-name">{selectedPokemon.name}</h2>
        <div className="detail-types">
            {selectedPokemon.types.map((type) => (
            <span key={type} className={`type-badge type-badge-${type}`}>{type}</span>
            ))}
        </div>
        <p className="detail-stat">Height: {selectedPokemon.height}</p>
        <p className="detail-stat">Weight: {selectedPokemon.weight}</p>
        <p className="detail-stat">HP: {selectedPokemon.hp}</p>
        <p className="detail-stat">Attack: {selectedPokemon.attack}</p>
        <p className="detail-stat">Base Experience: {selectedPokemon.base_experience}</p>
        <p className="detail-stat">Abilities: {selectedPokemon.abilities.join(', ')}</p>
        </div>
    )
    }

export default PokemonDetail