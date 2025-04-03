const { db } = require("../db")
const { sendJson, authenticateUser, parseJSONbody } = require("../utils")

module.exports.getUser = (request, response) => {
  const user = authenticateUser(request)
  if (!user) return sendJson(response, { error: "Unauthorized" }, 401)
  sendJson(response, { id: user.id, username: user.username, name: user.name }, 200)
}

module.exports.updateUser = async (request, response) => {
  const user = authenticateUser(request)
  if (!user) return sendJson(response, { error: "Unauthorized!" }, 401)

  const { name, username, password } = await parseJSONbody(request)

  db.USERS = db.USERS.map((u) => u.id === user.id ? ({ ...u, name, password: password ? password : u.password, username }) : u)
  sendJson(response, { message: "User updated successfully!" }, 200)
}