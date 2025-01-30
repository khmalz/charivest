const { openDB } = require("../lib/database.js");

async function dropTables() {
  const db = await openDB();

  await db.exec(`
    DROP TABLE IF EXISTS users;
  `);

  console.log("Database tables was deleted");
}

dropTables();
