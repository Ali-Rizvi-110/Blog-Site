const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "YOUR MYSQL PASSWORD",
    database: "blogsite"
})

module.exports = db;
