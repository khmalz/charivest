const { openDB } = require("../lib/database.js");

async function seedTables() {
   const db = await openDB();
   await db.exec(`
    INSERT INTO users (address, username, role)
    SELECT '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', 'admin', 'admin'
    WHERE NOT EXISTS (
        SELECT 1 FROM users WHERE address = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
    );
  `);
   console.log("Database tables seeded for admin account");
}

seedTables();
