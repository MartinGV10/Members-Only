const pool = require('./pool')

async function addUser({ first_name, last_name, username, password }) {
    await pool.query('INSERT INTO users (first_name, last_name, username, password_hash) VALUES ($1, $2, $3, $4)', [ first_name, last_name, username, password ])
}

async function loginUser(username) {
    return await pool.query('SELECT * FROM users WHERE username = $1', [username])
}

async function getSessionId(id) {
    return await pool.query('SELECT * FROM users WHERE id = $1', [id])
}

async function getMessages() {
    const { rows } = await pool.query('SELECT * FROM messages')
    return rows
}

async function addMessage(user_id, title, body) {
    return await pool.query('INSERT INTO messages (user_id, title, body) VALUES ($1, $2, $3)', [user_id, title, body])
}

module.exports = {
    addUser,
    loginUser,
    getSessionId,
    getMessages,
    addMessage
}