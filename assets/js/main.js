
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0

function loadPokemonItens(offset, limit) {

   pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon) =>  
        `
        <li class="pokemon ${pokemon.type}">
                <span class="number">#00${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <!--  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.order}.svg" alt="${pokemon.name}"> -->
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        `
    ).join('')
   })

}

loadPokemonItens(offset, limit)
loadMoreButton.addEventListener('click', () => {
    offset += limit

    const amountRecordNextPage = offset + limit

    if (amountRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
        return;
    }

    loadPokemonItens(offset, limit)
})

// pokeApi.getPokemons().then((pokemons =[]) => {

//         pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')

    //const listItems = []

    // for (let i = 0; i < pokemons.length; i++) {
    //     const pokemon = pokemons[i];
    //     listItems.push(convertPokemonToLi(pokemon))
    // }
    
    // console.log(listItems)
// })
