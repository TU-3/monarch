import { db } from '../../db'; // reuse the shared instance
import { organizationUser, organization } from '../../db/schema';
import { and, eq } from 'drizzle-orm';

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
  const [newOrg] = await db
    .insert(organization)
    .values({
      name: organizationName,
      owner: ownerId,
    })
    .returning({ id: organization.id });

  return newOrg;
}

export async function addUserToOrganization(organizationId: number, userId: string) {
  return db.insert(organizationUser).values({
    organizationId: organizationId,
    userId: userId,
  });
}

export async function removeUserFromOrganization(organizationId: number, userId: string) {
  try{
    const tx = await db.transaction(async (tx) => {
      await tx.delete(organizationUser).where(
        and(
          eq(organizationUser.organizationId, organizationId),
          eq(organizationUser.userId, userId)
        )
      );
    });
    return { success: true };
  }
   
  catch (error) {
    console.error('Error removing user from organization:', error);
    return { success: false, error: 'Failed to remove user from organization' };
  }
}

export async function deleteOrganization(organizationId: number) {

  try {
    await db.transaction(async (tx) => {
      await tx.delete(organizationUser).where(eq(organizationUser.organizationId, organizationId));
      await tx.delete(organization).where(eq(organization.id, organizationId));
    });
  } catch (error) {
    console.error('Error deleting organization:', error);
    return { success: false, error: 'Failed to delete organization' };
  }
  return { success: true };
}

//update an existing organizationname
export async function updateOrganizationName(organizationId: number, newName: string) {
  try {
    await db.update(organization).set({ name: newName }).where(eq(organization.id, organizationId));
  } catch (error) {
    console.error('Error updating organization name:', error);
    return { success: false, error: 'Failed to update organization name' };
  }
  return { success: true };
}


