import express from 'express';
import {registerUser, loginUser, updateUser, deleteUser, getUserTasks, createUserTask} from '../controllers/users.js'

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.patch('/', updateUser);
router.delete('/', deleteUser);
router.get('/getUserTasks', getUserTasks);
router.post('/createUserTask', createUserTask);



export default router;