import express from 'express';
import { OrganizationController } from '../controllers/OrganizationController';

var router = express.Router();

router.get('/:userId', OrganizationController.getOrganizationsFromUser);
router.post('/create/:userId', OrganizationController.createOrganization);
router.post('/join/:userId', OrganizationController.addUserToOrganization);
router.put('/update/:orgId', OrganizationController.updateOrganizationName);
router.delete('/delete/:orgId', OrganizationController.deleteOrganization);
router.delete('/leave/:userId', OrganizationController.removeUserFromOrganization);

export default router;
