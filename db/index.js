import pg from 'pg';

export const pool = new pg.Pool({ 
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
    host: process.env.PGHOST,
    password:process.env.PGPASSWORD,
    ssl: { rejectUnauthorized: false }
});


