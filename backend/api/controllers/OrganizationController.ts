import express from 'express';
import { getOrganizationsFromUser } from '../services/OrganizationService'; 

export const OrganizationController = {
    async getOrganizationsFromUser (req: express.Request, res: express.Response) : Promise<void> {
        const { userId } = req.params;

        if (!userId) {
            res.status(400).json({ error: 'User ID is required' });
            return;
        }

        try {
            const allOrgs = await getOrganizationsFromUser(userId); 
            res.json(allOrgs);
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};