
const url = 'https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}'
const loadmorebutton = document.getElementById('loadmorebutton')
const pokemonList = document.getElementById('pokemonList')
let limit = 11;
let offset = 0;
const maxRecords = 251 


function loadPokemonItems(offset, limit) {
    pokeApi.getPokemon(offset, limit).then((pokemons = []) => {
        const newHTML = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.numbr}</span>
       <span class="name">${pokemon.name}</span>

    <div class="detail">
       <ol class="types">
           ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
       </ol>

       <img src="${pokemon.photo}"
       alt="${pokemon.name}">
           </div>
    </li>
    `).join('')

    pokemonList.innerHTML += newHTML
})
    }

loadPokemonItems(offset, limit)

loadmorebutton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems (offset, newLimit)
    
        loadmorebutton.parentElement.removeChild(loadmorebutton)
        
    }else{
    loadPokemonItems(offset, limit)
    }
})