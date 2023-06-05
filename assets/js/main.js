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
                     alt="${pokemon.name}"
                     loading="lazy">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
  return new Promise((resolve) => {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
      const newHtml = pokemons.map(convertPokemonToLi).join("");
      pokemonList.innerHTML += newHtml;
      requestAnimationFrame(() => {
        resolve();
      });
    });
  });
}
loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", async () => {
  loadMoreButton.classList.toggle("loading");
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;
  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    await loadPokemonItens(offset, newLimit);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    await loadPokemonItens(offset, limit);
  }
  loadMoreButton.classList.toggle("loading");
});
