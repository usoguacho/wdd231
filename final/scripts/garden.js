// Garden Guide page
const DATA_URL = "scripts/data/plants.json";
const FAVORITES_KEY = "rootedhome-favorite-plants";

const plantGrid = document.querySelector("#plantGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const detailDialog = document.querySelector("#plantDialog");
const dialogBody = document.querySelector("#plantDialogBody");
const dialogClose = document.querySelector("#plantDialogClose");

let allPlants = [];

function getFavorites() {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

function toggleFavorite(id) {
  const favorites = getFavorites();
  const index = favorites.indexOf(id);

  if (index === -1) {
    favorites.push(id);
  } else {
    favorites.splice(index, 1);
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  return favorites;
}

function plantCardTemplate(plant, favorites) {
  const isFavorite = favorites.includes(plant.id);

  return `
    <article class="plant-card" data-id="${plant.id}">
      <div class="plant-card-top">
        <img src="images/leaf.svg" alt="" width="28" height="28" loading="lazy" class="plant-icon">
        <h2>${plant.name}</h2>
        <button
          class="favorite-btn ${isFavorite ? "is-favorite" : ""}"
          type="button"
          data-favorite-id="${plant.id}"
          aria-pressed="${isFavorite}"
          aria-label="${isFavorite ? "Remove from" : "Add to"} favorites"
        >&#9733;</button>
      </div>
      <p class="plant-meta">${plant.category} &bull; ${plant.difficulty}</p>
      <p class="plant-savings">${plant.costSavings}</p>
      <button class="details-btn" type="button" data-detail-id="${plant.id}">View Details</button>
    </article>
  `;
}

function renderPlants(list) {
  const favorites = getFavorites();

  if (list.length === 0) {
    plantGrid.innerHTML = "<p>No plants match this filter.</p>";
    return;
  }

  plantGrid.innerHTML = list.map((plant) => plantCardTemplate(plant, favorites)).join("");

  plantGrid.querySelectorAll("[data-favorite-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.favoriteId);
      toggleFavorite(id);
      renderPlants(currentList());
    });
  });

  plantGrid.querySelectorAll("[data-detail-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.detailId);
      openDetail(id);
    });
  });
}

function currentList() {
  const activeButton = document.querySelector(".filter-btn.active");
  return applyFilter(activeButton ? activeButton.dataset.filter : "all");
}

function applyFilter(category) {
  if (category === "all") {
    return allPlants;
  }
  if (category === "favorites") {
    const favorites = getFavorites();
    return allPlants.filter((plant) => favorites.includes(plant.id));
  }
  return allPlants.filter((plant) => plant.category.toLowerCase() === category);
}

function openDetail(id) {
  const plant = allPlants.find((item) => item.id === id);
  if (!plant) return;

  dialogBody.innerHTML = `
    <h2>${plant.name}</h2>
    <p class="plant-meta">${plant.category} &bull; ${plant.difficulty} &bull; ${plant.sun}</p>
    <ul class="plant-detail-list">
      <li><strong>Water needs:</strong> ${plant.water}</li>
      <li><strong>Typical harvest:</strong> ${plant.harvestDays} days</li>
      <li><strong>Estimated savings:</strong> ${plant.costSavings}</li>
    </ul>
    <p>${plant.description}</p>
  `;

  detailDialog.showModal();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    renderPlants(applyFilter(button.dataset.filter));
  });
});

dialogClose.addEventListener("click", () => detailDialog.close());
detailDialog.addEventListener("click", (event) => {
  if (event.target === detailDialog) detailDialog.close();
});

async function loadPlants() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error(`Fetch failed with status ${response.status}`);
    }
    const data = await response.json();
    allPlants = data.plants;
    renderPlants(allPlants);
  } catch (error) {
    plantGrid.innerHTML = "<p>Sorry, the garden guide could not be loaded right now.</p>";
    console.error(error);
  }
}

loadPlants();