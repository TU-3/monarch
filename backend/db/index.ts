// db/index.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { config } from 'dotenv';
import * as schema from "./schema"; // <--- your tables
import * as relations from "./relations";

config(); // load env vars


const client = postgres(process.env.DATABASE_URL!, { prepare: false });
export const db = drizzle(client, { schema:  { ...schema, ...relations }});
