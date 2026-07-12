export function getPokemonStats(pokemonList) {
  if (!Array.isArray(pokemonList) || pokemonList.length === 0) {
    return { totalCount: 0, maxAttack: 0, minAttack: 0, mostCommonType: 'N/A', allTypes: [], typeChartData: [], attackChartData: [] }
  }

  const totalCount = pokemonList.length
  const maxAttack = pokemonList.reduce((max, pokemon) => Math.max(max, Number(pokemon?.attack) || 0), 0)
  const minAttack = pokemonList.reduce((min, pokemon) => Math.min(min, Number(pokemon?.attack) || 0), 9999)
  const typeCounts = {}
  const allTypes = [...new Set(pokemonList.flatMap((pokemon) => Array.isArray(pokemon?.types) ? pokemon.types : []))]

  pokemonList.forEach((pokemon) => {
    const types = Array.isArray(pokemon?.types) ? pokemon.types : []
    types.forEach((type) => {
      if (typeCounts[type]) {
        typeCounts[type] += 1
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

  const typeChartData = typeNames.map((type) => ({
    name: type,
    count: typeCounts[type],
  }))

  const attackChartData = pokemonList.map((pokemon) => ({
    name: pokemon?.name || 'Unknown',
    attack: Number(pokemon?.attack) || 0,
    hp: Number(pokemon?.hp) || 0,
  }))

  return { totalCount, maxAttack, minAttack, mostCommonType, allTypes, typeChartData, attackChartData }
}

export default getPokemonStats