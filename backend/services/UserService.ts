// services/userservice.ts
import { db } from '../db'; // reuse the shared instance
import { users } from '../db/schema';

export async function getAllUsers() {
  return db.select().from(users);
}
