// Dynamic footer dates

document.querySelector("#currentYear").textContent = new Date().getFullYear();

document.querySelector("#lastModified").textContent =
  `Last Modification: ${document.lastModified}`;