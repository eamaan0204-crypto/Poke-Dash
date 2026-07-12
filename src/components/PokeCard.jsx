import { Link } from "react-router-dom"

function PokeCard({ pokemon }) {
  return (
    <li className="poke-card">
      <Link to={`/pokemon/${pokemon.id}`} className="poke-card-link">
        <h2 className="poke-card-name">{pokemon.name}</h2>
        <div className="poke-card-types">
          {pokemon.types.map((type) => (
            <span key={type} className={`type-badge type-badge-${type}`}>
              {type}
            </span>
          ))}
        </div>
        <p className="poke-card-stat">Height: {pokemon.height}</p>
        <p className="poke-card-stat">Weight: {pokemon.weight}</p>
        <p className="poke-card-stat">HP: {pokemon.hp}</p>
        <p className="poke-card-stat">Attack: {pokemon.attack}</p>
      </Link>
    </li>
  )
}

export default PokeCard