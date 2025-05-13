// services/TaskService.ts
import { db } from '../db'; // reuse the shared instance
import { task } from '../db/schema';
import { eq} from 'drizzle-orm';

export async function getTaskById(id: number) {
  return db.query.task.findFirst({
    where: eq(task.id, id),
  }); 
}

export async function getTasksByProject(projectId: number) {
  return db.query.task.findMany({
    where: eq(task.projectId, projectId),
  });
}

export async function createTask(projectId: number, name: string, description: string, status: string, assignedTo: string) {

  return db.insert(task).values({
    projectId: projectId,
    name: name,
    description: description,
    status: status as "Backlog" | "To-do" | "In Progress" | "Review" | "Done",
    assignee: assignedTo,
  });
}

export async function updateTask(id: number, name: string, description: string, status: string, assignedTo: string) {
  return db.update(task).set({
    name: name,
    description: description,
    status: status as "Backlog" | "To-do" | "In Progress" | "Review" | "Done",
    assignee: assignedTo,
  }).where(eq(task.id, id));
}

export async function updateTaskStatus(id: number, status: string) {
  return db.update(task).set({
    status: status as "Backlog" | "To-do" | "In Progress" | "Review" | "Done",
  }).where(eq(task.id, id)).returning();
}

export async function deleteTask(id: number) {
  return db.delete(task).where(eq(task.id, id));
}
