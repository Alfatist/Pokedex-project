let details = document.body.querySelector(".details");
function detail(obj) {
  let idNumber = obj.firstElementChild.textContent.substring(1);
  let name = obj.querySelector(".name").textContent;
  let type = obj.querySelectorAll(".type");
  let img = obj.querySelector("img");
  let types = "";
  for (let i = 0; i < type.length; ++i) {
    types += `<li class="type ${type[i].textContent}">${type[i].textContent}</li>`;
  }
  details.style.display = "flex";
  details.innerHTML = `
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
  </div>`;
  document.querySelector(".close_button").addEventListener("click", () => {
    details.replaceChildren("");
    details.style.display = "none";
  });
}

let pokeImg = document.querySelector(".img");

pokeImg.style = `height: calc(50% - ${pokeImg.previousElementSibling.clientHeight + 15}px)`;
