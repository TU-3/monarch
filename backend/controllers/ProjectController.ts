import { Request, Response } from "express";
import { getProjectsByOrganization } from "../services/ProjectService";
import { getTasksByProject } from "../services/TaskService";

export const ProjectController = {
  async getAllProjects(req: Request, res: Response): Promise<void> {
    try {
        const organizationId = Number(req.params.organizationId);

        if (isNaN(organizationId)) {
            res.status(400).json({ error: "Invalid organization ID" });
        }

        const projects = await getProjectsByOrganization(organizationId);
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch projects." });
    }
  },

  async getProjectTasks(req: Request, res: Response) : Promise<void> {
    try {
        const projectId = Number(req.params.projectId);
        if (isNaN(projectId)) {
            res.status(400).json({ error: "Invalid project ID" });
        }

        const tasks = await getTasksByProject(projectId);
        res.status(201).json(tasks);
    } catch (error) {
        res.status(400).json({ message: "Failed to fetch tasks for project." });
    }
  },
};