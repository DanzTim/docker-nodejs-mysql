require('dotenv').config();
let mysql = require('mysql2/promise');

let pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DBNAME,
    port: 3306,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
})

module.exports = { pool }; 