const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 900;
const limit = 50;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}" onclick="detail(this)">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
  return new Promise((resolve) => {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
      const newHtml = pokemons.map(convertPokemonToLi).join("");
      pokemonList.innerHTML += newHtml;

      // Aguardar a atualização do HTML e CSS antes de resolver a promessa
      requestAnimationFrame(() => {
        resolve();
      });
    });
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", async () => {
  console.log("Estou aqui!! 0");
  loadMoreButton.classList.toggle("loading");
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;
  if (qtdRecordsWithNexPage >= maxRecords) {
    console.log("Estou aqui!! 1");
    const newLimit = maxRecords - offset;
    await loadPokemonItens(offset, newLimit);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    console.log("Estou aqui!! 2");
    await loadPokemonItens(offset, limit);
  }
  loadMoreButton.classList.toggle("loading");
  console.log("Estou aqui!! 3");
});
