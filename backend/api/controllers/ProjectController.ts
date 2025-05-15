import { Request, Response } from "express";
import { getProjectsByOrganization, createProject } from "../services/ProjectService";


export const ProjectController = {
  async getAllProjectsByOrganization(req: Request, res: Response): Promise<void> {
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

  async createProject(req: Request, res: Response): Promise<void> {
    try {
      const organizationId = Number(req.params.organizationId);

      if (isNaN(organizationId)) {
            res.status(400).json({ error: "Invalid organization ID" });
            return;
        }
      const { name, description } = req.body;

      if (!name || !description || !organizationId) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      const newProject = await createProject(organizationId, name, description);

      res.status(201).json(newProject);
    } catch (error) {
      res.status(500).json({ message: "Failed to create project: " + error });
    }
  }, 

  
};