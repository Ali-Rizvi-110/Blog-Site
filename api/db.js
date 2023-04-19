const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql123",
    database: "blogsite"
})

module.exports = db;