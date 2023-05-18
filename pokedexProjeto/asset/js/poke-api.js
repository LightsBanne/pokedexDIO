const pokeApi = {}

function converPokeApiDetailToPokemon(pokedetail){
    const pokemon = new Pokemon ()
    pokemon.numbr = pokedetail.id
    pokemon.name = pokedetail.name

    const types = pokedetail.types.map((typeSlot)=>typeSlot.type.name)
    const [type]=types
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokedetail.sprites.other.dream_world.front_default
    
    return pokemon
}


pokeApi.getPokemonDetail = (pokemon) => {
    return fetch (pokemon.url)
    .then((response)=> response.json())
    .then (converPokeApiDetailToPokemon)

}

pokeApi.getPokemon = (offset = 0, limit = 151)=>{
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then ((detailRequests) => Promise.all(detailRequests))
    .then ((pokemonDetails)=> pokemonDetails)
    
}
