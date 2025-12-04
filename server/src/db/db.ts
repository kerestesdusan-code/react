import dotenv from "dotenv";
import { Pool, QueryResult, QueryResultRow } from "pg";

dotenv.config();

const pool = new Pool({
    host: process.env.HOST,
    port: process.env.PG_PORT ? Number(process.env.PG_PORT) : 5432,
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
    });

    export const query = <T extends QueryResultRow = QueryResultRow>  (
        text: string,
        params?: any[],
    ): Promise<QueryResult<T>> => {
        return pool.query<T>(text, params);
    };

    const db = {query};

    export default db;
