// Dependencies
import express from "express";
import {getTasks,getTask,createTask, updateTask, deleteTask} from "../controllers/index.js";
// Imported controllers
const router = express.Router();

// Routes
router.get('/get-tasks', getTasks);
router.get('/:id/get-task', getTask);
router.post('/create-task',createTask);
router.patch('/:id/update-task', updateTask);
router.delete('/:id/delete-task', deleteTask);

export default router;
