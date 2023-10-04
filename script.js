function loadPokemon() {
  const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
  
  if(!pokemonName) {
    alert('Digite um nome antes de buscar.')
    return;
  }
  
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
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
    document.getElementById('type').innerHTML = '';
    data.types.forEach((type)=>{
      const typeElement = document.createElement('span');
      typeElement.textContent = type.type.name;
      document.getElementById('type').appendChild(typeElement);
    });

    let img = data['sprites']['front_default'];
    document.getElementById('pic').setAttribute('src', img);
  })
  .catch(erro => {
    console.log("Erro " + erro);
    alert('Pokemon não encontrado.');
  });
}

document.getElementById('btn_load_pokemon').onclick = loadPokemon;
