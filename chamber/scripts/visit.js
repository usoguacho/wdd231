// Shows a visit message based on the last visit stored in localStorage

const VISIT_KEY = "pinv-chamber-last-visit";
const MS_PER_DAY = 1000 * 60 * 60 * 24;

const message = document.querySelector("#visitMessage");
const messageText = document.querySelector("#visitMessageText");
const closeButton = document.querySelector("#visitClose");

function getVisitText(lastVisit, now) {
  if (!lastVisit) {
    return "Welcome! Let us know if you have any questions.";
  }

  const elapsed = now - lastVisit;

  if (elapsed < MS_PER_DAY) {
    return "Back so soon! Awesome!";
  }

  const days = Math.floor(elapsed / MS_PER_DAY);
  return `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
}

const now = Date.now();
let lastVisit = null;

try {
  const stored = localStorage.getItem(VISIT_KEY);
  lastVisit = stored ? Number(stored) : null;
} catch (error) {
  console.error(error);
}

messageText.textContent = getVisitText(lastVisit, now);

try {
  localStorage.setItem(VISIT_KEY, String(now));
} catch (error) {
  console.error(error);
}

closeButton.addEventListener("click", () => {
  message.hidden = true;
});