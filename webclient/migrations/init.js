const { openDB } = require("../lib/database.js");

async function createTables() {
  const db = await openDB();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      address TEXT NOT NULL UNIQUE,
      username TEXT,
      role TEXT CHECK (role IN ('user', 'admin', 'creator')) DEFAULT 'user',
      foto_profil TEXT,
      total_donated REAL DEFAULT 0,
      points INTEGER DEFAULT 0,
      status TEXT CHECK (status IN ('active', 'inactive', 'banned')) DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log("Database tables created");
}

createTables();
