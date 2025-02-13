import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';

const { Pool } = pg

export const pool = new Pool({
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DB,
    user: process.env.PSQL_USER,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT
});
