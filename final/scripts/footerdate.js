// Populates the footer's dynamic year and last-modified date.

export function initFooterDates() {
  const yearEl = document.querySelector("#currentYear");
  const modifiedEl = document.querySelector("#lastModified");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (modifiedEl) {
    modifiedEl.textContent = `Last Modification: ${document.lastModified}`;
  }
}v