import express from 'express';
import { ProjectController } from '../controllers/ProjectController';

var router = express.Router();

router.get('/:organizationId', ProjectController.getAllProjectsByOrganization);
router.post('/:organizationId', ProjectController.createProject);
  
export default router;
