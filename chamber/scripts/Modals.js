// Wires up the "Learn More" buttons to open their matching <dialog>
// // and the "Close" buttons inside each dialog to close it

document.querySelectorAll("[data-modal-target]").forEach((button) => {
  button.addEventListener("click", () => {
    const dialog = document.querySelector(`#${button.dataset.modalTarget}`);
    dialog.showModal();
  });
});

document.querySelectorAll("[data-modal-close]").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest("dialog").close();
  });
});

// Allow clicking the dimmed backdrop to close the dialog too
document.querySelectorAll(".membership-dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
});