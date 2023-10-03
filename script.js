function loadPokemon() {
  const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
  
  if(!pokemonName) {
    alert('Digite um nome antes de buscar.')
    return;
  }
  
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    //o que vamos fazer com os dados em formato json
  fetch(url)
  .then((response) => {
    if(!response.ok){
      throw new Error('Pokemon não encontrado. Verifique se o nome está correto.');
    }
    return response.json();
  })
  .then((data) => {
    console.clear();
    console.log(data);
    document.getElementById('name').innerHTML = data['name'];
    // document.getElementById('type').innerHTML = data['types'];
    document.getElementById('type').innerHTML = '';
    data.types.forEach((type)=>{
      const typeElement = document.createElement('span');
      typeElement.textContent = type.type.name;
      document.getElementById('type').appendChild(typeElement);
    });

    let img = data['sprites']['front_default'];
    document.getElementById('pic').setAttribute('src', img);

    let pokemonId = data.id;
    getEvolutions(pokemonId);
  })
  .catch(erro => {
    console.log("Erro " + erro);
    alert('Pokemon não encontrado.');
  });
}


function getNamesEvolutions(evolutionChain) {
  const evolutionNames = [];
  
  const traverse = (evolution) => {
    evolutionNames.push(evolution.species.name);
    if (evolution.evolves_to.length > 0) {
      evolution.evolves_to.forEach((nextEvolution) => {
        traverse(nextEvolution);
      });
    }
  };

  traverse(evolutionChain);

  return evolutionNames;
}


function getEvolutions(pokemonId) {
  let pokemonURL = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
  fetch(pokemonURL)
    .then((response) => {
      if (!response.ok) throw new Error('Não foi possível encontrar o Pokémon.');
      return response.json();
    })
    .then((pokemonData) => {
      let speciesURL = pokemonData.species.url;
      return fetch(speciesURL);
    })
    .then((response) => {
      if (!response.ok) throw new Error('Não foi possível encontrar informações da espécie.');
      return response.json();
    })
    .then((speciesData) => {
      let evolutionChainURL = speciesData.evolution_chain.url;
      return fetch(evolutionChainURL);
    })
    .then((response) => {
      if (!response.ok) throw new Error('Não foi possível encontrar informações da cadeia de evolução.');
      return response.json();
    })
    .then((evolutionData) => {
      console.log(evolutionData);
      // printEvolutions(evolutionData.chain);
      let array = getNamesEvolutions(evolutionData.chain);
      console.log(array);
    })
    .catch((error) => {
      console.error('Erro: ' + error);
      alert('Erro ao obter informações de evolução.');
    });
}

document.getElementById('btn_load_pokemon').onclick = loadPokemon;
