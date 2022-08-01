const pokemonNome  = document.querySelector('.pokemon-nome');
const pokemonPokeename = document.querySelector('.pokemon-nome')
const pokemonNumero  = document.querySelector('.pokemon-numero');
const pokemonImg  = document.querySelector('.pokemon-img');
const pokemonPokename = document.querySelector('.pokename');
const pokemonAtt = document.querySelector('.pokemon-Att');
const pokemonPokeid = document.querySelector('.pokeid');
const pokemonDef = document.querySelector('.pokemon-Def');
const form = document.querySelector('.form');
const search = document.querySelector('.search');
const btnVoltar = document.querySelector('.btn-voltar');
const btnProximo = document.querySelector('.btn-proximo');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200){

        const data = await APIResponse .json();
        return(data);
    }
}

const renderPokemon = async (pokemon) => {
    
    pokemonNome.innerHTML = 'Loading...'
    pokemonNumero.innerHTML = '';
    pokemonImg.style.display = 'none';
    
    const data = await fetchPokemon(pokemon);

    if (data){
    pokemonImg.style.display = 'block';    
    pokemonNome.innerHTML = data.name;
    pokemonNumero.innerHTML = data.id;
    pokemonAtt.textContent = data['height'];    
    pokemonDef.textContent = data['weight'];
    pokemonImg.src  = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    search.value = '';
    searchPokemon = data.id;
    } else {
        pokemonNome.innerHTML = 'Sem resposta';
        pokemonNumero.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(search.value.toLowerCase());
});
    
btnVoltar.addEventListener('click', () => {
    if (searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
 });

btnProximo.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
 });

renderPokemon(searchPokemon);

