import { config } from "dotenv";
import { Pool } from "pg";
config()

const connectionString = process.env.DATABASE_URL?.trim()

if (!connectionString) {
    throw new Error("DATABASE_URL topilmadi. .env faylga ulanish URL ni kiriting.")
}

const poolConfig = {
    connectionString,
    ssl: { rejectUnauthorized: false }
}

const pool = new Pool(poolConfig)

async function ensureSchema() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            avatar TEXT NOT NULL
        );
    `)

    await pool.query(`
        CREATE TABLE IF NOT EXISTS files (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            file_name VARCHAR(255) NOT NULL,
            size INTEGER NOT NULL,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `)

    await pool.query(`
        CREATE TABLE IF NOT EXISTS messages (
            id SERIAL PRIMARY KEY,
            message_type TEXT NOT NULL,
            message TEXT NOT NULL,
            user_id_to INT REFERENCES users(id),
            user_id_from INT REFERENCES users(id),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `)
}

export async function initDatabase() {
    try {
        await pool.query("SELECT 1")
        await ensureSchema()
        console.log("✅ Database connected!")
    } catch (error) {
        console.error("❌ Database init failed", error)
        throw error
    }
}

export default pool