import express from 'express';
import { ProjectController } from '../../controllers/ProjectController';

var router = express.Router();

router.get("/:organizationId", ProjectController.getAllProjects);
router.get("/:projectId/tasks", ProjectController.getProjectTasks);
router.post("/tasks/:taskId/status", ProjectController.updateTaskStatus);


export default router;