// CONNEXTION TO  POSTGRESQL DATABASE
// ------------------------- IMPORTS -------------------------

const { Client } = require('pg'); // postgre nodejs


// connection

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: 5432,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false }
})

client.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

// ============================================================
// ------------------------- EXPORT ---------------------------
module.exports = client;