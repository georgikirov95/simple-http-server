# Simple Node.js HTTP Server

## Overview
This project is a simple Node.js HTTP server that serves static files and provides a basic API for user authentication and post management. The server uses a map-based routing system to handle different HTTP requests.

## Features
- Serves static files (HTML, CSS, JavaScript)
- User authentication with session handling
- API endpoints for managing users and posts
- Supports GET, POST, PUT, and DELETE methods
- Does not use external libraries

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/georgikirov95/simple-http-server.git
   cd simple-http-server
   ```
2. Start the server:
   ```sh
   node http-server.js
   ```

## API Endpoints

### Authentication
- `POST /api/login` - Logs in a user and sets a session cookie
- `DELETE /api/logout` - Logs out the user by clearing the session

### User Management
- `GET /api/user` - Retrieves the authenticated user's details
- `PUT /api/user` - Updates user information (name, password, username)

### Post Management
- `GET /api/posts` - Fetches all posts along with their authors
- `POST /api/posts` - Creates a new post (requires authentication)

## Static File Handling
- `GET /` - Serves `index.html`
- `GET /styles.css` - Serves CSS file
- `GET /scripts.js` - Serves JavaScript file
- `GET /login`, `GET /profile`, `GET /new-post` - Serve `index.html` for client-side routing

## Project Structure
```
/controllers
  ├── auth-controller.js
  ├── home-controller.js
  ├── post-controller.js
  ├── user-controller.js
/public
  ├── index.html
  ├── styles.css
  ├── scripts.js
/http-server.js  (Main server file)
/utils.js   (Helper functions)
/db.js      (In-memory database)
```

## Running the Server
By default, the server runs on port 3000. You can change the port in `http-server.js`:
```js
const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
```