require('dotenv').config();
let mysql = require('mysql2/promise');

let pool = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'user',
    password: process.env.MYSQL_PASSWORD || 'test@123',
    database: process.env.MYSQL_DBNAME || 'devcode_test',
    port: process.env.MYSQL_PORT || 3306,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
})

module.exports = { pool }; 