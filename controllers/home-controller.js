const { sendFile, MimeTypes } = require("../utils")

module.exports.sendHomePage = (request, response) => {
  sendFile(response, "./public/index.html", MimeTypes.HTML)
}

module.exports.sendStylesheet = (request, response) => {
  sendFile(response, "./public/styles.css", MimeTypes.CSS)
}

module.exports.sendScript = (request, response) => {
  sendFile(response, "./public/scripts.js", MimeTypes.JS)
}