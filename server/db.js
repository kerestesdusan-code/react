require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
});

pool
    .connect()
    .then(client => {
        console.log("connected to PostgreSQL");
        client.release();
    })
    .catch(err => {
        console.error("Error connecting to PostgreSQL:", err.message);
    })

    module.exports = {
        query: (text, params) => pool.query(text, params),
    };