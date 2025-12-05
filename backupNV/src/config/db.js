const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "@Vestine4548",
  database: "gnv_solutions_v2"
});

module.exports = db;
