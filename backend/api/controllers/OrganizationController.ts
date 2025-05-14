import express from 'express';
import { getOrganizationsFromUser, createOrganization, addUserToOrganization, updateOrganizationName } from '../services/OrganizationService';

export const OrganizationController = {
    async getOrganizationsFromUser(req: express.Request, res: express.Response): Promise<void> {
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
    },

    async createOrganization(req: express.Request, res: express.Response): Promise<void> {
        const { userId } = req.params;
        const { orgName } = req.body;

        if (!orgName || !userId) {
            return res.status(400).json({ error: 'User ID and organization name are required' });
        }

        try {
            const newOrg = await createOrganization(orgName, userId);
            res.json(newOrg);
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async addUserToOrganization(req: express.Request, res: express.Response): Promise<void> {
        const { userId } = req.params;
        const { orgId } = req.body;

        if (!orgId || !userId) {
            res.status(400).json({ error: 'Organization ID and user ID are required' });
            return;
        }
        try {
            const org = await addUserToOrganization(parseInt(orgId), userId);
            res.json(org);
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async updateOrganizationName(req: express.Request, res: express.Response): Promise<void> {
        const { orgId } = req.params;
        const { orgName } = req.body;
        if (!orgName || !orgId) {
            return res.status(400).json({ error: 'Organization ID and new name are required' });
        }
        try {
            const updatedOrg = await updateOrganizationName(parseInt(orgId), orgName);
            res.json(updatedOrg);
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};