import express from 'express';
import { OrganizationController } from '../controllers/OrganizationController';

var router = express.Router();

router.get('/:userId', OrganizationController.getOrganizationsFromUser);

export default router;
  