import express from 'express';
import { getModules, createModule, updateModule, deleteModule, completeModule } from '../controllers/Modules.js'

const router = express.Router();

router.get('/', getModules);
router.post('/', createModule);
router.patch('/', updateModule);
router.delete('/', deleteModule);


export default router;