// services/ProjectService.ts
import { db } from '../db'; // reuse the shared instance
import { project } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function getProjectsByOrganization(organizationId: number) {
  return db.select().from(project).where(eq(project.organizationId, organizationId));
}

export async function getProjectById(projectId: number) {
  return db.select().from(project).where(eq(project.id, projectId));
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
  return db.delete(project).where(eq(project.id, projectId));
}
