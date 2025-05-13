import express from 'express';
import { TaskController } from '../controllers/TaskController';

var router = express.Router();

router.get("/by-project/:projectId", TaskController.getTasksByProject);
router.post("/:taskId/status", TaskController.updateTaskStatus);


export default router;