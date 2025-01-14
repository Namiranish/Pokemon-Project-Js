const search = document.getElementById('searchBar');
const resetBtn = document.getElementById('resetBtn'); 
const filter = document.getElementById('filter'); 
const display = document.getElementById('pokemon-container');


async function pokeData(i){

    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    let data = await response.json();
    return data;
}
pokeData();

async function fetchPokemon(){
    try{
        for(let i = 2; i <= 500; i++){
            let pokemon = await pokeData(i);
            let card = createCard(pokemon)
            display.appendChild(card);
        }
    }
    catch(err){
        console.log('No Pokemon Found!!');
    }
}

fetchPokemon()

function createCard(pokemon) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <img src='${pokemon.sprites.front_default}' class="image"/>
                <div class="name">${pokemon.name.toUpperCase()}</div>
                <div class="types">${pokemon.types[0].type.name}</div>
                <div class="ability">
                    <div class="ability-box">Hp: ${pokemon.stats[0].base_stat}</div>
                    <div class="ability-box">Att: ${pokemon.stats[1].base_stat}</div>  
                </div>
            </div>
            <div class="card-back">
                <img src='${pokemon.sprites.back_default}' class="backImage"/>
                <div class="name">${pokemon.name}</div>
                <div class="types">${pokemon.types[0].type.name}</div>
            </div>
        </div>`;
    return card;
}


filter.addEventListener("click", function(){
    let allCards = document.querySelectorAll(".card");
    allCards.forEach((card)=>{
        let cardType = card.querySelector(".types").textContent;
        
        if(cardType === type.value){
            card.style.display = "block";
        } else {
            card.style.display = "none";
        } 
    });
});

search.addEventListener('keyup', function(){
    let searchValue = search.value.toUpperCase();
    let allCards = document.querySelectorAll(".card");
    allCards.forEach(function(card){
        let cardName = card.querySelector(".name").textContent;

        if(cardName.startsWith(searchValue)){
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    }); 
});

resetBtn.addEventListener('click',()=>{
    fetchPokemon();
});