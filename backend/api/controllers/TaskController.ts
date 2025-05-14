import { Request, Response } from "express";
import { updateTaskStatus } from "../services/TaskService";
import { getTasksByProject } from "../services/TaskService";


export const TaskController =  {
    async updateTaskStatus(req: Request, res: Response): Promise<void> {
        try {
            const taskId = Number(req.params.taskId);
            if (isNaN(taskId)) {
                res.status(400).json({ error: "Invalid task ID" });
                return;
            }
            
            const { status } = req.body;
            if (!status) {
                res.status(400).json({ error: "Status is required" });
                return;
            }

            const updatedTask = await updateTaskStatus(taskId, status);
            res.status(200).json({ message: "Task status updated successfully.", task: updatedTask });
        } catch (error) {
            res.status(500).json({ message: "Failed to update task status: " + error });
        }
    },

    async getTasksByProject(req: Request, res: Response) : Promise<void> {
        try {
            const projectId = Number(req.params.projectId);
            if (isNaN(projectId)) {
                res.status(400).json({ error: "Invalid project ID" });
                return;
            }

            const tasks = await getTasksByProject(projectId);
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch tasks for project: " + error });
        }
    },
}