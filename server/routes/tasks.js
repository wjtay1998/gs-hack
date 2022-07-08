import express from 'express';
import { getTasks, getOneTask, createTask, updateTask, deleteTask, completeTask } from '../controllers/tasks.js'

const router = express.Router();

router.get('/', getTasks);
router.get('/:id', getOneTask);
router.post('/', createTask);
router.patch('/', updateTask);
router.delete('/', deleteTask);


export default router;