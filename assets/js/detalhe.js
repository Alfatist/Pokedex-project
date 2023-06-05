let details = document.body.querySelector(".details");
async function detail(obj) {
  details.style.display = "flex";
  details.innerHTML = '<div class="loader"></div>';
  const idNumber = obj.firstElementChild.textContent.substring(1);

  const pokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${idNumber}`
  ).then((response) => response.json());
  const species = await fetch(pokemon.species.url).then((response) =>
    response.json()
  );
  const male_female =
    species.gender_rate < 0
      ? "none"
      : [
          "&#9794; " + (((8 - species.gender_rate) / 8) * 100 + "%"),
          "&#9792; " + ((species.gender_rate / 8) * 100 + "%"),
        ].join(" | ");
  details.innerHTML = `<div class="window_detail">
  <div class="top_container">
    <div class="detail">
      <div class="name_and_types">
        <span>${pokemon.name}</span>
        <ol class="types">
          ${pokemon.types
            .map((i) => `<li class="type ${i.type.name}">${i.type.name}</li>`)
            .join("")}
        </ol>
      </div>
    </div>
    <div class="close_button" onclick="close">
      <div class="leftright"></div>
      <div class="rightleft"></div>
    </div>
  </div>

  <div class="img">
    <img
      src="${pokemon.sprites.front_default}"
      alt="${pokemon.name} image"
      loading="lazy"
    />
  </div>
  <div class="pokemon_details">
    <ul class="ul_details">
      <li>
        <input type="radio" name="pokeStats" id="about" checked/><label for="about" >About</label>
      </li>
      <li>
        <input type="radio" name="pokeStats" id="baseStats"/><label for="baseStats">Base Stats</label>
      </li>
      <li>
        <input type="radio" name="pokeStats" id="Evolution" disabled title="function disabled as it does not appear in the design"/><label for="Evolution" title="function disabled as it does not appear in the design" onclick="alert(title)" >Evolution</label>
      </li>
      <li>
        <input type="radio" name="pokeStats" id="Moves" disabled title="function disabled as it does not appear in the design"/><label for="Moves" title="function disabled as it does not appear in the design" onclick="alert(title)">Moves</label>
      </li>
    </ul>

    <div class="pokeAbout">
      <div class="aboutDiv">
        <ul class="aboutUl">
          <li>Species</li>
          <li>Height</li>
          <li>Weight</li>
          <li>Abilities</li>
        </ul>
        <ul class="aboutUl">
          <li>${
            species.genera.filter(
              (element) => element.language.name === "en"
            )[0].genus
          }</li>
          <li>${meters_to_feet(pokemon.height / 10)} (${(
    pokemon.height / 10
  ).toFixed(2)}m)</li>
          <li>${(pokemon.weight / 4.536).toFixed(1)} lbs (${(
    pokemon.weight / 10
  ).toFixed(1)} kg)</li>
          <li>${pokemon.abilities
            .map((element) => element.ability.name)
            .join(", ")}</li>
        </ul>
      </div>

      <h3>Breeding</h3>
      <div class="aboutDiv">
        <ul class="aboutUl">
          <li>Gender</li>
          <li>Egg Groups</li>
          <li>Egg Cycle</li>
        </ul>
        <ul class="aboutUl">
          <li>${male_female}
          </li>
          <li>${species.egg_groups[0].name}</li>
          <li title="I know; egg cycle is not the second egg group. Just following the design." onclick="alert(title)">${
            species.egg_groups[1]?.name ?? "-----"
          }</li>
        </ul>
      </div>
    </div>
    <div class="pokeAbout">
      <div class="aboutDiv">
        <ul class="aboutUl">
          <li>HP</li>
          <li>Attack</li>
          <li>Defense</li>
          <li>Sp. Atk</li>
          <li>Sp. Def</li>
          <li>Speed</li>
        </ul>
        <ul class="aboutUl">
          ${pokemon.stats.map((base) => `<li>${base.base_stat}</li>`).join("")}
        </ul>
        <ul class="aboutUl">
          ${pokemon.stats
            .map(
              (base) =>
                `<li><meter min="0" max="100" low="45" high="50" optimum="100" value="${base.base_stat}"</meter></li>`
            )
            .join("")}
        </ul>
      </div>
      <div class="aboutUl">
        <h3>Type Defenses</h3>

        <p>The effectiveness of each type on ${pokemon.name}</p>
      </div>
    </div>
  </div>
</div>`;
  document.querySelector(".close_button").addEventListener("click", () => {
    details.replaceChildren("");
    details.style.display = "none";
  });

  let pokeImg = document.querySelector("div.img");
  pokeImg.style.maxHeight = `${
    pokeImg.clientHeight + pokeImg.previousElementSibling.clientHeight + 15
  }px`;
  pokeImg.style.height = "100%";
  // I'm here!!!
}

function meters_to_feet(meters) {
  const feet = meters * 3.28084;
  const fInt = Math.floor(feet);
  const inches = (feet - fInt) * 12;
  const iRounded = inches.toFixed(1);
  const result = fInt + "'" + iRounded + '"';
  return result;
}
