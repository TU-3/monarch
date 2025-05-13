import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { users } from './db/schema';    // adjust path if needed
import projectRoutes from "./api/kanban";

// 1) Initialize Postgres client (disable prepare if using Supabase pool mode)
const sql = postgres(process.env.DATABASE_URL!, {
  ssl: { rejectUnauthorized: false },
  prepare: false,
});

// 2) Wrap in Drizzle
const db = drizzle(sql);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/kanban", projectRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Drizzle API listening on http://localhost:${PORT}`);
});
