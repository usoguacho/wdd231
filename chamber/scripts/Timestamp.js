// Stamps the hidden timestamp field with the date/time the form was loaded

document.querySelector("#timestamp").value = new Date().toISOString();