import { db } from '../db'; // reuse the shared instance
import { organizationUser, organization } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function getOrganizationsFromUser(userId: string) {
  return db.select({organization}).from(organizationUser).where(eq(organizationUser.userId, userId));
}

export async function getOrganizationById(organizationId: number) {
  return db.select().from(organization).where(eq(organization.id, organizationId));
}

export async function createOrganization(organizationName: string, ownerId: string) {

  return db.insert(organization).values({
    name: organizationName,
    owner: ownerId,
  });
}

export async function deleteOrganization(organizationId: number) {
  return db.delete(organization).where(eq(organization.id, organizationId));
}