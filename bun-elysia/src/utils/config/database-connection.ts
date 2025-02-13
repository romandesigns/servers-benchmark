import pg from 'pg';

const { Pool } = pg

const pool = new Pool({
    host: Bun.env.PSQL_HOST,
    database: Bun.env.PSQL_DB,
    user: Bun.env.PSQL_USER,
    password: Bun.env.PSQL_PASSWORD,
    port: Bun.env.PSQL_PORT
});

export default pool;