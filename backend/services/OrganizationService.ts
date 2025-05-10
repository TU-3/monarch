import { db } from '../db'; // reuse the shared instance
import { organizationUser, organization } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function getOrganizationsFromUser(userId: string) {
  const rows = await db.query.organizationUser.findMany({
    where: eq(organizationUser.userId, userId),
    with: {
      organization: true, 
    },
  });

  return rows.map((row) => row.organization);  
}

export async function getOrganizationById(organizationId: number) {
  return db.query.organization.findFirst({
    where: eq(organization.id, organizationId),
  });
}

export async function createOrganization(organizationName: string, ownerId: string) {

  return db.insert(organization).values({
    name: organizationName,
    owner: ownerId,
  });
}

export async function addUserToOrganization(organizationId: number, userId: string) {
  return db.insert(organizationUser).values({
    organizationId: organizationId,
    userId: userId,
  });
}

export async function deleteOrganization(organizationId: number) {
  
  try {
    await db.delete(organizationUser).where(eq(organizationUser.organizationId, organizationId));
    await db.delete(organization).where(eq(organization.id, organizationId));
  } catch (error) {
    console.error('Error deleting organization:', error);
    return { success: false, error: 'Failed to delete organization' };
  }
  return { success: true };
}

