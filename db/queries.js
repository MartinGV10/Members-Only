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
  return pool.query(`
    SELECT messages.id, messages.title, messages.body, messages.created_at, users.username, users.first_name FROM messages JOIN users ON messages.user_id = users.id ORDER BY messages.created_at DESC
  `);
}


async function addMessage(user_id, title, body) {
    return await pool.query('INSERT INTO messages (user_id, title, body) VALUES ($1, $2, $3)', [user_id, title, body])
}

async function updateUser(first_name, last_name, username, is_member, is_admin, id) {
    return pool.query(` UPDATE users
        SET first_name = $1, last_name = $2, username = $3, is_member = $4, is_admin = $5 WHERE id = $6 RETURNING id, first_name, last_name, username, is_member, is_admin`,
        [first_name, last_name, username, is_member, is_admin, id]
    )
}

async function deletePost(postId) {
    return pool.query('DELETE FROM messages WHERE id = $1', [postId])
}

module.exports = {
    addUser,
    loginUser,
    getSessionId,
    getMessages,
    addMessage,
    updateUser,
    deletePost
}