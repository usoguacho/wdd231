import { places } from "../data/discover.mjs";

const grid = document.querySelector("#discoverGrid");

function cardTemplate(place) {
  return `
    <article class="place-card">
      <h2>${place.name}</h2>
      <figure>
        <img src="${place.image}" alt="${place.alt}" width="300" height="200" loading="lazy">
      </figure>
      <address>${place.address}</address>
      <p>${place.description}</p>
      <button type="button" data-url="${place.url}">Learn more</button>
    </article>
  `;
}

grid.innerHTML = places.map(cardTemplate).join("");

grid.querySelectorAll("button[data-url]").forEach((button) => {
  button.addEventListener("click", () => {
    window.open(button.dataset.url, "_blank", "noopener");
  });
});