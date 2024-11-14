import pg from "pg";

async function connectToDB(db) {
  try {
    const db = new pg.Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    await db.connect();
    console.log("✅ connection established to DB");
    return db;
  } catch (error) {
    console.log("Failed to connect to the database: ", error);
    process.exit(1);
  }
}

export { connectToDB };
