const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 900;
const limit = 50;
let offset = 0;

function detail(obj) {
  //pokemonList.querySelectorAll()
  // <div class="window_detail"></div>
  // <div class="loader"></div>
  let idNumber = obj.firstElementChild.textContent.substring(1);
  let name = obj.querySelector(".name").textContent;
  let type = obj.querySelectorAll(".type");
  let img = obj.querySelector("img");
  let types = "";
  for (let i = 0; i < type.length; ++i) {
    types += `<li class="type ${type[i].textContent}">${type[i].textContent}</li>`;
  }
  document.body.innerHTML = `<section class="details">
  <div class="window_detail">
    <div class="close_container">
      <div class="close_button" onclick="close">
        <div class="leftright"></div>
        <div class="rightleft"></div>
      </div>
    </div>
     <div class="detail">
           <div class="name_and_types">
             <span class="name">${name}</span>
             <ol class="types">
               ${types}
             </ol>
           </div>
           <span>#${idNumber}</span>
     </div>
     <div class="img">${img.outerHTML}</div>
  </div> 
</section> ${document.body.innerHTML}`;
  document
    .querySelector(".close_button")
    .addEventListener("click", () =>
      document.querySelector(".details").remove()
    );
}

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
  return new Promise((resolve, reject) => {
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
