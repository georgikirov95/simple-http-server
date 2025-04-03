const { db } = require("../db")
const { sendJson, parseJSONbody, generateToken, authenticateUser } = require("../utils")

module.exports.login = async (request, response) => {
  const { username, password } = await parseJSONbody(request)
  if (!username || !password) return sendJson(response, { message: "Missing 'username' or 'password'!" }, 400)

  const user = db.USERS.find((u) => (u.username === username && u.password === password))
  if (!user) return sendJson(response, { message: "Invalid username or password!" }, 401)

  const token = generateToken()
  db.SESSIONS.push({ userId: user.id, token: token })

  response.setHeader("Set-Cookie", `Token=${token};Path=/;HttpOnly;`)
  sendJson(response, { message: "Logged in successfully!" }, 200)
}

module.exports.logout = async (request, response) => {
  const user = authenticateUser(request)
  if (!user) return sendJson(response, { error: "Unauthorized!" }, 401)

  db.SESSIONS = db.SESSIONS.filter((s) => s.userId !== user.id)
  response.setHeader("Set-Cookie", "Token=;Path=/;Max-Age=0;Expires=Thu, 01 Jan 1970 00:00:00 GMT;")
  sendJson(response, { message: "Logged out successfully!" }, 200)
}