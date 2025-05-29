import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import postgres from 'postgres';
import appRouter from './api/routes/index'; // adjust path if needed

// 1) Initialize Postgres client (disable prepare if using Supabase pool mode)
const sql = postgres(process.env.NEXT_PUBLIC_DATABASE_URL!, {
  ssl: { rejectUnauthorized: false },
  prepare: false,
});

const app = express();
app.use(cors());
app.use(express.json());

// Register the routers 
app.use("/api", appRouter);

const PORT = process.env.NEXT_PUBLIC_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Drizzle API listening on http://localhost:${PORT}`);
});
