import pg from "pg";

import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { connectionString } from "./connection_string";

const { Pool } = pg;

const pool = new Pool({
  connectionString: connectionString,
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export const db = drizzle({ schema, client: pool });
