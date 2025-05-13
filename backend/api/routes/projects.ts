import express from 'express';
import { ProjectController } from '../controllers/ProjectController';

var router = express.Router();

router.get('/:organizationId', ProjectController.getAllProjectsByOrganization);
  
export default router;
