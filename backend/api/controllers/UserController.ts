import { Request, Response } from "express";
import { getUsersByOrganization } from "../services/UserService";


export const UserController = {
  async getUsersByOrganization(req: Request, res: Response): Promise<void> {
    try {
        const orgId = req.params.orgId;

        if (!orgId) {
            res.status(400).json({ error: 'Organization ID is required' });
            return;
        }
        const users = await getUsersByOrganization(parseInt(orgId));
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch projects: " + error });
    }
  },

  
};