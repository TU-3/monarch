// services/UserService.ts
import { db } from '../db'; // reuse the shared instance
import { users, organizationUser } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function getAllUsers() {
  return db.select().from(users);
}

export async function getUserById(id: string) {
  return db.select().from(users).where(eq(users.id, id));
}

export async function getUsersByOrganization(organizationId: number) {
  return db
    .select({ user: users })
    .from(organizationUser)
    .innerJoin(users, eq(organizationUser.userId, users.id))
    .where(eq(organizationUser.organizationId, organizationId));
}