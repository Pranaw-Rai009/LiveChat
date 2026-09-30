// server.js
const app = require("./app");
const prisma = require("./db/prisma");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await prisma.$connect();          // forces connection NOW, not on first request
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to database:", err);
    process.exit(1);                   // don't run a server that can't reach its DB
  }
}

startServer();