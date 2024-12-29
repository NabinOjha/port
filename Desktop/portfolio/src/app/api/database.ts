import path from "path";
import sqlite3 from "sqlite3";

const dbPath = path.join(process.cwd(), "profile.db");

const openDb = (): Promise<sqlite3.Database> => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
      if (err) {
        return reject(err);
      }
      resolve(db);
    });
  });
};

const dbConnection = async (): Promise<sqlite3.Database | null> => {
  try {
    return await openDb();
  } catch (err) {
    console.error('Error connecting to database', err);
    return null;
  }
};

// Migration logic with better error handling
const migrate = async (): Promise<void> => {
  try {
    const db = await dbConnection();
    if (!db) throw new Error('Database connection failed');

    db.serialize(() => {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS blogs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          description TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL
        );
      `;
      db.run(createTableQuery, (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
        } else {
          console.log("Blog table created successfully.");
        }
      });
    });
  } catch (err) {
    console.error('Migration failed:', err);
  }
};

migrate();


// Utility function to promisify sqlite3 methods
const promisifyDbMethod = (db: sqlite3.Database, method: 'all' | 'run', query: string) => {
  return new Promise((resolve, reject) => {
    db[method](query, (err: Error, result: any) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

// Utility function to handle DB queries with promisified methods
const executeDbQuery = async (query: string, dbMethod: 'all' | 'run') => {
  try {
    const db = await dbConnection();
    if (!db) throw new Error('Failed to connect to the database');

    const result = await promisifyDbMethod(db, dbMethod, query);
    return { result };
  } catch (error) {
    return { error };
  }
};

// apiGet using the utility function
export const apiGet = async (query: string) => {
  return await executeDbQuery(query, 'all');
};

// apiPost using the utility function
export const apiPost = async (query: string) => {
  return await executeDbQuery(query, 'run');
};

