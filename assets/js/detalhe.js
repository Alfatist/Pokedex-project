let details = document.body.querySelector(".details");
async function detail(obj) {
  let idNumber = obj.firstElementChild.textContent.substring(1);

  let pokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${idNumber}`
  ).then((response) => response.json());
  console.log(pokemon);
  details.style.display = "flex";
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
    />
  </div>

  <!-- Fazer tudo aqui do pokémon!  -->
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
          <li>${await fetch(pokemon.species.url)
            .then((response) => response.json())
            .then((species) => species.genera[7].genus)}</li>
          <li>2'3.6" (0.70cm)</li>
          <li>15.2 lbs (6.9kg)</li>
          <li>Overgrow, Chlorophyl</li>
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
          <li><span title="I don't have the symbol, so I'm using unicode">&#9794; 87.5%</span> | <span title="I don't have the symbol, so I'm using unicode">&#9792; 12.5%</span>
          </li>
          <li>Monster</li>
          <li>Grass</li>
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
          <li>45</li>
          <li>60</li>
          <li>48</li>
          <li>65</li>
          <li>65</li>
          <li>45</li>
        </ul>
        <ul class="aboutUl">
          <li>
            <meter min="0" max="100" low="45" high="50" optimum="100" value="45"></meter>
          </li>
          <li>
            <meter min="0" max="100" low="45" high="50" optimum="100" value="60"></meter>
          </li>
          <li>
            <meter min="0" max="100" low="45" high="50" optimum="100" value="48"></meter>
          </li>
          <li>
            <meter min="0" max="100" low="45" high="50" optimum="100" value="65"></meter>
          </li>
          <li>
            <meter min="0" max="100" low="45" high="50" optimum="100" value="65"></meter>
          </li>
          <li>
            <meter min="0" max="100" low="45" high="50" optimum="100" value="45"></meter>
          </li>
        </ul>
      </div>
      <div class="aboutUl">
        <h3>Type Defenses</h3>

        <p>The effectiveness of each type on Charmander</p>
      </div>
    </div>
  </div>
  <!-- término do detalhe do pokémon! -->
</div>`;
  document.querySelector(".close_button").addEventListener("click", () => {
    details.replaceChildren("");
    details.style.display = "none";
  });
}
