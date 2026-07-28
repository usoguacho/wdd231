const menuToggle = document.getElementById('menuToggle');
const primaryNav = document.getElementById('primaryNav');

menuToggle.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('open');

  
  menuToggle.setAttribute('aria-expanded', isOpen);
});