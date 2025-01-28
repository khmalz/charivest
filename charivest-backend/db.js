const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db_charivest.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      tier TEXT NOT NULL CHECK (tier IN ('Hope Giver', 'Light Bringer', 'Vanguard of Change', 'Eternal Guardian', 'Hero of Humanity')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      document_type TEXT NOT NULL CHECK (document_type IN ('KTP', 'Paspor', 'SIM', 'Akta Kelahiran')),
      document_image TEXT NOT NULL,
      document_number TEXT NOT NULL,
      is_verified BOOLEAN DEFAULT FALSE,
      verified_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
});

db.run(`
  CREATE TRIGGER IF NOT EXISTS update_user_timestamp
  AFTER UPDATE ON users
  FOR EACH ROW
  BEGIN
    UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
  END
`);

db.run(`
  CREATE TRIGGER IF NOT EXISTS update_document_timestamp
  AFTER UPDATE ON documents
  FOR EACH ROW
  BEGIN
    UPDATE documents SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
  END
`);

module.exports = db;
