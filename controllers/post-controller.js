const { db } = require("../db")
const { sendJson, authenticateUser, parseJSONbody } = require("../utils")

module.exports.createPost = async (request, response) => {
  const user = authenticateUser(request)
  if (!user) return sendJson(response, { error: "Unauthorized!" }, 401)

  const { title, body } = await parseJSONbody(request)
  if (!title || !body) return sendJson(response, { message: "Invalid 'body' or 'title'!" }, 400)

  db.POSTS.push({ id: Math.ceil(Math.random() * 1000), title: title, body: body, userId: user.id })
  sendJson(response, { message: "Post created successfully!" }, 201)
}

module.exports.getPosts = (request, response) => {
  const postsWithAuthors = db.POSTS.map((p) => {
    const user = db.USERS.find((u) => u.id === p.userId)
    return { id: p.id, title: p.title, body: p.body, author: user ? user.name : "" }
  })
  sendJson(response, postsWithAuthors, 200)
}