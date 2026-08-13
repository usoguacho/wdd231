// Responsive hamburger navigation toggle, as an ES module export.

export function initNav() {
  const menuToggle = document.querySelector("#menuToggle");
  const primaryNav = document.querySelector("#primaryNav");

  if (!menuToggle || !primaryNav) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("open");
    menuToggle.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && primaryNav.classList.contains("open")) {
      primaryNav.classList.remove("open");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", false);
      menuToggle.setAttribute("aria-label", "Open menu");
    }
  });
}