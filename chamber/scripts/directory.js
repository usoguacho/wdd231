const directoryList = document.querySelector("#directoryList");
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");

const levelNames = {
  1: "Member",
  2: "Silver Member",
  3: "Gold Member",
};

async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error(`Fetch failed with status ${response.status}`);
    }
    const data = await response.json();
    renderMembers(data.businesses);
  } catch (error) {
    directoryList.innerHTML = "<p>Sorry, member businesses could not be loaded right now.</p>";
    console.error(error);
  }
}

function renderMembers(businesses) {
  directoryList.innerHTML = "";

  businesses.forEach((business) => {
    const card = document.createElement("div");
    card.className = `business-card level-${business.membershipLevel}`;

    card.innerHTML = `
      <div class="business-card-header">
        <h2>${business.name}</h2>
        <p class="tagline">${business.tagline}</p>
        <span class="badge">${levelNames[business.membershipLevel]}</span>
      </div>
      <div class="business-card-body">
        <div class="business-image" aria-hidden="true"></div>
        <ul class="business-details">
          <li><strong>Address:</strong> ${business.address}</li>
          <li><strong>Phone:</strong> ${business.phone}</li>
          <li><strong>Email:</strong> ${business.email}</li>
          <li><strong>URL:</strong> <a href="${business.url}" target="_blank" rel="noopener">${business.url}</a></li>
        </ul>
      </div>
    `;

    directoryList.appendChild(card);
  });
}

function setView(view) {
  const isGrid = view === "grid";
  directoryList.classList.toggle("grid-view", isGrid);
  directoryList.classList.toggle("list-view", !isGrid);
  gridBtn.classList.toggle("active", isGrid);
  listBtn.classList.toggle("active", !isGrid);
  gridBtn.setAttribute("aria-pressed", isGrid);
  listBtn.setAttribute("aria-pressed", !isGrid);
}

gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

getMembers();