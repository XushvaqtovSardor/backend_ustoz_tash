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

async function db_connect() {
    try {
        await pool.connect()
        console.log("✅ Database connected!")
    } catch (error) {
        console.log(error)
    }
}

db_connect()

export default pool