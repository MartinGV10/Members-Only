const pool = require('./pool')

async function addUser({ first_name, last_name, username, password }) {
    await pool.query('INSERT INTO users (first_name, last_name, username, password_hash) VALUES ($1, $2, $3, $4)', [ first_name, last_name, username, password ])
}

module.exports = {
    addUser
}