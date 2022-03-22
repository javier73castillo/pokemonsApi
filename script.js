let listMap = [];
window.onload =() => {
    init();
    //utilizo la funcion searchPoke par buscar los pokemones al hacer click sobre el boton
    const button = document.querySelector('#buttonSearch');
    button.addEventListener('click', () => searchPoke())
    //imagesPoke es un array que contiene todas las class type de cada imagen que vaya a utilizar con el evento. 
    const imagesPoke = document.querySelectorAll('.type');
    //
    for (img of imagesPoke){
        //recorro el array donde tengo los tipso de pokemones y llamo al ID de cada imagen definido en el HTML.
        const type = document.querySelector(`#${img.id}`)
        //cuando haga click sobre la imagen correspondiente al tipo del pokemon, llama a la funcion typePoke y 
        //le pasa por parametro el ID (que es el tipo del pokemon)
        type.addEventListener('click', () => typePoke(type.id))
}
}
const init = async () => {
    //mapList es el json de todos los datos de los pokemones, traidos con fetch. Podria no haberlo usado.
    const mapList = await getPoke();
    //listMap es la lista limpia de pokemones con el name, imn y types.
    listMap =   myListPoke(mapList); //aca tengo todos los pokes con nombre e imagenes 
    printPoke(listMap); //funcion para mostar todos los pokemones
 }

function printPoke (listMap)
{
    //esta funcion es para mostrar todos los pokemones
    //para asignar a card, uso un ternario porque cuando haga el searchPoke y no hay el que este buscndo, 
    //tiene que aparecer vacio el contenedor
    const card = document.querySelector(".container-allPoke")?document.querySelector(".container-allPoke"):document.createElement ('div')
    card.className = 'container-allPoke';
    card.innerHTML = " ";
    //recorro y pinto todos los pokemones en el conteneador
    listMap.forEach(poke => {

        card.innerHTML += `<div class="container-card">
        <h1>${poke.name}</h1>
        <img class="img${poke.name}" src="${poke.image}" alt="${poke.name}"/>
        </div>`
    });
    document.body.appendChild(card)
}

//pinto con PrintPoke, pero le paso por parametro solo los que filtro con el dato del input
const searchPoke = () => {
    let nameInput = document.querySelector('#inpuntSearch');
    const filterPoke = listMap.filter(poke => (poke.name.toLowerCase().includes(nameInput.value.toLowerCase())))
    printPoke(filterPoke);
    }

//arrow para pintar los pokemones, pero segun su type, clickeando sobre el logo correspondiente
const typePoke = (value) => {
    console.log(value)
    //value sera el tipo que tiene cada pokemon en la Api
    const filterPoke = listMap.filter(poke => poke.types.toLowerCase().includes(value.toLowerCase()));

    const card = document.querySelector(".container-allPoke")?document.querySelector(".container-allPoke"):document.createElement ('div')
    card.className = 'container-allPoke';
    card.innerHTML = " ";
    filterPoke.forEach(poke => {

        card.innerHTML += `<div class="container-card">
        <h1>${poke.name}</h1>
        <img class="img${poke.name}" src="${poke.image}" alt="${poke.name}"/>
        </div>`
    });
    document.body.appendChild(card)
    
}

// me trae todos los pokemones que estan en la API y lo paso a Json.
const getPoke = async () => {
  
    let array = [];
    for (let i = 1; i <= 151; i++) {
        const api = await fetch('https://pokeapi.co/api/v2/pokemon/' + i)
        const listPoke = await api.json();
        array.push(listPoke);
      
    }
    return array
}
//limpio la lista general de los poke, con los datos que voy a necesitar
//PODRIA NO HABERLA IMPLEMENTADO, PERO ME GUSTO PARA ENTENDER MEJOR EL MAP.
const myListPoke = (pokemones) => {
    const pokemonesMap = pokemones.map(poke => {
        return {
            name: poke.name,
            image: poke.sprites.other.dream_world.front_default,
            types: poke.types.map(type => type.type.name).join(', ')
            }
     })
    return pokemonesMap
}

