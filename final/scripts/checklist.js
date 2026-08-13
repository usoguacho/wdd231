// Populates the checklist confirmation page from the submitted query string.

const params = new URLSearchParams(window.location.search);

function displayValue(id, key, fallback = "Not provided") {
  const el = document.querySelector(`#${id}`);
  if (!el) return;
  const value = params.get(key);
  el.textContent = value ? value : fallback;
}

displayValue("outName", "cname");
displayValue("outEmail", "cemail");
displayValue("outHousehold", "household");

const rawTimestamp = params.get("timestamp");
const timestampEl = document.querySelector("#outTimestamp");
if (timestampEl) {
  timestampEl.textContent = rawTimestamp ? new Date(rawTimestamp).toLocaleString() : "Not provided";
}