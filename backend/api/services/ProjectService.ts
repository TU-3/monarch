// services/ProjectService.ts
import { db } from '../../db'; // reuse the shared instance
import { project, meetingMinutes, task } from '../../db/schema';
import { eq } from 'drizzle-orm';

export async function getProjectsByOrganization(organizationId: number) {
  return db.query.project.findMany({
    where: eq(project.organizationId, organizationId),
  }); 
}

export async function getProjectById(projectId: number) {
  return db.query.project.findFirst({
    where: eq(project.id, projectId),
  });
}

export async function createProject(organizationId: number, name: string, description: string | null) {

  return db.insert(project).values({
    organizationId: organizationId,
    name: name,
    description: description,
  });
}

export async function updateProject(projectId: number, name: string, description: string | null) {
  return db.update(project).set({
    name: name,
    description: description,
  }).where(eq(project.id, projectId));
}

export async function deleteProject(projectId: number) {
  
  try {
    await db.transaction(async (tx) => {
      await tx.delete(meetingMinutes).where(eq(meetingMinutes.projectId, projectId));
      await tx.delete(task).where(eq(task.projectId, projectId));
      await tx.delete(project).where(eq(project.id, projectId));
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return { success: false, error: 'Failed to delete project' };
  }
  return { success: true };
}
