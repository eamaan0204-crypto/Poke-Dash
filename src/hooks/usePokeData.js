import { useState, useEffect } from 'react'

const getStat = (stats = [], statName) => {
  const stat = stats.find((s) => s?.stat?.name === statName)
  return stat ? stat.base_stat : 0
}

function usePokeData() {
  const [loading, setLoading] = useState(true)
  const [pokemonList, setPokemonList] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        const results = []

        for (let i = 1; i <= 20; i++) {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)

          if (!res.ok) {
            throw new Error(`Failed to fetch Pokémon ${i}`)
          }

          const data = await res.json()
          const types = Array.isArray(data?.types) ? data.types.map((t) => t?.type?.name).filter(Boolean) : []
          const hp = getStat(data?.stats, 'hp')
          const attack = getStat(data?.stats, 'attack')
          const abilities = Array.isArray(data?.abilities) ? data.abilities.map((a) => a?.ability?.name).filter(Boolean) : []

          const pokemonObj = {
            id: i,
            name: data?.name || `Pokemon ${i}`,
            types,
            abilities,
            height: data?.height ?? 0,
            weight: data?.weight ?? 0,
            base_experience: data?.base_experience ?? 0,
            hp,
            attack,
          }

          results.push(pokemonObj)
        }

        if (!cancelled) {
          setPokemonList(results)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Something went wrong while loading Pokémon.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      cancelled = true
    }
  }, [])

  return { pokemonList, loading, error }
}

export default usePokeData

