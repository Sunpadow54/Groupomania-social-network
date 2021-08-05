// cONNEXTION TO DATABASE
// ------------------------- IMPORTS -------------------------

const mysql = require('mysql');

const dotEnv = require('dotenv');
dotEnv.config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});


// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = connection;