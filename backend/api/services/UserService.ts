// services/UserService.ts
import { db } from '../../db'; // reuse the shared instance
import { users, organizationUser } from '../../db/schema';
import { eq } from 'drizzle-orm';

export async function getUserById(id: string) {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  }); 
}

export async function getUsersByOrganization(organizationId: number) {
  const rows = await db.query.organizationUser.findMany({
    where: eq(organizationUser.organizationId, organizationId),
    with: {
      usersInAuth: true,
    },
  });

  return rows.map((row) => row.usersInAuth);
}