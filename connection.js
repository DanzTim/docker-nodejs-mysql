let mysql = require('mysql2/promise');

let pool = mysql.createPool({
    host: 'localhost',
    user: 'user',
    password: 'test@123',
    database: 'devcode_test',
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
})

module.exports = { pool }; 