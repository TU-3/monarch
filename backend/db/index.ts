import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

async function main() {
  //Disable prefetch as it is not supported for "Transaction" pool mode 
  if (!process.env.VITE_DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in the environment variables.");
  }
  const client = postgres(process.env.VITE_DATABASE_URL, { prepare: false });
  const db = drizzle({ client });
}

main();

