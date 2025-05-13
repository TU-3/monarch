import express from 'express';
import { ProjectController } from '../../controllers/ProjectController';

var router = express.Router();

router.get("/:organizationId", ProjectController.getAllProjects);
router.get("/:projectId/tasks", ProjectController.getProjectTasks);


export default router;