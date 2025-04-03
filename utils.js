const fs = require("fs/promises")
const crypto = require("crypto")
const { db } = require("./db")

const MimeTypes = {
  HTML: "text/html",
  CSS: "text/css",
  JS: "application/javascript",
  JSON: "application/json",
  TEXT: "text/plain"
}

/**
 * Sends a JSON response.
 * @param {http.ServerResponse} response - The response object.
 * @param {Object} data - The data to be sent as JSON.
 * @param {number} [statusCode=200] - The HTTP status code.
 */
const sendJson = (response, data, statusCode = 200) => {
  response.writeHead(statusCode, { "content-type": MimeTypes.JSON })
  response.end(JSON.stringify(data))
}

/**
 * Sends a file as a response stream.
 * @param {http.ServerResponse} response - The response object.
 * @param {string} filePath - The path to the file to be sent.
 * @param {string} mime - The MIME type of the file.
 */
const sendFile = async (response, filePath, mime) => {
  try {
    response.writeHead(200, { "content-type": mime })

    const fileHandle = await fs.open(filePath, "r")
    const readStream = fileHandle.createReadStream()
    readStream.pipe(response)

    readStream.on("end", async () => {
      await fileHandle.close()
    })
  } catch (error) {
    console.error("File read error:", error)
    response.writeHead(404, { "content-type": MimeTypes.TEXT })
    response.end("File Not Found!")
  }
}

/**
 * Parses the JSON body from a request.
 * @param {http.IncomingMessage} request - The incoming HTTP request.
 * @returns {Promise<Object>} - A promise that resolves to the parsed JSON object.
 */
const parseJSONbody = (request) => {
  return new Promise((resolve, reject) => {
    let body = ""

    request.on("data", (chunk) => {
      body += chunk.toString("utf-8")
    })

    request.on("end", () => {
      try {
        const parsed = JSON.parse(body)
        resolve(parsed)
      } catch (error) {
        reject(new Error("Invalid JSON!"))
      }
    })

    request.on("error", (err) => {
      reject(err)
    })
  })
}

/**
 * Authenticates a user based on the request's cookie.
 * @param {http.IncomingMessage} req - The HTTP request object.
 * @returns {{ id: number, username: string, name: string } | null} - The authenticated user or null if unauthorized.
 */
const authenticateUser = (req) => {
  if (!req.headers.cookie) return null;

  const token = req.headers.cookie.split("=")[1];
  const session = db.SESSIONS.find((s) => s.token === token);
  if (!session) return null;

  return db.USERS.find((u) => u.id === session.userId) || null;
};


/**
 * Generates a secure random token.
 * @param {number} [length=32] - The length of the token in bytes.
 * @returns {string} - A hex-encoded random string.
 */
const generateToken = (length = 32) => {
  return crypto.randomBytes(length).toString("hex")
}

module.exports = {
  MimeTypes,
  sendFile,
  sendJson,
  parseJSONbody,
  generateToken,
  authenticateUser
}