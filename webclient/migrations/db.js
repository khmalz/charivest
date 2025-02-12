const { exec } = require("child_process");

function execPromise(command) {
   return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
         if (error) {
            console.error(`Error: ${stderr}`);
            reject(error);
         } else {
            console.log(stdout);
            resolve(stdout);
         }
      });
   });
}

function showHelp() {
   console.log(`
📌 Available Commands:
npm run db:migrate       -> Run database migrations
npm run db:fresh         -> Drop & re-run migrations
npm run db:fresh-seed    -> Drop, re-run migrations & seed database

npm run db:help          -> Show this help menu
   `);
}

async function run() {
   const args = process.argv.slice(2);
   const command = args[0];
   const hasSeed = args.includes("--seed");

   try {
      if (command === "db:migrate") {
         console.log("🔨 Running migrations...");
         await execPromise("node ./migrations/create.js");
      } else if (command === "db:fresh") {
         console.log("🔥 Dropping database...");
         await execPromise("node ./migrations/drop.js");

         console.log("🔨 Running migrations...");
         await execPromise("node ./migrations/create.js");

         if (hasSeed) {
            console.log("🌱 Seeding database...");
            await execPromise("node ./migrations/seed.js");
         }
      } else if (command === "db:help") {
         showHelp();
      } else {
         console.log("🚨 Unknown command! Use: db:migrate, db:fresh, or db:fresh --seed");
      }
   } catch (error) {
      console.error("❌ Operation failed:", error);
   }
}

run();
