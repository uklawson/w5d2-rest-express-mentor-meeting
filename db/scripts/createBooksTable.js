import { pool } from "../index.js";

async function createBooksTable(){
    const res = await pool.query(`CREATE TABLE IF NOT EXISTS books (id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, author_id INT, title TEXT);`);
    console.log(res.command)
}

createBooksTable();