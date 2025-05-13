import { Request, Response } from "express";
import { getProjectsByOrganization } from "../services/ProjectService";
import { getTasksByProject, updateTaskStatus } from "../services/TaskService";

export const ProjectController = {
  async getAllProjects(req: Request, res: Response): Promise<void> {
    try {
        const organizationId = Number(req.params.organizationId);

        if (isNaN(organizationId)) {
            res.status(400).json({ error: "Invalid organization ID" });
            return;
        }

        const projects = await getProjectsByOrganization(organizationId);
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch projects: " + error });
    }
  },

  async getProjectTasks(req: Request, res: Response) : Promise<void> {
    try {
        const projectId = Number(req.params.projectId);
        if (isNaN(projectId)) {
            res.status(400).json({ error: "Invalid project ID" });
            return;
        }

        const tasks = await getTasksByProject(projectId);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks for project: " + error });
    }
  },

  async updateTaskStatus(req: Request, res: Response): Promise<void> {
    try {
        const taskId = Number(req.params.taskId);
        if (isNaN(taskId)) {
            res.status(400).json({ error: "Invalid task ID" });
            return;
        }
        
        const { status } = req.body;
        if (!status) {
            res.status(400).json({ error: "Status is required" });
            return;
        }

        const updatedTask = await updateTaskStatus(taskId, status);
        res.status(200).json({ message: "Task status updated successfully.", task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: "Failed to update task status: " + error });
    }
  }
};