const http = require("http")
const postController = require("./controllers/post-controller")
const userController = require("./controllers/user-controller")
const authController = require("./controllers/auth-controller")
const homeController = require("./controllers/home-controller")
const { sendJson } = require("./utils")

const server = http.createServer()
/**
 * Map-based route handlers for different HTTP methods and paths.
 * @type {Map<string, (req: http.IncomingMessage, res: http.ServerResponse) => void | Promise<void>>}
 */
const routeHandlers = new Map()

/* ===== HOME PAGE ===== */
routeHandlers.set("GET /", homeController.sendHomePage)
routeHandlers.set("GET /styles.css", homeController.sendStylesheet)
routeHandlers.set("GET /scripts.js", homeController.sendScript)

/* ===== THIS IS A WAY TO HANDLE PAGE REFRESH SINCE WE ARE USING CLIENT SIDE ROUTING ===== */
routeHandlers.set("GET /login", homeController.sendHomePage)
routeHandlers.set("GET /profile", homeController.sendHomePage)
routeHandlers.set("GET /new-post", homeController.sendHomePage)

/* ===== USER ROUTES ===== */
routeHandlers.set("GET /api/user", userController.getUser)
routeHandlers.set("PUT /api/user", userController.updateUser)

/* ===== POSTS ROUTES ===== */
routeHandlers.set("GET /api/posts", postController.getPosts)
routeHandlers.set("POST /api/posts", postController.createPost)

/* ===== AUTH ROUTES ===== */
routeHandlers.set("POST /api/login", authController.login)
routeHandlers.set("DELETE /api/logout", authController.logout)

server.on("request", async (request, response) => {
  const method = request.method.toUpperCase()
  const path = request.url
  const key = `${method} ${path}`

  const handler = routeHandlers.get(key)
  if (!handler) return sendJson(response, { error: `Cannot ${request.method} ${request.url}` }, 404)

  handler(request, response)
})

const PORT = 3000
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`))