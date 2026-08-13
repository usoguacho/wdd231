// Stamps the checklist request form's hidden timestamp field on load.

const timestampField = document.querySelector("#timestamp");

if (timestampField) {
  timestampField.value = new Date().toISOString();
}