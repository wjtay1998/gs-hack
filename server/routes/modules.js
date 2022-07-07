import express from 'express';
import { getmodules, createModule, updateModule, deleteModule, completeModule } from '../controllers/Modules.js'

const router = express.Router();

router.get('/', getModules);
router.post('/', createModule);
router.patch('/:id', updateModule);
router.delete('/:id', deleteModule);
router.patch('/:id/completeModule', completeModule)

export default router;